import { useState, useEffect } from 'react';

interface FetchMarkdownResult {
  content: string;
  loading: boolean;
  error: string | null;
}

export function useFetchMarkdown(url: string): FetchMarkdownResult {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 2;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      const attemptFetch = async (): Promise<void> => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch markdown: ${response.statusText} (${response.status})`);
          }
          const text = await response.text();
          if (isMounted) {
            setContent(text);
            setLoading(false);
          }
        } catch (err) {
          if (retryCount < maxRetries && isMounted) {
            retryCount++;
            console.warn(`Fetch failed, retrying (${retryCount}/${maxRetries})...`, err);
            // 指数退避重试
            setTimeout(attemptFetch, 1000 * retryCount);
          } else if (isMounted) {
             setError(err instanceof Error ? err.message : "Unknown error");
             setLoading(false);
          }
        }
      };

      await attemptFetch();
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { content, loading, error };
}
