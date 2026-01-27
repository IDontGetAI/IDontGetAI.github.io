import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft, Download, Loader2, AlertCircle, Maximize2
} from "lucide-react";

// 引入布局组件以统一风格
import { PageLayout } from "@/components/PageLayout";
import { GiscusComments } from "@/components/GiscusComments";
import readingBg from "@/assets/reading.jpeg";


import { compressGitHubUrl, expandGitHubUrl } from "@/lib/utils";
import { useLocationSnapshot } from "@/hooks/useLocationSnapshot";
import { devLog, getQueryStringFromSnapshot } from "@/lib/location";
import { fetchWithCache } from "@/lib/httpCache";
import { clearViewerActive, markViewerActive } from "@/lib/giscusReturnTo";

// -----------------------------------------------------------------------------
// 工具函数
// -----------------------------------------------------------------------------
function parseQuery(queryString: string) {
    const params = new URLSearchParams(queryString);
    const src = params.get("src") || "";
    const title = params.get("title") || "PDF 预览";
    const back = params.get("back") || "/";
    const backLabel = params.get("backLabel") || "返回";
    return { src, title, back, backLabel };
}

function processUrl(url: string): string {
    if (!url) return "";

    // 尝试展开压缩的 ghs 链接
    let expanded = expandGitHubUrl(url);

    // 如果没有压缩过，执行标准的递归解码
    const decodeRecursive = (u: string): string => {
        try {
            const d = decodeURIComponent(u);
            return d === u ? u : decodeRecursive(d);
        } catch { return u; }
    };

    // 如果已经是 ghs 开头，expandGitHubUrl 已经处理过，这里主要处理传统的长链接
    // 注意：expandGitHubUrl 内部已经返回了 https 链接

    // 为了兼容旧逻辑，我们再次进行标准处理（如果是长链接的话）
    if (!expanded.startsWith("https://") && !expanded.startsWith("http://")) {
        // ghs 没匹配上？或者其他协议
        expanded = decodeRecursive(url);
    }

    let rawUrl = expanded.trim();

    // GitHub Blob -> Raw (如果 expandGitHubUrl 没处理完，或者本来就是长链接)
    const githubRegex = /^(?:https?:\/\/)?(?:github\.com)\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/;
    const match = rawUrl.match(githubRegex);
    if (match) {
        const [, owner, repo, branch, path] = match;
        rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    }

    return encodeURI(rawUrl);
}

// -----------------------------------------------------------------------------
// 主组件 (原生 iframe 内核 + PageLayout 外壳)
// -----------------------------------------------------------------------------
export default function PdfViewer() {
    const snapshot = useLocationSnapshot();
    const actualQuery = getQueryStringFromSnapshot(snapshot);

    const { src, title, back, backLabel } = parseQuery(actualQuery);
    const bypassCacheNextRef = useRef(false);
    const [retryNonce, setRetryNonce] = useState(0);

    // 自动压缩 URL 逻辑：如果发现是长链接，自动替换为短链接，解决 Giscus 登录 404 问题
    useEffect(() => {
        if (!src) return;

        // 尝试压缩
        const compressed = compressGitHubUrl(src);

        // 如果压缩后长度变短了，且当前不是压缩格式
        if (compressed !== src && compressed.length < src.length) {
            devLog("viewer.compress", { page: "pdf", from: src.length, to: compressed.length });

            if (snapshot.hash) {
                const [hashPath, query = ""] = snapshot.hash.split("?");
                const params = new URLSearchParams(query);
                params.set("src", compressed);
                const newHash = `${hashPath}?${params.toString()}`;
                window.history.replaceState(null, "", newHash);
                return;
            }

            const params = new URLSearchParams(snapshot.search.startsWith("?") ? snapshot.search.slice(1) : snapshot.search);
            params.set("src", compressed);
            const newUrl = `${snapshot.pathname}?${params.toString()}`;
            window.history.replaceState(null, "", newUrl);
        }
    }, [src]);

    useEffect(() => {
        if (!src) return;
        markViewerActive("pdf");
    }, [src]);

    const [blobUrl, setBlobUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isDirectFallback, setIsDirectFallback] = useState(false);

    useEffect(() => {
        // 简单的移动端检测
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || "";
            if (/android|ipad|iphone|ipod/i.test(userAgent)) {
                setIsMobile(true);
            } else {
                setIsMobile(window.innerWidth <= 768); // 宽屏兜底
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const rawUrl = processUrl(src);
        if (!rawUrl) return;

        let objectUrl = "";
        const controller = new AbortController();
        const bypassCache = bypassCacheNextRef.current;
        bypassCacheNextRef.current = false;

        queueMicrotask(() => {
            setLoading(true);
            setError(null);
            setIsDirectFallback(false);
        });

        devLog("pdf.load.start", { rawUrl, bypassCache, retryNonce });

        fetchWithCache(rawUrl, { cacheName: "idontgetai-pdf-v1", bypassCache, signal: controller.signal })
            .then(async ({ response, fromCache }) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const blob = await response.blob();
                const pdfBlob = new Blob([blob], { type: "application/pdf" });
                const url = URL.createObjectURL(pdfBlob);
                objectUrl = url;
                setBlobUrl(url);
                setLoading(false);
                setIsDirectFallback(false);
                devLog("pdf.load.success", { rawUrl, fromCache, bytes: blob.size });
            })
            .catch((err) => {
                if (controller.signal.aborted) return;
                const message = err instanceof Error ? err.message : String(err);
                devLog("pdf.load.error", { rawUrl, error: message });
                setIsDirectFallback(true);
                setBlobUrl(rawUrl);
                setLoading(false);
            });

        return () => {
            controller.abort();
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [src, retryNonce]);

    const retryLoad = (options?: { bypassCache?: boolean }) => {
        bypassCacheNextRef.current = Boolean(options?.bypassCache);
        setRetryNonce((v) => v + 1);
    };

    const downloadPdf = () => {
        const rawUrl = processUrl(src);
        if (!rawUrl) {
            console.error("No source URL to download");
            return;
        }

        // Use title as filename, fallback to extracting from URL
        let fileName = title ? `${title}.pdf` : 'document.pdf';
        if (!title) {
            const urlFileName = src.substring(src.lastIndexOf('/') + 1);
            if (urlFileName) {
                fileName = urlFileName.endsWith('.pdf') ? urlFileName : `${urlFileName}.pdf`;
            }
        }

        if (blobUrl && blobUrl.startsWith("blob:")) {
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            fetchWithCache(rawUrl, { cacheName: "idontgetai-pdf-v1" })
                .then(async ({ response }) => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.blob();
                })
                .then(blob => {
                    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                    const url = URL.createObjectURL(pdfBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                })
                .catch(err => {
                    console.error("Download failed:", err);
                    setError(err instanceof Error ? err.message : String(err));
                    window.open(rawUrl, '_blank');
                });
        }
    };

    return (
        <PageLayout
            title={title}
            subtitle="PDF 原生阅读模式"
            backgroundImage={readingBg}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col">

                {/* 顶部导航 */}
                <div className="flex items-center justify-between mb-6 shrink-0">
                    <div className="flex gap-2">
                        <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-white">
                            <Link href={back}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
                            </Link>
                        </Button>

                        {blobUrl && (
                            <Button variant="outline" className="text-muted-foreground" onClick={downloadPdf}>
                                <Download className="mr-2 h-4 w-4" /> 下载源文件
                            </Button>
                        )}
                    </div>

                    {/* 全屏打开按钮 (备用) */}
                    {blobUrl && (
                        <Button asChild variant="ghost" className="text-muted-foreground hover:text-white">
                            <a href={blobUrl} target="_blank" rel="noopener noreferrer">
                                <Maximize2 className="mr-2 h-4 w-4" /> 全屏打开
                            </a>
                        </Button>
                    )}
                </div>

                {/* 玻璃卡片容器 */}
                <div className="h-[600px] bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden relative shrink-0">

                    {!src && <div className="flex items-center justify-center h-full text-muted-foreground">缺少 PDF 链接参数</div>}

                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-muted-foreground">
                            <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                            <p>正在拉取 PDF 数据...</p>
                        </div>
                    )}

                    {error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-red-400">
                            <AlertCircle className="w-10 h-10 mb-4" />
                            <p className="font-medium mb-2">加载失败</p>
                            <p className="text-sm opacity-80 break-all">{error}</p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-2">
                                <Button onClick={() => retryLoad()} variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10">
                                    重试
                                </Button>
                                <Button onClick={() => retryLoad({ bypassCache: true })} variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10">
                                    强制重新拉取
                                </Button>
                            </div>
                        </div>
                    )}

                    {!loading && !error && isDirectFallback && blobUrl && !isMobile && (
                        <div className="absolute top-0 inset-x-0 z-10 px-4 py-2 text-xs font-mono text-muted-foreground bg-black/60 border-b border-white/10">
                            已切换为直连模式（可能因跨域限制无法 Blob 解析）；如预览异常请点击“强制重新拉取”。
                        </div>
                    )}

                    {/* 移动端兼容处理：也不支持 iframe 嵌入，显示打开按钮 */}
                    {!loading && !error && blobUrl && (
                        isMobile ? (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
                                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                                <h3 className="text-lg font-medium text-white mb-2">移动端暂不支持嵌入预览</h3>
                                <p className="mb-6 text-sm max-w-xs mx-auto">为了获得最佳阅读体验，请使用原生阅读器打开。</p>
                                <Button asChild className="w-full sm:w-auto" size="lg">
                                    <a href={blobUrl} target="_blank" rel="noopener noreferrer">
                                        <Maximize2 className="mr-2 h-4 w-4" /> 在新窗口打开 PDF
                                    </a>
                                </Button>
                            </div>
                        ) : (
                            <iframe
                                src={blobUrl}
                                className="w-full h-full border-none block bg-white"
                                title="PDF Preview"
                            />
                        )
                    )}
                </div>

                <GiscusComments pageType="pdf" title={title} sourceUrl={src} />
            </div>
        </PageLayout>
    );
}
