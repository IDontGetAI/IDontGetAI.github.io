import { useEffect, useMemo, useRef, useState } from "react";
import Giscus from "@giscus/react";
import { Loader2, AlertCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getGiscusErrorMessage, isDiscussionNotFoundError } from "@/lib/giscusError";

type PageType = "pdf" | "note";

interface GiscusCommentsProps {
  pageType: PageType;
  title?: string;
  sourceUrl?: string;
  className?: string;
}

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
};

const deriveTitleFromUrl = (url?: string) => {
  if (!url) return "";
  try {
    const decoded = decodeURIComponent(url);
    const parsed = new URL(decoded);
    const rawName = parsed.pathname.split("/").pop() || "";
    return rawName.replace(/\.(pdf|md)$/i, "");
  } catch {
    return "";
  }
};

export function GiscusComments({
  pageType,
  title,
  sourceUrl,
  className,
}: GiscusCommentsProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDiscussionMissing, setIsDiscussionMissing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const repo = import.meta.env.VITE_GISCUS_REPO || "";
  const repoId = import.meta.env.VITE_GISCUS_REPO_ID || "";
  const category = import.meta.env.VITE_GISCUS_CATEGORY || "";
  const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID || "";

  const giscusTheme = theme === "dark" ? "dark_dimmed" : "light";
  const pageLabel = pageType === "pdf" ? "pdf-viewer" : "note-viewer";

  const { term, labels } = useMemo(() => {
    // ... logic ...
    const fallbackTitle = deriveTitleFromUrl(sourceUrl);
    const safeTitle = (title || fallbackTitle || "未命名").trim();
    const slug = slugify(safeTitle).slice(0, 45);
    const sourceHash = sourceUrl ? hashString(sourceUrl).slice(0, 8) : "";
    const termValue = sourceHash
      ? `${pageLabel} | ${safeTitle} #${sourceHash}`
      : `${pageLabel} | ${safeTitle}`;
    const labelsValue = [pageLabel, slug].filter(Boolean).join(",");
    return { term: termValue, labels: labelsValue };
  }, [pageLabel, sourceUrl, title]);

  // ... portalUrl and discussionsUrl ...
  const portalUrl = useMemo(() => {
    if (!repo || !repoId || !category || !categoryId) return "";
    const url = new URL("https://giscus.app");
    url.searchParams.set("repo", repo);
    url.searchParams.set("repoId", repoId);
    url.searchParams.set("category", category);
    url.searchParams.set("categoryId", categoryId);
    url.searchParams.set("mapping", "specific");
    url.searchParams.set("term", term);
    url.searchParams.set("reactionsEnabled", "1");
    url.searchParams.set("emitMetadata", "0");
    url.searchParams.set("inputPosition", "bottom");
    url.searchParams.set("strict", "0");
    url.searchParams.set("theme", giscusTheme);
    url.searchParams.set("lang", "zh-CN");
    url.searchParams.set("labels", labels);
    return url.toString();
  }, [repo, repoId, category, categoryId, term, giscusTheme, labels]);

  const discussionsUrl = useMemo(() => {
    if (!repo) return "";
    const query = `"${term}" in:title`;
    return `https://github.com/${repo}/discussions?discussions_q=${encodeURIComponent(query)}`;
  }, [repo, term]);

  useEffect(() => {
    const resetState = () => {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage("");
      setIsDiscussionMissing(false);
    };
    queueMicrotask(resetState);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://giscus.app") return;
      if (!(typeof event.data === "object" && event.data.giscus)) return;

      if (event.data.giscus.error) {
        const message = getGiscusErrorMessage(event.data.giscus.error);
        console.error("Giscus reported error:", {
          message,
          giscus: event.data.giscus,
        });
        if (isDiscussionNotFoundError(message)) {
          setIsDiscussionMissing(true);
          setIsLoading(false);
          return;
        }

        setHasError(true);
        setErrorMessage(message || "Unknown error from Giscus");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };

    window.addEventListener("message", handleMessage);
    
    // Safety timeout: 45s
    const timeout = setTimeout(() => {
      setIsLoading((prev) => {
        if (prev) {
          setHasError(true);
          setErrorMessage("加载超时，请检查网络连接");
          return false;
        }
        return prev;
      });
    }, 45000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timeout);
    };
  }, [term, retryCount]); // Add retryCount dependency

  const handleRetry = () => {
    setRetryCount(c => c + 1);
  };

  // 确保 Giscus 在 sourceUrl 稳定后再加载
  // 使用 key 属性强制 Giscus 在 term 变化时完全重新挂载
  const giscusKey = useMemo(() => `${term}-${retryCount}`, [term, retryCount]);

  return (
    <section className={cn("w-full mt-10", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-zinc-200/60 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur-md shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display text-primary">评论</h3>
            <div className="flex items-center gap-2">
              {(discussionsUrl || portalUrl) && (
                <Button asChild size="sm" variant="outline">
                  <a href={discussionsUrl || portalUrl} target="_blank" rel="noopener noreferrer">
                    打开 GitHub 讨论
                  </a>
                </Button>
              )}
              <span className="text-xs font-mono text-muted-foreground">Giscus</span>
            </div>
          </div>
          {!isConfigured ? (
            <div className="text-sm text-muted-foreground">
              评论系统未配置，请在部署时补充 Giscus 环境变量。
            </div>
          ) : (
            <div className="relative min-h-[140px]">
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
                  <p className="text-sm">正在加载评论...</p>
                </div>
              )}
              {hasError && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                   <AlertCircle className="w-8 h-8 mb-3 text-red-500" />
                   <p className="text-sm mb-2">评论组件加载失败</p>
                   {errorMessage && <p className="text-xs text-red-400 mb-4">{errorMessage}</p>}
                   <Button variant="outline" size="sm" onClick={handleRetry}>
                     重试
                   </Button>
                 </div>
              )}
              {isDiscussionMissing && (
                <div className="mb-4 rounded-md border border-white/10 bg-black/30 p-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 text-secondary" />
                    <div className="space-y-2">
                      <div>
                        未找到与当前页面匹配的 Discussion。首次发表评论时通常会自动创建；也可以手动创建后刷新页面。
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {discussionsUrl && (
                          <Button asChild size="sm" variant="outline">
                            <a href={discussionsUrl} target="_blank" rel="noopener noreferrer">
                              在 GitHub 中搜索
                            </a>
                          </Button>
                        )}
                        {repo && (
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={`https://github.com/${repo}/discussions/new`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              手动创建 Discussion
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={containerRef} className={cn("transition-opacity", (isLoading || hasError) && "opacity-0")}>
                <Giscus
                  key={giscusKey} // Force remount on term change or retry
                  id="comments"
                  host="https://giscus.app"
                  repo={repo}
                  repoId={repoId}
                  category={category}
                  categoryId={categoryId}
                  mapping="specific"
                  term={term}
                  reactionsEnabled="1"
                  emitMetadata="1"
                  inputPosition="bottom"
                  strict="0"
                  theme={giscusTheme}
                  lang="zh-CN"
                  loading="eager"
                  labels={labels}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
