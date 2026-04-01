import { qs } from "../shared/dom.js";

export function initSidebarToggle() {
  const btn = qs("#sidebarToggle");
  const sidebar = qs("#sidebar");
  if (!btn || !sidebar) return;

  const apply = (open) => {
    if (window.matchMedia("(max-width: 980px)").matches) {
      sidebar.hidden = !open;
    }
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  let open = true;
  apply(open);
  btn.addEventListener("click", () => {
    open = !open;
    apply(open);
  });
}

