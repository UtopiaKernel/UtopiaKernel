export function detectBasePath(repoName = "UtopiaKernel") {
  // If served from /<repoName>/..., keep that as base. Otherwise assume root.
  const p = location.pathname.replace(/\\/g, "/");
  const m = p.match(new RegExp(`^(.*\\/${repoName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\/)`, "i"));
  if (m) return m[1];
  // if index.html in root of a custom domain, pathname may be / or /index.html
  return p.endsWith("/") ? p : p.replace(/[^/]*$/, "");
}

export function absUrl(relPath, basePath) {
  const base = basePath || "/";
  return new URL(relPath, location.origin + base).toString();
}

export async function fetchText(relPath, basePath) {
  const u = absUrl(relPath, basePath);
  const res = await fetch(u, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${relPath}`);
  return await res.text();
}

