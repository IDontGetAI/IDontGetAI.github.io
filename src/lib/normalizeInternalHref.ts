import { compressGitHubUrl } from "@/lib/utils";

function compressViewerSrcParam(href: string) {
  const [path, query = ""] = href.split("?");
  if (path !== "/note-viewer" && path !== "/pdf-viewer") return href;
  if (!query) return href;

  const params = new URLSearchParams(query);
  const src = params.get("src") || "";
  if (!src) return href;

  const compressed = compressGitHubUrl(src);
  if (!compressed || compressed === src || compressed.length >= src.length) return href;

  params.set("src", compressed);
  return `${path}?${params.toString()}`;
}

export function normalizeInternalHref(href: string) {
  const trimmed = (href || "").trim();
  if (!trimmed) return "/";

  if (trimmed.startsWith("?")) {
    const [queryPart, hashPart = ""] = trimmed.slice(1).split("#");
    const hashPath = hashPart.startsWith("/") ? hashPart : `/${hashPart}`;
    const normalized = hashPart ? `${hashPath}${queryPart ? `?${queryPart}` : ""}` : `/${trimmed}`;
    return compressViewerSrcParam(normalized);
  }

  const [path, hash = ""] = trimmed.split("#");
  const base = path.startsWith("/") ? path : `/${path}`;
  if (!hash) return compressViewerSrcParam(base);

  const normalizedHash = hash.startsWith("/") ? hash : `/${hash}`;
  return compressViewerSrcParam(normalizedHash);
}
