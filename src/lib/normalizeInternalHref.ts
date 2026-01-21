export function normalizeInternalHref(href: string) {
  const trimmed = (href || "").trim();
  if (!trimmed) return "/";

  if (trimmed.startsWith("?")) {
    const [queryPart, hashPart = ""] = trimmed.slice(1).split("#");
    const hashPath = hashPart.startsWith("/") ? hashPart : `/${hashPart}`;
    if (hashPart) return `${hashPath}${queryPart ? `?${queryPart}` : ""}`;
    return `/${trimmed}`;
  }

  const [path, hash = ""] = trimmed.split("#");
  const base = path.startsWith("/") ? path : `/${path}`;
  if (!hash) return base;

  const normalizedHash = hash.startsWith("/") ? hash : `/${hash}`;
  return normalizedHash;
}

