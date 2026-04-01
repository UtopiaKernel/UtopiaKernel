import { fetchText } from "../shared/basePath.js";
import { qs, qsa } from "../shared/dom.js";
import { escapeHtml } from "../shared/utils.js";

export async function loadNav(state) {
  const raw = await fetchText("docs/nav.json", state.basePath);
  const nav = JSON.parse(raw);
  state.nav = nav;
  renderNav(nav);
}

export function renderNav(nav) {
  const el = qs("#navItems");
  if (!el) return;
  el.innerHTML = "";
  for (const item of nav.items) {
    const a = document.createElement("a");
    a.className = "nav__item";
    a.href = `#/${item.route}`;
    a.dataset.route = item.route;
    a.innerHTML = `<span>${escapeHtml(item.title)}</span>${
      item.badge ? `<span class="nav__badge">${escapeHtml(item.badge)}</span>` : ""
    }`;
    el.appendChild(a);
  }
}

export function setActiveNav(route) {
  for (const a of qsa(".nav__item")) {
    const r = a.dataset.route;
    a.classList.toggle("is-active", r === route);
  }
}

export function renderBreadcrumbs(state, route) {
  const bc = qs("#breadcrumbs");
  if (!bc) return;
  const item = state.nav?.items?.find((x) => x.route === route);
  const title = item?.title ?? route;
  bc.innerHTML = `<a href="#/home">首页</a> <span aria-hidden="true">/</span> <span>${escapeHtml(title)}</span>`;
}

