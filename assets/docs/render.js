/* global marked */

import { fetchText } from "../shared/basePath.js";
import { qs } from "../shared/dom.js";
import { toDocPath } from "./router.js";
import { postProcessRenderedDoc } from "./markdown.js";
import { setActiveNav, renderBreadcrumbs } from "./nav.js";

export async function renderRoute(state, route) {
  setActiveNav(route);
  renderBreadcrumbs(state, route);

  const docEl = qs("#doc");
  if (!docEl) return;

  const mdPath = toDocPath(route);

  try {
    let md = state.pagesCache.get(mdPath);
    if (!md) {
      md = await fetchText(mdPath, state.basePath);
      state.pagesCache.set(mdPath, md);
    }
    docEl.innerHTML = marked.parse(md);
    postProcessRenderedDoc(docEl);
    scrollToAnchorIfNeeded();
  } catch {
    const notFound = await safeFetchNotFound(state);
    docEl.innerHTML = marked.parse(notFound);
    postProcessRenderedDoc(docEl);
  }
}

function scrollToAnchorIfNeeded() {
  // We support #/home::section-id as a simple convention.
  const raw = location.hash;
  const idx = raw.indexOf("::");
  if (idx === -1) return;
  const id = raw.slice(idx + 2);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ block: "start" });
}

async function safeFetchNotFound(state) {
  try {
    return await fetchText("docs/404.md", state.basePath);
  } catch {
    return "# 404\n\n未找到该页面。";
  }
}

