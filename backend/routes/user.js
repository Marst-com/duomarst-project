const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// 로그인한 사용자만 접근 가능한 예시 엔드포인트.
// 실제 사용자 데이터는 여기서 Firestore(Admin SDK)로 조회/저장하면 된다.
router.get("/dashboard-data", requireAuth, async (req, res) => {
  res.json({
    message: `${req.user.email}님, 환영합니다.`,
    uid: req.user.uid,
  });
});

module.exports = router;
