// 배포 시 실제 백엔드 주소로 바꿔주세요.
const API_BASE_URL = "https://duomarst-project.onrender.com";

// ====================================================================
// 이 파일이 모든 페이지의 UI를 만듭니다. 각 .html 파일은
// <body data-page="..."><div id="root"></div></body> 형태의 껍데기일 뿐이고,
// 실제 화면 내용은 아래 PAGE_BODIES를 조립해서 #root 안에 채워 넣습니다.
// ====================================================================

function navHTML(variant) {
  let rightLink;
  if (variant === "dashboard") {
    rightLink = `<button class="btn btn-ghost" id="logoutBtn">로그아웃</button>`;
  } else if (variant === "bare") {
    rightLink = "";
  } else {
    rightLink = `<a href="login.html">로그인</a>`;
  }

  return `
<nav class="nav">
  <div class="nav-inner">
    <a href="index.html" class="logo"><img src="assets/logo.png" alt="DuoMarst" class="logo-img" /></a>
    <div class="nav-links">
      <a href="history.html">역사</a>
      <a href="members.html">멤버</a>
      <a href="booking.html">예약</a>
      <a href="contact.html">문의</a>
      ${rightLink}
      <button class="theme-toggle" id="themeToggle" aria-label="테마 전환">🌙</button>
    </div>
  </div>
</nav>`;
}

const FOOTER_HTML = `
<footer>
  © 2026 DuoMarst. All rights reserved.
</footer>`;

const PAGE_BODIES = {
  home: `
<header class="hero">
  <div class="container">
    <span class="hero-eyebrow">WEB · APP · AI STUDIO</span>
    <h1>단순한 페이지는 <span class="grad">3일</span>,<br />복잡한 기능도 <span class="grad">일주일</span>이면 됩니다</h1>
    <p>DuoMarst는 빠르고, 합리적이고, 안전하게 만드는 팀입니다.</p>
    <div class="hero-actions">
      <a href="booking.html" class="btn btn-primary">상담 예약하기</a>
      <a href="contact.html" class="btn btn-ghost">문의하기</a>
    </div>

    <div class="duo-orbit" aria-hidden="true">
      <svg viewBox="0 0 220 220">
        <circle class="orbit-ring a" cx="110" cy="80" r="70"></circle>
        <circle class="orbit-ring b" cx="110" cy="140" r="70"></circle>
        <circle class="orbit-node" cx="110" cy="10" r="5" fill="var(--accent-a)"></circle>
        <circle class="orbit-node" cx="110" cy="210" r="5" fill="var(--accent-b)"></circle>
      </svg>
    </div>
  </div>
</header>

<section id="why">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Why DuoMarst</span>
      <h2>왜 DuoMarst인가요</h2>
    </div>
    <div class="grid-3">
      <div class="card reveal">
        <div class="icon">⚡</div>
        <h3>빠른 개발 속도</h3>
        <p>단순한 페이지는 3일, 복잡한 기능이 들어간 서비스도 일주일 안에 형태를 갖춥니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">₩</div>
        <h3>합리적인 가격</h3>
        <p>불필요한 과정 없이 필요한 것만 만들어서, 소규모 프로젝트에 부담 없는 가격으로 진행합니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">🔒</div>
        <h3>강력한 보안</h3>
        <p>프론트엔드와 백엔드를 완전히 분리해, 프론트가 노출되어도 개인정보와 핵심 로직은 안전하게 지킵니다.</p>
      </div>
    </div>
  </div>
</section>

<section id="tagline">
  <div class="container">
    <div class="tagline-panel reveal">
      <p class="tagline-eyebrow">DuoMarst를 한 문장으로</p>
      <h2>빠르게 만들지만, 허투루 만들지 않습니다.</h2>
    </div>
  </div>
</section>

<section id="security">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Security</span>
      <h2>보안의 중요성</h2>
      <p>작은 프로젝트라고 보안을 대충 넘기지 않습니다.</p>
    </div>
    <div class="about-panel reveal">
      <div>
        <h3>프론트엔드에는 아무것도 남기지 않습니다</h3>
        <p>로그인 처리, 데이터베이스 접근, 이메일 발송 같은 민감한 로직은 전부 백엔드에서만 처리해요. 브라우저에서 코드를 열어봐도 시크릿 키나 개인정보 처리 로직이 노출되지 않는 구조입니다. 프론트엔드가 통째로 유출돼도 빠르게 재배포하면 그만이고, 진짜 중요한 건 안전하게 서버 안에 있습니다.</p>
      </div>
      <div class="duo-orbit" aria-hidden="true">
        <svg viewBox="0 0 220 220">
          <circle class="orbit-ring a" cx="110" cy="110" r="90"></circle>
          <circle class="orbit-ring b" cx="110" cy="110" r="60"></circle>
        </svg>
      </div>
    </div>
  </div>
</section>

<section id="faq">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>자주 묻는 질문</h2>
    </div>
    <div class="faq-list">
      <details class="faq-item reveal">
        <summary>최소 얼마부터 시작하나요?</summary>
        <p>단순한 소개 페이지 기준으로 5만원 이하부터 시작합니다. 로그인, DB 연동 등 기능이 추가되면 20만원 이하, 게임처럼 규모가 큰 프로젝트는 100만원 안팎으로 안내드려요.</p>
      </details>
      <details class="faq-item reveal">
        <summary>작업 기간은 얼마나 걸리나요?</summary>
        <p>단순한 페이지는 3일, 로그인·API 등이 포함된 서비스는 7일, 게임 개발은 1개월 이내를 기준으로 진행합니다.</p>
      </details>
      <details class="faq-item reveal">
        <summary>보안은 어떻게 챙기나요?</summary>
        <p>프론트엔드와 백엔드를 완전히 분리하고, 시크릿 키나 개인정보는 백엔드에서만 다룹니다. 자세한 내용은 위 "보안의 중요성" 섹션을 참고해주세요.</p>
      </details>
      <details class="faq-item reveal">
        <summary>상담은 어떻게 예약하나요?</summary>
        <p><a href="booking.html" style="color:var(--accent-a)">예약 페이지</a>에서 날짜와 시간을 선택하고 신청하시면 됩니다. 이미 예약된 시간은 자동으로 표시돼요.</p>
      </details>
    </div>
  </div>
</section>

<section id="cta">
  <div class="container">
    <div class="cta-panel reveal">
      <h2>궁금한 게 있다면 편하게 물어보세요</h2>
      <p>간단한 질문도 좋고, 프로젝트 아이디어만 있어도 괜찮아요.</p>
      <a href="contact.html" class="btn btn-primary">문의하러 가기</a>
    </div>
  </div>
</section>
`,
  history: `
<header class="hero" style="padding-bottom:40px">
  <div class="container">
    <span class="hero-eyebrow">HISTORY</span>
    <h1>DuoMarst가 <span class="grad">걸어온 길</span></h1>
    <p>이름도, 방향도 여러 번 바뀌었지만 계속 만들어왔습니다.</p>
  </div>
</header>

<section id="stats">
  <div class="container">
    <div class="grid-3">
      <div class="card reveal" style="text-align:center">
        <div class="stat"><b>2024</b><span>첫 사업 계획</span></div>
      </div>
      <div class="card reveal" style="text-align:center">
        <div class="stat"><b>2026</b><span>DuoMarst로 결성</span></div>
      </div>
      <div class="card reveal" style="text-align:center">
        <div class="stat"><b>약 50개</b><span>지금까지의 프로젝트</span></div>
      </div>
    </div>
  </div>
</section>

<section id="timeline-section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Timeline</span>
      <h2>타임라인</h2>
      <p>이름이 여러 번 바뀐 건 방향을 계속 다듬어온 흔적입니다.</p>
    </div>

    <div class="timeline">
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-year">2024</span>
          <h3>첫 사업 계획</h3>
          <p>처음 사업을 구상하며 "koreasung"이라는 임시 이름을 사용했습니다. 이후 방향을 다듬으며 "massier36"로 이름을 바꿨습니다.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-year">2025</span>
          <h3>코딩 · AI 분야로 확대</h3>
          <p>코딩 분야로 방향을 넓히고 다양한 AI를 적극적으로 활용하기 시작했습니다. API를 연결해 자체 "mass AI"를 테스트했고, 이 과정에서 mass AI는 Marst AI로 이름을 바꾸며 팀 이름도 "Marst"가 되었습니다.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-year">2026</span>
          <h3>회사 설립, 그리고 DuoMarst로</h3>
          <p>"Marst AI Web Studio"라는 이름으로 회사를 설립하고 홈페이지를 만들며 많은 프로젝트를 진행했습니다. 이후 팀은 "DuoCode"를 거쳐 지금의 "DuoMarst"로 자리잡았고, 지금 보고 계신 이 홈페이지를 만들게 되었습니다.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="ahead">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Ahead</span>
      <h2>앞으로의 전망</h2>
    </div>
    <div class="cta-panel reveal" style="text-align:left; max-width:720px; margin:0 auto">
      <h2 style="text-align:center; margin-bottom:20px">회사가 아닌, 고객이 중심이 되는 서비스</h2>
      <p style="text-align:center">저희는 회사가 중심이 아닌 고객들의 의견을 중심으로 한 발전형 서비스로, 실망감 0%를 목표로 노력하겠습니다. 프로젝트 하나하나가 끝이 아니라, 함께 만들어가는 과정이라고 생각합니다.</p>
    </div>
  </div>
</section>

<section id="cta">
  <div class="container">
    <div class="cta-panel reveal">
      <h2>DuoMarst와 함께할 준비 되셨나요?</h2>
      <p>지금까지의 발자취가 궁금하다면, 직접 이야기 나눠보는 것도 좋아요.</p>
      <a href="booking.html" class="btn btn-primary">상담 예약하기</a>
    </div>
  </div>
</section>
`,
  members: `
<header class="hero" style="padding-bottom:40px">
  <div class="container">
    <span class="hero-eyebrow">MEMBERS</span>
    <h1>DuoMarst를 만드는 <span class="grad">두 사람</span></h1>
    <p>서로 다른 강점이 만나서 하나의 팀이 됩니다.</p>
  </div>
</header>

<section id="member-list">
  <div class="container">
    <div class="grid-2">
      <div class="card reveal" style="text-align:center">
        <div class="icon" style="margin:0 auto 16px">M</div>
        <h3>Marst</h3>
        <p>Co-founder</p>
      </div>
      <div class="card reveal" style="text-align:center">
        <div class="icon" style="margin:0 auto 16px">?</div>
        <h3>&nbsp;</h3>
        <p>Co-founder</p>
      </div>
    </div>
  </div>
</section>

<section id="why-them">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Why them</span>
      <h2>왜 이분들인가요</h2>
    </div>
    <div class="grid-2">
      <div class="card reveal">
        <div class="icon">M</div>
        <h3>Marst — 완성으로 옮기는 사람</h3>
        <p>머릿속 아이디어를 바로 완성형으로 바꿔낼 수 있는 실행력을 가지고 있습니다. 구상이 코드로, 코드가 실제로 동작하는 결과물로 이어지는 속도가 DuoMarst의 개발 속도를 만듭니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">?</div>
        <h3>공동창업자 — 아이디어를 구체화하는 사람</h3>
        <p>아이디어 생산기 역할을 맡아, 아직 구체화되지 않은 아이디어를 다듬고 방향을 잡아냅니다. 막연한 생각이 실제로 만들 수 있는 형태가 되는 건 이 과정 덕분입니다.</p>
      </div>
    </div>
    <p style="text-align:center; color:var(--text-muted); margin-top:20px; font-size:0.9rem">
      아이디어를 구체화하는 사람과 그것을 바로 완성형으로 만드는 사람 — 이 두 역할이 맞물려서 DuoMarst의 속도와 완성도가 나옵니다.
    </p>
  </div>
</section>

<section id="apply">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Join us</span>
      <h2>멤버 신청</h2>
      <p>이런 분과 함께하고 싶어요</p>
    </div>
    <div class="grid-3">
      <div class="card reveal">
        <div class="icon">&lt;/&gt;</div>
        <h3>코딩 개념 이해</h3>
        <p>전문가 수준일 필요는 없지만, 코딩이 어떻게 동작하는지 개념을 알고 있어야 합니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">🔥</div>
        <h3>열정</h3>
        <p>완성도를 위해 끝까지 파고드는 열정이 있는 분이면 좋겠습니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">📋</div>
        <h3>규칙 준수</h3>
        <p>Marst 내에서 정한 규칙과 방식을 잘 따라주실 수 있는 분을 찾습니다.</p>
      </div>
    </div>
    <div style="text-align:center; margin-top:32px">
      <a href="contact.html" class="btn btn-primary">멤버 신청 문의하기</a>
    </div>
  </div>
</section>
`,
  booking: `
<header class="hero" style="padding-bottom:32px">
  <div class="container">
    <span class="hero-eyebrow">BOOKING</span>
    <h1>상담을 <span class="grad">예약</span>해보세요</h1>
    <p>정해진 시간에 바로 이야기 나누고 싶다면, 아래에서 원하는 시간을 선택해주세요.</p>
  </div>
</header>

<section style="padding-top:32px; padding-bottom:0">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Why book</span>
      <h2>예약을 왜 하나요</h2>
      <p>문의 폼으로도 연락은 되지만, 예약을 하면 정해진 시간에 바로 화상/전화로 이야기 나눌 수 있어서 프로젝트 방향을 훨씬 빠르게 잡을 수 있어요.</p>
    </div>
  </div>
</section>

<section style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Booking</span>
      <h2>상담 예약</h2>
      <p>월/목 19:00~21:00, 화/금 16:00~21:00 (수·주말 휴무)<br />일정에 따라 상담 시간이 조금 밀릴 수 있는 점 양해 부탁드립니다.</p>
    </div>

    <form class="form-panel reveal" id="bookingForm" novalidate style="max-width:520px">
      <div class="field">
        <label for="bookingDate">날짜 선택</label>
        <input type="date" id="bookingDate" name="date" required />
      </div>

      <div class="field" id="slotField" style="display:none">
        <label>시간 선택</label>
        <div id="slotGrid" class="slot-grid"></div>
        <p class="form-msg" id="slotMsg"></p>
      </div>

      <div id="bookingDetails" style="display:none">
        <div class="field">
          <label for="bkName">이름</label>
          <input type="text" id="bkName" name="name" maxlength="100" required />
        </div>
        <div class="field">
          <label for="bkEmail">이메일</label>
          <input type="email" id="bkEmail" name="email" required />
        </div>
        <div class="field">
          <label for="bkMessage">상담 내용 (선택)</label>
          <textarea id="bkMessage" name="message" maxlength="1000"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%" id="bookingSubmit">예약 신청하기</button>
      </div>

      <p class="form-msg" id="bookingMsg"></p>
    </form>
  </div>
</section>

<section id="when">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">When</span>
      <h2>언제 예약이 되나요</h2>
    </div>
    <div class="grid-2">
      <div class="card reveal">
        <h3>월 · 목</h3>
        <p>19:00 ~ 21:00 (20분 단위, 6타임)</p>
      </div>
      <div class="card reveal">
        <h3>화 · 금</h3>
        <p>16:00 ~ 21:00 (20분 단위, 15타임)</p>
      </div>
    </div>
    <p style="text-align:center; color:var(--text-muted); margin-top:16px; font-size:0.9rem">수요일 · 주말은 휴무입니다.</p>
  </div>
</section>
`,
  contact: `
<header class="hero" style="padding-bottom:32px">
  <div class="container">
    <span class="hero-eyebrow">CONTACT</span>
    <h1>무엇이든 <span class="grad">물어보세요</span></h1>
    <p>작은 질문 하나도, 아직 다듬어지지 않은 아이디어도 좋습니다.</p>
  </div>
</header>

<section style="padding-top:32px; padding-bottom:0">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">What we build</span>
      <h2>어떤 프로젝트가 가능한가요</h2>
      <p>프로젝트 규모에 따른 대략적인 기준이며, 정확한 견적은 문의 후 안내드립니다.</p>
    </div>
    <div class="grid-3">
      <div class="card reveal">
        <h3>단순 페이지</h3>
        <p style="margin-bottom:14px">소개 페이지, 랜딩 페이지 등</p>
        <div class="stat"><b>3일 이내</b><span>5만원 이하</span></div>
      </div>
      <div class="card reveal">
        <h3>복잡한 기능</h3>
        <p style="margin-bottom:14px">로그인, DB 연동, API 등이 포함된 서비스</p>
        <div class="stat"><b>7일 이내</b><span>20만원 이하</span></div>
      </div>
      <div class="card reveal">
        <h3>게임 개발</h3>
        <p style="margin-bottom:14px">웹 기반 게임, 인터랙티브 콘텐츠</p>
        <div class="stat"><b>1개월 이내</b><span>100만원 안팎</span></div>
      </div>
    </div>
  </div>
</section>

<section style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Contact</span>
      <h2>프로젝트 문의</h2>
      <p>간단한 내용만 남겨주셔도 검토 후 연락드립니다. 상담 일정을 바로 잡고 싶다면 <a href="booking.html" style="color:var(--accent-a)">예약 페이지</a>를 이용해주세요.</p>
    </div>
    <form class="form-panel reveal" id="contactForm" novalidate>
      <div class="field">
        <label for="name">이름</label>
        <input type="text" id="name" name="name" maxlength="100" required />
      </div>
      <div class="field">
        <label for="email">이메일</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="field">
        <label for="message">문의 내용</label>
        <textarea id="message" name="message" maxlength="2000" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%" id="contactSubmit">문의 보내기</button>
      <p class="form-msg" id="contactMsg"></p>
    </form>
  </div>
</section>

<section id="why-us">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Why DuoMarst</span>
      <h2>왜 굳이 DuoMarst인가요</h2>
    </div>
    <div class="grid-3">
      <div class="card reveal">
        <div class="icon">⚡</div>
        <h3>빠른 개발 속도</h3>
        <p>단순한 페이지는 3일, 복잡한 기능도 일주일 안에 형태를 갖춥니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">₩</div>
        <h3>합리적인 가격</h3>
        <p>필요한 것만 만들어서, 소규모 프로젝트에 부담 없는 가격으로 진행합니다.</p>
      </div>
      <div class="card reveal">
        <div class="icon">🔒</div>
        <h3>강력한 보안</h3>
        <p>프론트엔드와 백엔드를 완전히 분리해 개인정보와 핵심 로직을 안전하게 지킵니다.</p>
      </div>
    </div>
  </div>
</section>
`,
  login: `
<section style="padding-top:64px">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" id="formMode">Login</span>
      <h2 id="formTitle">로그인</h2>
    </div>

    <form class="form-panel" id="authForm" novalidate>
      <div class="field">
        <label for="email">이메일</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="field">
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" minlength="8" required />
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%" id="authSubmit">로그인</button>
      <p class="form-msg" id="authMsg"></p>

      <div class="divider">또는</div>

      <a href="#" id="googleLoginLink" class="btn btn-ghost" style="width:100%">Google로 계속하기</a>

      <p class="switch-line">
        <span id="switchText">계정이 없으신가요?</span>
        <button type="button" id="switchBtn">회원가입</button>
      </p>
    </form>
  </div>
</section>
`,
  dashboard: `
<section style="padding-top:64px">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Dashboard</span>
      <h2 id="welcomeMsg">불러오는 중...</h2>
    </div>
  </div>
</section>
`
};
const PAGE_META = {
  home: { title: "DuoMarst \u2014 \uc6f9 \u00b7 \uc571 \u00b7 AI", nav: "default" },
  history: { title: "\uc5ed\uc0ac \u2014 DuoMarst", nav: "default" },
  members: { title: "\uba64\ubc84 \u2014 DuoMarst", nav: "default" },
  booking: { title: "\uc608\uc57d \u2014 DuoMarst", nav: "default" },
  contact: { title: "\ubb38\uc758 \u2014 DuoMarst", nav: "default" },
  login: { title: "\ub85c\uadf8\uc778 \u2014 DuoMarst", nav: "bare" },
  dashboard: { title: "\ub300\uc2dc\ubcf4\ub4dc \u2014 DuoMarst", nav: "dashboard" }
};
function renderPage() {
  const page = document.body.dataset.page;
  const meta = PAGE_META[page];
  const body = PAGE_BODIES[page];
  const root = document.getElementById("root");
  if (!meta || body === undefined || !root) return;

  document.title = meta.title;
  root.innerHTML = navHTML(meta.nav) + body + FOOTER_HTML;
}

/* ---------- 테마 토글 (다크/화이트) ---------- */
(function initThemeState() {
  const stored = localStorage.getItem("duomarst-theme");
  const initial = stored || "dark";
  document.documentElement.setAttribute("data-theme", initial);
})();

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  btn.textContent = current === "dark" ? "🌙" : "☀️";
  btn.addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme");
    const next = now === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("duomarst-theme", next);
    btn.textContent = next === "dark" ? "🌙" : "☀️";
  });
}

/* ---------- 스크롤 reveal 애니메이션 ---------- */
function initRevealObserver() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

function setMsg(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = "form-msg" + (type ? " " + type : "");
}

/* ---------- 문의 폼 (contact.html) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const msgEl = document.getElementById("contactMsg");
  const submitBtn = document.getElementById("contactSubmit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(msgEl, "", "");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      setMsg(msgEl, "모든 항목을 입력해주세요.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "전송 중...";
    setMsg(msgEl, "처리 중입니다. 처리 중에는 이 창을 닫지 마세요.", "info");

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(msgEl, data.error || "전송에 실패했습니다.", "error");
      } else {
        setMsg(msgEl, "문의가 접수되었습니다. 빠르게 연락드릴게요.", "success");
        form.reset();
      }
    } catch (err) {
      setMsg(msgEl, "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "문의 보내기";
    }
  });
}

/* ---------- 로그인 / 회원가입 (login.html) ---------- */
function initAuthForm() {
  const form = document.getElementById("authForm");
  if (!form) return;

  const msgEl = document.getElementById("authMsg");
  const submitBtn = document.getElementById("authSubmit");
  const modeEyebrow = document.getElementById("formMode");
  const titleEl = document.getElementById("formTitle");
  const switchText = document.getElementById("switchText");
  const switchBtn = document.getElementById("switchBtn");
  const googleLink = document.getElementById("googleLoginLink");

  if (googleLink) {
    googleLink.href = `${API_BASE_URL}/auth/google`;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("error")) {
    setMsg(msgEl, "구글 로그인에 실패했습니다. 다시 시도해주세요.", "error");
  }

  let mode = "login";

  function applyMode() {
    if (mode === "login") {
      modeEyebrow.textContent = "Login";
      titleEl.textContent = "로그인";
      submitBtn.textContent = "로그인";
      switchText.textContent = "계정이 없으신가요?";
      switchBtn.textContent = "회원가입";
    } else {
      modeEyebrow.textContent = "Sign up";
      titleEl.textContent = "회원가입";
      submitBtn.textContent = "회원가입";
      switchText.textContent = "이미 계정이 있으신가요?";
      switchBtn.textContent = "로그인";
    }
    setMsg(msgEl, "", "");
  }

  switchBtn.addEventListener("click", () => {
    mode = mode === "login" ? "register" : "login";
    applyMode();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(msgEl, "", "");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || password.length < 8) {
      setMsg(msgEl, "이메일과 8자 이상의 비밀번호를 입력해주세요.", "error");
      return;
    }

    submitBtn.disabled = true;
    setMsg(msgEl, "처리 중입니다. 처리 중에는 이 창을 닫지 마세요.", "info");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(msgEl, data.error || "처리에 실패했습니다.", "error");
      } else {
        window.location.href = "dashboard.html";
      }
    } catch (err) {
      setMsg(msgEl, "네트워크 오류가 발생했습니다.", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ---------- 예약 (booking.html) ---------- */
function initBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const dateInput = document.getElementById("bookingDate");
  const slotField = document.getElementById("slotField");
  const slotGrid = document.getElementById("slotGrid");
  const slotMsg = document.getElementById("slotMsg");
  const detailsBox = document.getElementById("bookingDetails");
  const bookingMsg = document.getElementById("bookingMsg");
  const submitBtn = document.getElementById("bookingSubmit");

  const today = new Date();
  dateInput.min = today.toISOString().slice(0, 10);

  let selectedTime = null;

  function resetSelection() {
    selectedTime = null;
    detailsBox.style.display = "none";
    setMsg(bookingMsg, "", "");
  }

  async function loadAvailability() {
    resetSelection();
    slotField.style.display = "none";
    slotGrid.innerHTML = "";
    setMsg(slotMsg, "", "");

    if (!dateInput.value) return;

    setMsg(slotMsg, "불러오는 중...", "info");
    slotField.style.display = "block";

    try {
      const res = await fetch(
        `${API_BASE_URL}/booking/availability?date=${dateInput.value}`
      );
      const data = await res.json();

      if (!res.ok) {
        setMsg(slotMsg, data.error || "조회에 실패했습니다.", "error");
        return;
      }

      if (!data.available) {
        setMsg(slotMsg, "이 날짜는 상담이 불가능합니다. 다른 날짜를 선택해주세요.", "error");
        return;
      }

      setMsg(slotMsg, "", "");
      data.slots.forEach((slot) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "slot-btn";
        btn.textContent = slot.time;
        btn.disabled = slot.taken;
        btn.addEventListener("click", () => {
          selectedTime = slot.time;
          slotGrid.querySelectorAll(".slot-btn").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          detailsBox.style.display = "block";
        });
        slotGrid.appendChild(btn);
      });
    } catch (err) {
      setMsg(slotMsg, "네트워크 오류가 발생했습니다.", "error");
    }
  }

  dateInput.addEventListener("change", loadAvailability);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(bookingMsg, "", "");

    if (!dateInput.value || !selectedTime) {
      setMsg(bookingMsg, "날짜와 시간을 선택해주세요.", "error");
      return;
    }

    const name = document.getElementById("bkName").value.trim();
    const email = document.getElementById("bkEmail").value.trim();
    const message = document.getElementById("bkMessage").value.trim();

    if (!name || !email) {
      setMsg(bookingMsg, "이름과 이메일을 입력해주세요.", "error");
      return;
    }

    submitBtn.disabled = true;
    setMsg(bookingMsg, "처리 중입니다. 처리 중에는 이 창을 닫지 마세요.", "info");

    try {
      const res = await fetch(`${API_BASE_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateInput.value,
          time: selectedTime,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(bookingMsg, data.error || "예약에 실패했습니다.", "error");
        if (res.status === 409) {
          loadAvailability();
        }
      } else {
        setMsg(bookingMsg, "예약이 접수되었습니다. 확인 후 연락드릴게요.", "success");
        form.reset();
        slotField.style.display = "none";
        detailsBox.style.display = "none";
      }
    } catch (err) {
      setMsg(bookingMsg, "네트워크 오류가 발생했습니다.", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ---------- 대시보드 (dashboard.html) ---------- */
function initDashboard() {
  const welcomeMsg = document.getElementById("welcomeMsg");
  const logoutBtn = document.getElementById("logoutBtn");
  if (!welcomeMsg) return;

  (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/dashboard-data`, {
        credentials: "include",
      });
      if (!res.ok) {
        window.location.href = "login.html";
        return;
      }
      const data = await res.json();
      welcomeMsg.textContent = data.message;
    } catch (err) {
      welcomeMsg.textContent = "정보를 불러오지 못했습니다.";
    }
  })();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } finally {
        window.location.href = "login.html";
      }
    });
  }
}

/* ---------- 진입점: 페이지 렌더링 후 각 기능 초기화 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderPage();
  initThemeToggle();
  initRevealObserver();
  initContactForm();
  initAuthForm();
  initBookingForm();
  initDashboard();
});
