const admin = require("../config/firebaseAdmin");

// 요청에 담긴 세션 쿠키를 검증해서 req.user에 사용자 정보를 채워준다.
// 로그인이 필요한 라우트 앞에 붙여서 사용한다.
async function requireAuth(req, res, next) {
  const sessionCookie = req.cookies?.session;

  if (!sessionCookie) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  try {
    // checkRevoked: true -> 로그아웃/탈퇴 등으로 무효화된 세션은 즉시 거부
    const decoded = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (err) {
    res.clearCookie("session");
    return res.status(401).json({ error: "세션이 만료되었거나 유효하지 않습니다." });
  }
}

module.exports = requireAuth;
