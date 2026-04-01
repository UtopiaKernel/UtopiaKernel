// Compatibility shim (old non-module entrypoint).
// The project has been modularized into:
// - docs:   ./assets/docs/main.js
// - portal: ./assets/portal/main.js
//
// Keep this file so older cached pages won't break.
(async () => {
  try {
    const isDocs = document.getElementById("doc") && document.getElementById("navItems");
    if (isDocs) {
      await import("./docs/main.js");
      return;
    }
    await import("./portal/main.js");
  } catch {
    // no-op
  }
})();

