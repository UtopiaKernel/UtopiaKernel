export function getRoute(state) {
  const raw = location.hash.replace(/^#\/?/, "");
  if (!raw) return state.defaultRoute;
  return raw.replace(/^\//, "").replace(/\/+$/, "");
}

export function toDocPath(route) {
  const safe = route.replace(/[^a-zA-Z0-9/_-]/g, "");
  return `docs/${safe}.md`;
}

