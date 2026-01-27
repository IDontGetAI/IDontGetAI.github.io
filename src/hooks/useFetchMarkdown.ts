import { useEffect, useRef } from "react";
import { useCachedText } from "@/hooks/useCachedText";

interface FetchMarkdownResult {
  content: string;
  loading: boolean;
  error: string | null;
  fromCache: boolean;
  retry: (options?: { bypassCache?: boolean }) => void;
}

export function useFetchMarkdown(url: string): FetchMarkdownResult {
  const { text, loading, error, fromCache, retry } = useCachedText(url, { cacheName: "idontgetai-md-v1" });
  const lastUrlRef = useRef<string>("");

  useEffect(() => {
    if (!url) return;
    if (lastUrlRef.current === url) return;
    lastUrlRef.current = url;
  }, [url]);

  return { content: text, loading, error, fromCache, retry };
}
