// Register
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("regUsername").value;
  const pass = document.getElementById("regPassword").value;
  localStorage.setItem("musicUser", JSON.stringify({ user, pass }));
  alert("Registration successful!");
  window.location.href = "login.html";
});

// Login
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

