import { compressGitHubUrl } from "@/lib/utils";

type ViewerPageType = "pdf" | "note";

const RETURN_TO_KEY = "idontgetai:giscus:returnTo";
const RETURN_TO_AT_KEY = "idontgetai:giscus:returnToAt";
const VIEWER_ACTIVE_KEY = "idontgetai:giscus:viewerActive";
const RESTORED_FOR_KEY = "idontgetai:giscus:restoredFor";

const MAX_AGE_MS = 15 * 60 * 1000;

function safeSessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    return;
  }
}

function safeSessionRemove(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    return;
  }
}

function parseHashLocation(hash: string) {
  const raw = (hash || "").replace(/^#/, "");
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = (pathPart || "/").startsWith("/") ? (pathPart || "/") : `/${pathPart || ""}`;
  return { path, queryString: queryPart };
}

function isHashRouterFragment() {
  return (window.location.hash || "").startsWith("#/");
}

function getQueryFromLocation() {
  const { queryString: hashQuery } = parseHashLocation(window.location.hash);
  if (hashQuery) return { queryString: hashQuery, locationKind: "hash" as const };
  const search = window.location.search.startsWith("?") ? window.location.search.slice(1) : window.location.search;
  return { queryString: search, locationKind: "search" as const };
}

function getGiscusCallbackToken() {
  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("giscus");
    return token || "";
  } catch {
    return "";
  }
}

function addGiscusTokenToTargetUrl(targetUrl: string) {
  const token = getGiscusCallbackToken();
  if (!token) return targetUrl;
  try {
    const parsed = new URL(targetUrl);
    if (!parsed.searchParams.get("giscus")) {
      parsed.searchParams.set("giscus", token);
    }
    return parsed.toString();
  } catch {
    return targetUrl;
  }
}

export function normalizeViewerSrcParamInPlace() {
  if (typeof window === "undefined" || typeof history === "undefined") return false;

  const { path } = parseHashLocation(window.location.hash);
  if (path !== "/pdf-viewer" && path !== "/note-viewer") return false;

  const { queryString, locationKind } = getQueryFromLocation();
  if (!queryString) return false;

  const params = new URLSearchParams(queryString);
  const src = params.get("src") || "";
  if (!src) return false;

  const compressed = compressGitHubUrl(src);
  if (!compressed || compressed === src || compressed.length >= src.length) return false;

  params.set("src", compressed);
  const nextQuery = params.toString();

  if (locationKind === "hash") {
    const nextHash = `#${path}?${nextQuery}`;
    history.replaceState(null, "", nextHash);
    return true;
  }

  const nextUrl = `${window.location.pathname}?${nextQuery}${window.location.hash || ""}`;
  history.replaceState(null, "", nextUrl);
  return true;
}

export function markViewerActive(pageType: ViewerPageType) {
  if (typeof window === "undefined") return;
  safeSessionSet(VIEWER_ACTIVE_KEY, pageType);
  safeSessionSet(RETURN_TO_KEY, window.location.href);
  safeSessionSet(RETURN_TO_AT_KEY, String(Date.now()));
}

export function clearViewerActive() {
  safeSessionRemove(VIEWER_ACTIVE_KEY);
}

function isRecentEnough(tsRaw: string | null) {
  const ts = tsRaw ? Number(tsRaw) : NaN;
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts <= MAX_AGE_MS;
}

function isTrustedReturnToUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

function isBrokenViewerState() {
  const { path: hashPath, queryString: hashQuery } = parseHashLocation(window.location.hash);
  const searchQuery = window.location.search.startsWith("?") ? window.location.search.slice(1) : window.location.search;

  if (hashPath === "/pdf-viewer" || hashPath === "/note-viewer") {
    const params = new URLSearchParams(hashQuery || searchQuery);
    return !params.get("src");
  }

  if (!isHashRouterFragment()) {
    return true;
  }

  return hashPath === "/" || hashPath === "";
}

export function restoreReturnToIfNeeded() {
  if (typeof window === "undefined" || typeof history === "undefined") return false;

  const active = safeSessionGet(VIEWER_ACTIVE_KEY);
  const returnTo = safeSessionGet(RETURN_TO_KEY);
  const returnToAt = safeSessionGet(RETURN_TO_AT_KEY);

  if (!active || !returnTo || !isRecentEnough(returnToAt)) {
    safeSessionRemove(VIEWER_ACTIVE_KEY);
    safeSessionRemove(RETURN_TO_KEY);
    safeSessionRemove(RETURN_TO_AT_KEY);
    return false;
  }

  if (!isTrustedReturnToUrl(returnTo)) {
    safeSessionRemove(VIEWER_ACTIVE_KEY);
    safeSessionRemove(RETURN_TO_KEY);
    safeSessionRemove(RETURN_TO_AT_KEY);
    return false;
  }

  if (window.location.href === returnTo) return false;

  const referrer = document.referrer || "";
  const hasGiscusToken = Boolean(getGiscusCallbackToken());
  const fromAuthReferrer = /(^|\/\/)(github\.com|giscus\.app)(\/|$)/i.test(referrer);
  const fromAuth = hasGiscusToken || fromAuthReferrer;

  if (!isBrokenViewerState()) return false;
  if (!fromAuth && referrer) return false;

  const finalUrl = addGiscusTokenToTargetUrl(returnTo);

  const restoredFor = safeSessionGet(RESTORED_FOR_KEY);
  if (restoredFor === finalUrl) return false;

  history.replaceState(null, "", finalUrl);
  safeSessionSet(RESTORED_FOR_KEY, finalUrl);
  safeSessionRemove(VIEWER_ACTIVE_KEY);
  return true;
}
