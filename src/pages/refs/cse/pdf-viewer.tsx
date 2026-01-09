import { PageLayout } from "@/components/PageLayout";
import readingBg from "@/assets/reading.jpeg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

function parseQuery(queryString: string) {
  const params = new URLSearchParams(queryString);
  const src = params.get("src") || "";
  const title = params.get("title") || "PDF";
  const back = params.get("back") || "/cse";
  const backLabel = params.get("backLabel") || "返回";
  return { src, title, back, backLabel };
}

function toRawGitHubUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("https://raw.githubusercontent.com/")) return trimmed;

  const rawMatch = trimmed.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)$/);
  if (rawMatch) {
    const [, owner, repo, branch, path] = rawMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  }

  const blobMatch = trimmed.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/);
  if (blobMatch) {
    const [, owner, repo, branch, path] = blobMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  }

  return trimmed;
}

function PdfCanvasViewer({ pdfUrl }: { pdfUrl: string }) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [scale, setScale] = useState(1.2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const task = getDocument({ url: pdfUrl });
    task.promise
      .then((loaded) => {
        if (cancelled) return;
        setDoc(loaded);
        setNumPages(loaded.numPages);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
      task.destroy();
    };
  }, [pdfUrl]);

  const canPrev = pageNumber > 1;
  const canNext = numPages > 0 && pageNumber < numPages;

  useEffect(() => {
    let cancelled = false;
    if (!doc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    doc.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const viewport = page.getViewport({ scale });
      const outputScale = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(outputScale, 0, 0, outputScale, 0, 0);

      page.render({
        canvasContext: ctx,
        viewport,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [doc, pageNumber, scale]);

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-2 md:flex-1">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20 text-primary hover:bg-primary/10 font-mono"
            disabled={loading || !!loadError || !canPrev}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20 text-primary hover:bg-primary/10 font-mono"
            disabled={loading || !!loadError || !canNext}
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          >
            下一页
          </Button>
          <span className="text-xs font-mono text-muted-foreground ml-2">
            {loading ? "加载中..." : loadError ? "加载失败" : `第 ${pageNumber} / ${numPages} 页`}
          </span>
        </div>

        <div className="flex items-center justify-start md:justify-center gap-2 md:flex-1">
          <input
            ref={pageInputRef}
            type="number"
            min={1}
            max={numPages || undefined}
            placeholder="页码"
            className="h-8 w-20 rounded-md border border-white/10 bg-black/30 px-2 text-xs font-mono text-white outline-none focus-visible:border-primary/40 focus-visible:ring-primary/30 focus-visible:ring-[3px]"
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              const raw = pageInputRef.current?.value ?? "";
              const parsed = Number.parseInt(raw, 10);
              if (!Number.isFinite(parsed)) return;
              const clamped = Math.min(Math.max(parsed, 1), Math.max(numPages, 1));
              setPageNumber(clamped);
            }}
            disabled={loading || !!loadError || numPages === 0}
          />
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/5 font-mono"
            disabled={loading || !!loadError || numPages === 0}
            onClick={() => {
              const raw = pageInputRef.current?.value ?? "";
              const parsed = Number.parseInt(raw, 10);
              if (!Number.isFinite(parsed)) return;
              const clamped = Math.min(Math.max(parsed, 1), Math.max(numPages, 1));
              setPageNumber(clamped);
            }}
          >
            跳转
          </Button>
        </div>

        <div className="flex items-center gap-2 md:flex-1 md:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/5 font-mono"
            onClick={() => setScale((s) => Math.max(0.6, Math.round((s - 0.1) * 10) / 10))}
            disabled={loading || !!loadError}
          >
            缩小
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/5 font-mono"
            onClick={() => setScale((s) => Math.min(2.5, Math.round((s + 0.1) * 10) / 10))}
            disabled={loading || !!loadError}
          >
            放大
          </Button>
        </div>
      </div>

      <div className="w-full overflow-auto bg-white">
        {loadError ? (
          <div className="p-6 text-sm text-red-700 font-mono">
            加载失败：{loadError}
          </div>
        ) : (
          <div className="min-h-[60vh] flex justify-center p-4">
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function PdfViewer() {
  useLocation();

  const rawQueryString = (() => {
    const hash = window.location.hash || "";
    const afterHash = hash.startsWith("#") ? hash.slice(1) : hash;
    const hashQueryIndex = afterHash.indexOf("?");
    if (hashQueryIndex >= 0) return afterHash.slice(hashQueryIndex + 1);

    const search = window.location.search || "";
    if (search.startsWith("?")) return search.slice(1);
    return "";
  })();

  const { src, title, back, backLabel } = parseQuery(rawQueryString);
  const pdfUrl = toRawGitHubUrl(src);

  return (
    <PageLayout title={title} subtitle="PDF 预览" backgroundImage={readingBg}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href={back}>
            <Button variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
            </Button>
          </Link>

          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 font-mono">
                新标签打开 <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          )}
        </div>

        {!pdfUrl ? (
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl text-muted-foreground font-mono text-sm">
            缺少 src 参数，请使用 /pdf?src=... 传入 PDF 链接
          </div>
        ) : (
          <PdfCanvasViewer key={pdfUrl} pdfUrl={pdfUrl} />
        )}
      </div>
    </PageLayout>
  );
}
