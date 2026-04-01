/* global marked, hljs */

import { escapeHtml } from "../shared/utils.js";

export function configureMarked() {
  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
    mangle: false,
    highlight(code, lang) {
      try {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      } catch {
        return escapeHtml(code);
      }
    },
  });
}

export function postProcessRenderedDoc(docEl) {
  docEl.querySelectorAll("pre code").forEach((block) => hljs.highlightElement(block));
  attachExternalLinkTargets(docEl);
}

function attachExternalLinkTargets(root) {
  const anchors = root.querySelectorAll("a[href]");
  for (const a of anchors) {
    const href = a.getAttribute("href") || "";
    if (/^https?:\/\//i.test(href)) {
      a.target = "_blank";
      a.rel = "noreferrer";
    }
  }
}

