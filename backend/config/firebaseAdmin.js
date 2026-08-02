const admin = require("firebase-admin");

// .env의 값으로 Firebase Admin SDK를 한 번만 초기화한다.
// 이 파일은 서버(backend)에서만 로드되며, 프론트엔드에는 절대 노출되지 않는다.
if (!admin.apps.length) {
  const requiredVars = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
  ];
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(
      `Firebase Admin 초기화 실패: 환경변수 누락 -> ${missing.join(", ")}`
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // .env에는 \n으로 이스케이프해서 저장하므로 실제 개행으로 복원
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

module.exports = admin;
