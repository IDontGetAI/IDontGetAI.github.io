import { compressGitHubUrl } from "@/lib/utils";

type ViewerPageType = "pdf" | "note";

const RETURN_TO_KEY = "idontgetai:giscus:returnTo";
const RETURN_TO_AT_KEY = "idontgetai:giscus:returnToAt";
const VIEWER_ACTIVE_KEY = "idontgetai:giscus:viewerActive";
const RESTORED_FOR_KEY = "idontgetai:giscus:restoredFor";

const MAX_AGE_MS = 15 * 60 * 1000;

function safeStorageGet(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    return;
  }
}

function safeStorageRemove(storage: Storage, key: string) {
  try {
    storage.removeItem(key);
  } catch {
    return;
  }
}

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

function safeLocalGet(key: string): string | null {
  if (typeof localStorage === "undefined") return null;
  return safeStorageGet(localStorage, key);
}

function safeLocalSet(key: string, value: string) {
  if (typeof localStorage === "undefined") return;
  safeStorageSet(localStorage, key, value);
}

function safeLocalRemove(key: string) {
  if (typeof localStorage === "undefined") return;
  safeStorageRemove(localStorage, key);
}

function safeGet(key: string) {
  return safeSessionGet(key) ?? safeLocalGet(key);
}

function safeSet(key: string, value: string) {
  safeSessionSet(key, value);
  safeLocalSet(key, value);
}

function safeRemove(key: string) {
  safeSessionRemove(key);
  safeLocalRemove(key);
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
  safeSet(VIEWER_ACTIVE_KEY, pageType);
  safeSet(RETURN_TO_KEY, window.location.href);
  safeSet(RETURN_TO_AT_KEY, String(Date.now()));
}

export function clearViewerActive() {
  safeRemove(VIEWER_ACTIVE_KEY);
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

function isViewerRouteMissingSrc() {
  const { path: hashPath, queryString: hashQuery } = parseHashLocation(window.location.hash);
  if (hashPath !== "/pdf-viewer" && hashPath !== "/note-viewer") return false;
  const searchQuery = window.location.search.startsWith("?") ? window.location.search.slice(1) : window.location.search;
  const params = new URLSearchParams(hashQuery || searchQuery);
  return !params.get("src");
}

export function restoreReturnToIfNeeded() {
  if (typeof window === "undefined" || typeof history === "undefined") return false;

  const active = safeGet(VIEWER_ACTIVE_KEY);
  const returnTo = safeGet(RETURN_TO_KEY);
  const returnToAt = safeGet(RETURN_TO_AT_KEY);
  const hasGiscusToken = Boolean(getGiscusCallbackToken());

  if ((!active && !hasGiscusToken) || !returnTo || !isRecentEnough(returnToAt)) {
    safeRemove(VIEWER_ACTIVE_KEY);
    return false;
  }

  if (!isTrustedReturnToUrl(returnTo)) {
    safeRemove(VIEWER_ACTIVE_KEY);
    safeRemove(RETURN_TO_KEY);
    safeRemove(RETURN_TO_AT_KEY);
    return false;
  }

  if (window.location.href === returnTo) return false;

  const referrer = document.referrer || "";
  const fromAuthReferrer = /(^|\/\/)(github\.com|giscus\.app)(\/|$)/i.test(referrer);
  const fromAuth = hasGiscusToken || fromAuthReferrer;

  if (!isBrokenViewerState()) return false;
  if (!fromAuth && !active && !isViewerRouteMissingSrc() && referrer) return false;

  const finalUrl = addGiscusTokenToTargetUrl(returnTo);

  const restoredFor = safeGet(RESTORED_FOR_KEY);
  if (restoredFor === finalUrl) return false;

  history.replaceState(null, "", finalUrl);
  safeSet(RESTORED_FOR_KEY, finalUrl);
  safeRemove(VIEWER_ACTIVE_KEY);
  return true;
}
