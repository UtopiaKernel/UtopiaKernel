import { detectBasePath } from "../shared/basePath.js";

export function createAppState() {
  return {
    repoName: "UtopiaKernel",
    basePath: detectBasePath("UtopiaKernel"),
    defaultRoute: "home",
    nav: null,
    pagesCache: new Map(),
  };
}

