// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggle.checked = true;
} else {
  body.classList.add("default-theme");
}

themeToggle?.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.replace("default-theme", "dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark-theme", "default-theme");
    localStorage.setItem("theme", "default");
  }
});

// Scroll to Top Button
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Typing Animation
const texts = ["Welcome to Music World 🎧", "Discover Top Artists 🎤", "Enjoy Albums & Events 🎵"];
let count = 0, index = 0, currentText = "", letter = "";

function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.getElementById("typed-text").textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000);
  } else {
    setTimeout(type, 120);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  type();
});


// Play Song
function togglePlay(id) {
  const audio = document.getElementById(id);
  audio.classList.remove('d-none');
  audio.play();
}

// Genre Filter
const genreSelect = document.getElementById("genreSelect");
genreSelect?.addEventListener("change", function () {
  const selected = this.value;
  document.querySelectorAll(".genre-card").forEach(card => {
    const genre = card.getAttribute("data-genre");
    card.style.display = (selected === "all" || genre === selected) ? "block" : "none";
  });
});

// Album Search Filter
const albumSearch = document.getElementById("albumSearch");
albumSearch?.addEventListener("input", () => {
  const query = albumSearch.value.toLowerCase();
  document.querySelectorAll(".album-item").forEach(item => {
    const title = item.getAttribute("data-title").toLowerCase();
    item.style.display = title.includes(query) ? "block" : "none";
  });
  AOS.refresh();
});

// Redirect to login if not logged in
if (window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
  if (!localStorage.getItem("isLoggedIn")) {
    alert("Please login first!");
    window.location.href = "login.html";
  }
}



// Utility Function
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}




// Show download buttons based on login
document.addEventListener("DOMContentLoaded", () => {
  if (isLoggedIn()) {
    document.querySelectorAll(".download-btn").forEach(btn => {
      btn.classList.remove("d-none");
      btn.addEventListener("click", () => {
        alert("Your download will start shortly.");
      });
    });

    // Optional greeting
    const savedUser = JSON.parse(localStorage.getItem("musicUser"));
    if (savedUser && document.getElementById("greeting")) {
      document.getElementById("greeting").textContent = `Welcome, ${savedUser.user}!`;
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginNav");
  const logoutBtn = document.getElementById("logoutNav");
  const greeting = document.getElementById("navGreeting");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("musicUser"));

  if (isLoggedIn && user) {
    loginBtn?.classList.add("d-none");
    logoutBtn?.classList.remove("d-none");
    greeting.textContent = `Welcome, ${user.user}`;
    greeting.classList.remove("d-none");
  } else {
    loginBtn?.classList.remove("d-none");
    logoutBtn?.classList.add("d-none");
    greeting?.classList.add("d-none");
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("musicUser");
    window.location.href = "login.html";
  });
});
