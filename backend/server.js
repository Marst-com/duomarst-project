require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const {
  helmetMiddleware,
  corsMiddleware,
  generalLimiter,
} = require("./middleware/security");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");

const app = express();

// 프록시(예: Nginx, 클라우드 로드밸런서) 뒤에서 secure 쿠키/https 인식이 되도록
app.set("trust proxy", 1);

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: "50kb" })); // 과도한 페이로드 방지
app.use(cookieParser());
app.use(generalLimiter);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/api/user", userRoutes);

// 존재하지 않는 라우트
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// 공통 에러 핸들러 (스택 트레이스 등 민감 정보가 응답에 노출되지 않도록)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "서버 오류가 발생했습니다." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`DuoMarst backend listening on port ${PORT}`);
});
