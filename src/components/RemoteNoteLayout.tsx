import { PageLayout } from "@/components/PageLayout";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useFetchMarkdown } from "@/hooks/useFetchMarkdown";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import readingBg from "@/assets/reading.jpeg";

interface RemoteNoteLayoutProps {
  title: string;
  subtitle: string;
  rawUrl: string;
  backLink: string;
  backLabel?: string;
  backgroundImage?: string;
  baseUrl?: string;
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

  // Auto-derive baseUrl from rawUrl if not provided
  const derivedBaseUrl = baseUrl || rawUrl.substring(0, rawUrl.lastIndexOf('/') + 1);

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
    >
      <div className="max-w-4xl mx-auto">
        <Link href={backLink}>
          <Button variant="ghost" className="mb-6 pl-0 text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
          </Button>
        </Link>
        
        {/* Updated Container Style: Match v6.0 Glassmorphism (bg-black/60) instead of v6.1 (bg-black/80) */}
        <div className="bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-xl border border-white/10 shadow-2xl min-h-[500px]">
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
    </PageLayout>
  );
}
