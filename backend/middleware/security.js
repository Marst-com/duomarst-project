const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// 기본 보안 헤더 (XSS, clickjacking, MIME 스니핑 방지 등)
const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginResourcePolicy: { policy: "same-site" },
});

// 프론트엔드 도메인만 허용 (그 외 오리진에서의 요청 차단)
const corsMiddleware = cors({
  origin: (process.env.FRONTEND_ORIGIN || "").split(",").filter(Boolean),
  credentials: true, // httpOnly 세션 쿠키를 주고받기 위해 필요
  methods: ["GET", "POST"],
});

// 전체 API 대상 기본 rate limit (무차별 대입/스팸 방지)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
});

// 로그인/가입처럼 민감한 엔드포인트는 더 엄격하게
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요." },
});

module.exports = {
  helmetMiddleware,
  corsMiddleware,
  generalLimiter,
  authLimiter,
};
