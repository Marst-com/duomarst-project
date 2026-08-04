const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5, // 한 IP당 시간당 5건까지만 (스팸/폭탄 방지)
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "문의를 너무 많이 보냈습니다. 잠시 후 다시 시도해주세요." },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL_USER,
    pass: process.env.CONTACT_EMAIL_APP_PASSWORD,
  },
});

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 아주 기본적인 HTML 이스케이프 (이메일 본문에 그대로 들어가므로 삽입 공격 방지)
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

router.post("/", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 100 ||
    !isValidEmail(email) ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 2000
  ) {
    return res.status(400).json({ error: "입력값을 확인해주세요." });
  }

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL_USER,
      to: process.env.CONTACT_RECEIVE_TO,
      replyTo: email,
      subject: `[DuoMarst 문의] ${name}`,
      html: `
        <p><b>이름:</b> ${escapeHtml(name)}</p>
        <p><b>이메일:</b> ${escapeHtml(email)}</p>
        <p><b>내용:</b></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err.message);
    res.status(500).json({ error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." });
  }
});

module.exports = router;
