# DuoMarst 홈페이지

프론트엔드/백엔드를 완전히 분리한 구조입니다. 프론트엔드에는 Firebase나 시크릿이 전혀 없고,
로그인·데이터 처리 등 위험 요소가 있는 로직은 전부 백엔드에서만 처리합니다.

```
duomarst-project/
├── frontend/        순수 HTML/CSS + 최소한의 vanilla JS. 백엔드 API만 fetch로 호출.
│   ├── index.html   회사 소개 + 서비스 소개 + 문의 폼
│   ├── login.html   로그인 / 회원가입 (이메일+비밀번호, 구글)
│   ├── dashboard.html  로그인 후 페이지
│   ├── css/style.css   다크/화이트 테마
│   └── js/main.js      API 호출, 테마 토글
│
└── backend/         Firebase, 이메일 발송, 세션 등 민감한 로직 전부 여기
    ├── server.js
    ├── routes/{auth,contact,user}.js
    ├── middleware/{security,requireAuth}.js
    ├── config/firebaseAdmin.js
    └── .env.example
```

## 로그인 방식

프론트엔드는 Firebase SDK를 쓰지 않습니다. 이메일/비밀번호 로그인·가입, 구글 로그인 모두
백엔드가 Firebase Auth REST API 및 Google OAuth와 직접 통신하고, 결과로 **httpOnly 세션 쿠키**를
발급합니다. 브라우저에는 Firebase 설정값이나 API 키가 전혀 노출되지 않습니다.

- 이메일/비밀번호: 프론트 폼 → `POST /auth/login` 또는 `/auth/register` → 백엔드가 세션 쿠키 발급
- 구글 로그인: `login.html`의 링크가 `/auth/google`로 이동 → 백엔드가 구글 OAuth 처리 → 콜백에서
  세션 쿠키 발급 후 `dashboard.html`로 리다이렉트

## 실행 방법

### 1. Firebase 프로젝트 준비
1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Authentication → 로그인 방법에서 "이메일/비밀번호" 활성화
3. 프로젝트 설정 → 일반 → 웹 API 키 복사 (`FIREBASE_WEB_API_KEY`)
4. 프로젝트 설정 → 서비스 계정 → "새 비공개 키 생성" (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)

### 2. Google OAuth 준비 (구글 로그인용)
1. [Google Cloud Console](https://console.cloud.google.com) → API 및 서비스 → 사용자 인증 정보
2. OAuth 2.0 클라이언트 ID 생성 (웹 애플리케이션)
3. 승인된 리디렉션 URI에 `http://localhost:4000/auth/google/callback` 추가 (배포 시 실제 도메인으로 변경)

### 3. Gmail 앱 비밀번호 (문의 폼 메일 발송용)
구글 계정 → 보안 → 2단계 인증 활성화 후 "앱 비밀번호" 생성

### 4. 백엔드 실행
```bash
cd backend
cp .env.example .env
# .env를 위에서 발급받은 값들로 채우기
npm install
npm start
```
`http://localhost:4000/health` 접속해서 `{"ok":true}` 나오면 정상.

### 5. 프론트엔드 실행
정적 파일이라 아무 방법으로나 서빙하면 됩니다. 예:
```bash
cd frontend
python3 -m http.server 5500
```
`http://localhost:5500`으로 접속.

배포 전에는 `frontend/js/main.js` 상단의 `API_BASE_URL`을 실제 백엔드 도메인으로 바꿔주세요.

## 보안 체크리스트 (구현됨)
- [x] 프론트엔드에 Firebase 키/시크릿 없음 — 백엔드에서만 Firebase Admin SDK 사용
- [x] 세션은 httpOnly + secure(운영 환경) + sameSite 쿠키
- [x] CORS는 `FRONTEND_ORIGIN`에 지정한 도메인만 허용
- [x] helmet으로 CSP 등 보안 헤더 적용
- [x] 전체 API rate limit + 로그인/문의 폼에 더 엄격한 rate limit
- [x] 입력값 검증 (이메일 형식, 비밀번호 길이, 문의 폼 길이 제한)
- [x] 문의 메일 본문 HTML 이스케이프 (삽입 공격 방지)
- [x] 에러 응답에 스택 트레이스 등 민감 정보 노출 안 함
- [x] `.env`는 `.gitignore`에 포함, 절대 커밋하지 않기

## 배포 시 추가로 챙길 것
- `NODE_ENV=production`으로 설정 (secure 쿠키 활성화됨)
- 백엔드를 HTTPS 뒤에 배치 (Nginx/Cloudflare 등)
- Firestore 보안 규칙에서 클라이언트 직접 접근 차단 (백엔드 Admin SDK만 허용)
