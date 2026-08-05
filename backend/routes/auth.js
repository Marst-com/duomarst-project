const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const admin = require("../config/firebaseAdmin");
const requireAuth = require("../middleware/requireAuth");
const { authLimiter } = require("../middleware/security");

const router = express.Router();

const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000; // 5일

function setSessionCookie(res, sessionCookie) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("session", sessionCookie, {
    maxAge: SESSION_MAX_AGE_MS,
    httpOnly: true,
    // 프론트(Vercel)와 백엔드(Render) 도메인이 서로 다른 크로스 사이트 배포이므로,
    // sameSite: "none"이어야 브라우저가 fetch 요청에 쿠키를 실어 보낸다.
    // sameSite: "none"은 secure: true(HTTPS)가 반드시 함께 있어야 브라우저가 허용한다.
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
}

async function createSessionFromIdToken(idToken) {
  const expiresIn = SESSION_MAX_AGE_MS;
  return admin.auth().createSessionCookie(idToken, { expiresIn });
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

// ---------- 이메일 / 비밀번호 회원가입 ----------
router.post("/register", authLimiter, async (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res
      .status(400)
      .json({ error: "올바른 이메일과 8자 이상의 비밀번호를 입력해주세요." });
  }

  try {
    const signUpResp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const signUpData = await signUpResp.json();

    if (!signUpResp.ok) {
      const message = signUpData?.error?.message || "";
      if (message === "EMAIL_EXISTS") {
        return res.status(409).json({ error: "이미 가입된 이메일입니다." });
      }
      return res.status(400).json({ error: "회원가입에 실패했습니다." });
    }

    const sessionCookie = await createSessionFromIdToken(signUpData.idToken);
    setSessionCookie(res, sessionCookie);
    return res.status(201).json({ email: signUpData.email });
  } catch (err) {
    console.error("[auth/register]", err.message);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// ---------- 이메일 / 비밀번호 로그인 ----------
router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email) || typeof password !== "string" || !password) {
    return res.status(400).json({ error: "이메일과 비밀번호를 입력해주세요." });
  }

  try {
    const signInResp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const signInData = await signInResp.json();

    if (!signInResp.ok) {
      // 이메일 존재 여부를 알려주지 않기 위해 항상 동일한 에러 메시지 사용
      return res.status(401).json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    const sessionCookie = await createSessionFromIdToken(signInData.idToken);
    setSessionCookie(res, sessionCookie);
    return res.json({ email: signInData.email });
  } catch (err) {
    console.error("[auth/login]", err.message);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// ---------- 구글 로그인 (서버사이드 OAuth) ----------
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.get("/google", (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
    prompt: "select_account",
  });
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/login.html?error=google_auth_failed`);
  }

  try {
    const { tokens } = await googleClient.getToken(code);
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub: googleUid, email_verified } = payload;

    if (!email || !email_verified) {
      return res.redirect(`${process.env.FRONTEND_ORIGIN}/login.html?error=email_not_verified`);
    }

    // 이메일로 기존 Firebase 사용자를 찾고, 없으면 새로 생성
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        userRecord = await admin.auth().createUser({
          email,
          emailVerified: true,
          providerToUpload: undefined,
        });
      } else {
        throw err;
      }
    }

    // custom token -> idToken 교환 (세션 쿠키 발급에는 idToken이 필요하기 때문)
    const customToken = await admin.auth().createCustomToken(userRecord.uid, {
      provider: "google",
      googleUid,
    });
    const exchangeResp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: customToken, returnSecureToken: true }),
      }
    );
    const exchangeData = await exchangeResp.json();
    if (!exchangeResp.ok) {
      throw new Error(exchangeData?.error?.message || "custom token exchange failed");
    }

    const sessionCookie = await createSessionFromIdToken(exchangeData.idToken);
    setSessionCookie(res, sessionCookie);
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/dashboard.html`);
  } catch (err) {
    console.error("[auth/google/callback]", err.message);
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/login.html?error=google_auth_failed`);
  }
});

// ---------- 로그아웃 ----------
router.post("/logout", async (req, res) => {
  const sessionCookie = req.cookies?.session;
  res.clearCookie("session", { path: "/" });

  if (sessionCookie) {
    try {
      const decoded = await admin.auth().verifySessionCookie(sessionCookie);
      await admin.auth().revokeRefreshTokens(decoded.sub);
    } catch (err) {
      // 이미 만료된 세션이면 무시하고 그냥 쿠키만 지운다
    }
  }
  res.json({ ok: true });
});

// ---------- 현재 로그인 사용자 확인 ----------
router.get("/me", requireAuth, (req, res) => {
  res.json({ email: req.user.email, uid: req.user.uid });
});

module.exports = router;
