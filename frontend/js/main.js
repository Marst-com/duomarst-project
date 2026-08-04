// 배포 시 실제 백엔드 주소로 바꿔주세요.
const API_BASE_URL = "https://duomarst-project.onrender.com";

/* ---------- 테마 토글 (다크/화이트) ---------- */
(function initTheme() {
  const stored = localStorage.getItem("duomarst-theme");
  const initial = stored || "dark";
  document.documentElement.setAttribute("data-theme", initial);

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.textContent = initial === "dark" ? "🌙" : "☀️";
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("duomarst-theme", next);
      btn.textContent = next === "dark" ? "🌙" : "☀️";
    });
  });
})();

function setMsg(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = "form-msg" + (type ? " " + type : "");
}

/* ---------- 스크롤 reveal 애니메이션 ---------- */
document.addEventListener("DOMContentLoaded", () => {
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
});

/* ---------- 문의 폼 (index.html) ---------- */
document.addEventListener("DOMContentLoaded", () => {
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
});

/* ---------- 로그인 / 회원가입 (login.html) ---------- */
document.addEventListener("DOMContentLoaded", () => {
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

  // URL에 ?error=... 가 붙어 돌아온 경우 (구글 로그인 실패 등) 메시지 표시
  const params = new URLSearchParams(window.location.search);
  if (params.get("error")) {
    setMsg(msgEl, "구글 로그인에 실패했습니다. 다시 시도해주세요.", "error");
  }

  let mode = "login"; // "login" | "register"

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
        credentials: "include", // httpOnly 세션 쿠키를 받기 위해 필요
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
});

/* ---------- 예약 (booking.html) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const dateInput = document.getElementById("bookingDate");
  const slotField = document.getElementById("slotField");
  const slotGrid = document.getElementById("slotGrid");
  const slotMsg = document.getElementById("slotMsg");
  const detailsBox = document.getElementById("bookingDetails");
  const bookingMsg = document.getElementById("bookingMsg");
  const submitBtn = document.getElementById("bookingSubmit");

  // 오늘 이전 날짜는 선택 못하게
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
          loadAvailability(); // 이미 선점된 시간이면 목록 새로고침
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
});

/* ---------- 대시보드 (dashboard.html) ---------- */
document.addEventListener("DOMContentLoaded", () => {
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
});
