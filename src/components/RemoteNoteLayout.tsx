import { PageLayout } from "@/components/PageLayout";
import { GiscusComments } from "@/components/GiscusComments";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useFetchMarkdown } from "@/hooks/useFetchMarkdown";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Download, Loader2, AlertCircle, List } from "lucide-react";
import readingBg from "@/assets/reading.jpeg";
import { slugify } from "@/lib/slugify";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface RemoteNoteLayoutProps {
  title: string;
  subtitle: string;
  rawUrl: string;
  backLink: string;
  backLabel?: string;
  backgroundImage?: string;
  baseUrl?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function RemoteNoteLayout({
  title,
  subtitle,
  rawUrl,
  backLink,
  backLabel = "返回上一页",
  backgroundImage = readingBg,
  baseUrl,
}: RemoteNoteLayoutProps) {
  const { content, loading, error } = useFetchMarkdown(rawUrl);
  const [activeId, setActiveId] = useState<string>("");

  // Auto-derive baseUrl from rawUrl if not provided
  const derivedBaseUrl = baseUrl || rawUrl.substring(0, rawUrl.lastIndexOf('/') + 1);

  const toc = useMemo<TocItem[]>(() => {
    if (!content) return [];

    const lines = content.split("\n");
    const items: TocItem[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (!match) continue;

      const level = match[1].length;
      const text = match[2].trim();
      const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "");
      const id = slugify(cleanText);
      items.push({ id, text: cleanText, level });
    }

    return items;
  }, [content]);

  // Scroll spy to highlight active TOC item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update active state manually for immediate feedback
      setActiveId(id);
    }
  };

  const downloadMarkdown = () => {
    if (!content) {
      console.error("No content to download");
      return;
    }

    // Process content to ensure image links are absolute GitHub URLs
    let processedContent = content;

    // Convert relative image paths to absolute GitHub URLs
    if (derivedBaseUrl) {
      const cleanBase = derivedBaseUrl.endsWith('/') ? derivedBaseUrl : derivedBaseUrl + '/';

      // Handle markdown image syntax: ![alt](path)
      processedContent = processedContent.replace(
        /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)]+)\)/g,
        (match, alt, path) => {
          const cleanPath = path.replace(/^\.?\//, '');
          return `![${alt}](${cleanBase}${cleanPath})`;
        }
      );

      // Handle HTML img tags: <img src="path">
      processedContent = processedContent.replace(
        /<img([^>]*?)src=["'](?!https?:\/\/|\/)([^"']+)["']/g,
        (match, attrs, path) => {
          const cleanPath = path.replace(/^\.?\//, '');
          return `<img${attrs}src="${cleanBase}${cleanPath}"`;
        }
      );
    }

    // Create a Blob with the processed markdown content
    const blob = new Blob([processedContent], { type: 'text/markdown;charset=utf-8' });

    // Use title as filename, fallback to extracting from rawUrl
    let fileName = title ? `${title}.md` : 'note.md';
    if (!title) {
      const urlFileName = rawUrl.substring(rawUrl.lastIndexOf('/') + 1);
      if (urlFileName) {
        fileName = urlFileName.endsWith('.md') ? urlFileName : `${urlFileName}.md`;
      }
    }

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    URL.revokeObjectURL(link.href);
  };

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 mb-6">
          <Link href={backLink}>
            <Button variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
            </Button>
          </Link>
          <Button variant="outline" className="text-muted-foreground" onClick={downloadMarkdown}>
            <Download className="mr-2 h-4 w-4" /> 下载源文件
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-xl border border-zinc-200/50 shadow-2xl min-h-[500px]">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                  <p>正在从 GitHub 拉取笔记...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-red-400">
                  <AlertCircle className="w-10 h-10 mb-4" />
                  <p>加载失败: {error}</p>
                  <p className="text-sm mt-2 text-muted-foreground">请检查网络连接或 GitHub 链接权限。</p>
                </div>
              )}

              {!loading && !error && (
                <MarkdownRenderer content={content} baseUrl={derivedBaseUrl} />
              )}
            </div>
          </div>

          {/* Table of Contents Sidebar */}
          {!loading && !error && toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-24">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center gap-2 mb-4 text-primary font-mono text-sm uppercase tracking-wider pb-2 border-b border-white/10">
                  <List className="w-4 h-4" /> 目录 (TOC)
                </div>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeader(item.id)}
                      className={cn(
                        "block w-full text-left text-sm py-1.5 px-2 rounded transition-colors duration-200 line-clamp-1",
                        item.level === 1 ? "font-bold mt-2" : "font-normal",
                        item.level === 2 ? "pl-4" : "",
                        item.level === 3 ? "pl-8 text-xs" : "",
                        activeId === item.id
                          ? "text-primary bg-primary/10 border-l-2 border-primary"
                          : "text-muted-foreground hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                      )}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
        <GiscusComments pageType="note" title={title} sourceUrl={rawUrl} />

      </div>
    </PageLayout>
  );
}
