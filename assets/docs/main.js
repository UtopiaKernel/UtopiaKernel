import { qs } from "../shared/dom.js";
import { initThemeToggle } from "../shared/theme.js";
import { createAppState } from "./state.js";
import { configureMarked } from "./markdown.js";
import { initSidebarToggle } from "./sidebar.js";
import { loadNav } from "./nav.js";
import { initSearch } from "./search.js";
import { getRoute } from "./router.js";
import { renderRoute } from "./render.js";

async function bootstrap() {
  const state = createAppState();

  configureMarked();
  initSidebarToggle();
  initThemeToggle();
  await loadNav(state);
  await initSearch(state);

  const onHash = async () => {
    const route = getRoute(state);
    const clean = route.split("::")[0];
    await renderRoute(state, clean);
  };

  window.addEventListener("hashchange", onHash);
  await onHash();

  window.addEventListener("hashchange", () => {
    const main = qs("#main");
    if (main) main.focus({ preventScroll: true });
  });
}

bootstrap().catch(() => {
  const docEl = qs("#doc");
  if (docEl) docEl.textContent = "站点初始化失败。";
});

