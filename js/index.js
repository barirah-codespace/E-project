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
window.onload = type;

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

// Login/Registration
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("regUsername").value;
  const pass = document.getElementById("regPassword").value;
  localStorage.setItem("musicUser", JSON.stringify({ user, pass }));
  alert("Registration successful!");
  window.location.href = "login.html";
});

document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  const saved = JSON.parse(localStorage.getItem("musicUser"));

  if (saved && saved.user === user && saved.pass === pass) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials.");
  }
});

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
