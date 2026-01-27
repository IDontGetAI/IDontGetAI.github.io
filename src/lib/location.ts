export type LocationSnapshot = {
  href: string;
  hash: string;
  search: string;
  pathname: string;
};

let historyPatched = false;

export function ensureLocationEvents() {
  if (historyPatched) return;
  historyPatched = true;

  const dispatch = () => window.dispatchEvent(new Event("locationchange"));

  const wrap = (method: "pushState" | "replaceState") => {
    const original = history[method];
    history[method] = function (...args: Parameters<History["replaceState"]>) {
      const result = original.apply(this, args as unknown as [any, string, string?]);
      dispatch();
      return result;
    } as History["replaceState"];
  };

  wrap("pushState");
  wrap("replaceState");

  window.addEventListener("popstate", dispatch);
  window.addEventListener("hashchange", dispatch);
}

export function getLocationSnapshot(): LocationSnapshot {
  const { href, hash, search, pathname } = window.location;
  return { href, hash, search, pathname };
}

export function getQueryStringFromSnapshot(snapshot: Pick<LocationSnapshot, "hash" | "search">) {
  const hash = snapshot.hash || "";
  const questionIndex = hash.indexOf("?");
  if (questionIndex >= 0) return hash.slice(questionIndex + 1);

  const search = snapshot.search || "";
  if (search.startsWith("?")) return search.slice(1);
  return search;
}

export function devLog(scope: string, payload: Record<string, unknown>) {
  if (!import.meta.env.DEV) return;
  const time = new Date().toISOString();
  console.log(`[${time}] ${scope}`, payload);
}
