// Theme toggle
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const saved = localStorage.getItem("theme");
if (saved === "light") {
  html.setAttribute("data-theme", "light");
  toggle.textContent = "🌙";
}

toggle.addEventListener("click", () => {
  const isLight = html.getAttribute("data-theme") === "light";
  if (isLight) {
    html.removeAttribute("data-theme");
    toggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    toggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// Smooth active nav (optional enhancement)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});
