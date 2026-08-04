const express = require("express");
const rateLimit = require("express-rate-limit");
const admin = require("../config/firebaseAdmin");

const router = express.Router();

// 요일별 상담 가능 시간 (0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토)
// start, end: "HH:MM", slotMinutes: 한 타임 길이
const SCHEDULE = {
  1: { start: "19:00", end: "21:00", slotMinutes: 20 }, // 월
  2: { start: "16:00", end: "21:00", slotMinutes: 20 }, // 화
  4: { start: "19:00", end: "21:00", slotMinutes: 20 }, // 목
  5: { start: "16:00", end: "21:00", slotMinutes: 20 }, // 금
};

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
});

function isValidDateString(dateStr) {
  return typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

function generateSlots(daySchedule) {
  const [startH, startM] = daySchedule.start.split(":").map(Number);
  const [endH, endM] = daySchedule.end.split(":").map(Number);
  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;
  const slots = [];
  for (let t = startTotal; t + daySchedule.slotMinutes <= endTotal; t += daySchedule.slotMinutes) {
    const h = String(Math.floor(t / 60)).padStart(2, "0");
    const m = String(t % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  return slots;
}

// 날짜 문자열(YYYY-MM-DD)을 그 날짜의 요일(0~6)로 변환. 타임존 오차 방지를 위해 UTC 정오 기준으로 계산.
function weekdayOf(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

function isPastDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return target < today;
}

// ---------- 특정 날짜의 예약 가능 시간 조회 ----------
router.get("/availability", async (req, res) => {
  const { date } = req.query;

  if (!isValidDateString(date)) {
    return res.status(400).json({ error: "날짜 형식이 올바르지 않습니다." });
  }
  if (isPastDate(date)) {
    return res.json({ available: false, reason: "past", slots: [] });
  }

  const weekday = weekdayOf(date);
  const daySchedule = SCHEDULE[weekday];
  if (!daySchedule) {
    return res.json({ available: false, reason: "closed", slots: [] });
  }

  try {
    const allSlots = generateSlots(daySchedule);
    const snapshot = await admin
      .firestore()
      .collection("bookings")
      .where("date", "==", date)
      .get();
    const takenTimes = new Set(snapshot.docs.map((doc) => doc.data().time));

    const slots = allSlots.map((time) => ({
      time,
      taken: takenTimes.has(time),
    }));
    res.json({ available: true, slots });
  } catch (err) {
    console.error("[booking/availability]", err.message);
    res.status(500).json({ error: "예약 가능 시간을 불러오지 못했습니다." });
  }
});

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------- 예약 생성 ----------
router.post("/", bookingLimiter, async (req, res) => {
  const { date, time, name, email, message } = req.body || {};

  if (!isValidDateString(date) || isPastDate(date)) {
    return res.status(400).json({ error: "올바른 날짜를 선택해주세요." });
  }
  const daySchedule = SCHEDULE[weekdayOf(date)];
  if (!daySchedule) {
    return res.status(400).json({ error: "상담이 불가능한 날짜입니다." });
  }
  if (!generateSlots(daySchedule).includes(time)) {
    return res.status(400).json({ error: "올바른 시간을 선택해주세요." });
  }
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 100 ||
    !isValidEmail(email)
  ) {
    return res.status(400).json({ error: "이름과 이메일을 확인해주세요." });
  }

  const bookingId = `${date}_${time}`;

  try {
    // Firestore의 create()는 문서가 이미 존재하면 실패하기 때문에,
    // 같은 시간에 두 명이 동시에 예약을 시도해도 하나만 성공하는 것이 보장된다.
    await admin.firestore().collection("bookings").doc(bookingId).create({
      date,
      time,
      name: name.trim(),
      email,
      message: typeof message === "string" ? message.slice(0, 1000) : "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err.code === 6 || /already exists/i.test(err.message || "")) {
      return res.status(409).json({ error: "이미 예약된 시간입니다. 다른 시간을 선택해주세요." });
    }
    console.error("[booking/create]", err.message);
    res.status(500).json({ error: "예약 처리 중 오류가 발생했습니다." });
  }
});

module.exports = router;
