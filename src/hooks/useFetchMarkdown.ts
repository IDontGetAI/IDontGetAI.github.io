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

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [url]);

  return { content, loading, error };
}
