import { qs } from "./dom.js";

function updateThemeIcon() {
  const t = localStorage.getItem("theme");
  const btn = qs("#themeToggle");
  if (!btn) return;
  btn.title = t ? `主题：${t}` : "主题：跟随系统";
}

export function setTheme(next) {
  const html = document.documentElement;
  if (next === "system") {
    html.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  } else {
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }
  updateThemeIcon();
}

export function initThemeToggle() {
  const btn = qs("#themeToggle");
  if (!btn) return;

  // cycle: system -> dark -> light -> system
  updateThemeIcon();
  btn.addEventListener("click", () => {
    const current = localStorage.getItem("theme"); // "dark" | "light" | null
    if (current === null) setTheme("dark");
    else if (current === "dark") setTheme("light");
    else setTheme("system");
  });

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
  }
  updateThemeIcon();
}

