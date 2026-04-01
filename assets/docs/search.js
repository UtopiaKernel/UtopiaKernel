import { fetchText } from "../shared/basePath.js";
import { qs } from "../shared/dom.js";
import { debounce, escapeHtml } from "../shared/utils.js";
import { toDocPath } from "./router.js";

export async function initSearch(state) {
  const input = qs("#searchInput");
  const box = qs("#searchResults");
  if (!input || !box) return;

  const pages = state.nav?.items ?? [];

  const showResults = (items) => {
    if (!items.length) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    box.hidden = false;
    box.innerHTML = items
      .slice(0, 8)
      .map((x) => {
        return `
          <a class="search-results__item" href="#/${x.route}">
            <div class="search-results__title">${escapeHtml(x.title)}</div>
            <div class="search-results__snippet">${escapeHtml(x.snippet)}</div>
          </a>
        `;
      })
      .join("");
  };

  const doSearch = debounce(async () => {
    const q = input.value.trim();
    if (!q) return showResults([]);

    const qLower = q.toLowerCase();
    const scored = [];
    for (const p of pages) {
      try {
        const mdPath = toDocPath(p.route);
        let md = state.pagesCache.get(mdPath);
        if (!md) {
          md = await fetchText(mdPath, state.basePath);
          state.pagesCache.set(mdPath, md);
        }
        const hay = md.toLowerCase();
        const idx = hay.indexOf(qLower);
        if (idx !== -1) {
          const start = Math.max(0, idx - 28);
          const end = Math.min(md.length, idx + q.length + 48);
          const snippet = md.slice(start, end).replace(/\s+/g, " ").trim();
          scored.push({ route: p.route, title: p.title, snippet });
        }
      } catch {
        // ignore missing pages
      }
    }
    showResults(scored);
  }, 180);

  input.addEventListener("input", doSearch);
  input.addEventListener("focus", doSearch);
  document.addEventListener("click", (e) => {
    if (!box.contains(e.target) && e.target !== input) showResults([]);
  });
}

