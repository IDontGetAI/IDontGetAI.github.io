import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft, Download, Loader2, AlertCircle, Maximize2
} from "lucide-react";

// 引入布局组件以统一风格
import { PageLayout } from "@/components/PageLayout";
import { GiscusComments } from "@/components/GiscusComments";
import readingBg from "@/assets/reading.jpeg";


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
    const decodeRecursive = (u: string): string => {
        try {
            const d = decodeURIComponent(u);
            return d === u ? u : decodeRecursive(d);
        } catch { return u; }
    };
    const decoded = decodeRecursive(url);
    let rawUrl = decoded.trim();
    // GitHub Blob -> Raw
    const githubRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/;
    const match = rawUrl.match(githubRegex);
    if (match) {
        const [, owner, repo, branch, path] = match;
        // 使用 encodeURI 编码，确保 fetch 请求正确
        rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    }
    return encodeURI(rawUrl);
}

// -----------------------------------------------------------------------------
// 主组件 (原生 iframe 内核 + PageLayout 外壳)
// -----------------------------------------------------------------------------
export default function PdfViewer() {
    const [location] = useLocation();

    // Listen to hash changes re-actively
    const [hash, setHash] = useState(window.location.hash);
    useEffect(() => {
        const onHashChange = () => setHash(window.location.hash);
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const actualQuery = hash.split("?")[1] || window.location.search.slice(1);

    const { src, title, back, backLabel } = parseQuery(actualQuery);
    const [blobUrl, setBlobUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 简单的移动端检测
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
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

        let active = true;
        setLoading(true);
        setError(null);

        // 混合策略：优先尝试 Fetch+Blob (解决下载问题)，失败则回退到直接链接 (解决跨域问题)
        fetch(rawUrl)
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const blob = await res.blob();
                const pdfBlob = new Blob([blob], { type: "application/pdf" });
                return URL.createObjectURL(pdfBlob);
            })
            .then((url) => {
                if (active) {
                    setBlobUrl(url);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (active) {
                    console.warn("Fetch failed (likely CORS), falling back to direct URL:", err);
                    // 失败回退：直接使用原始 URL，让 iframe 尝试加载
                    setBlobUrl(rawUrl);
                    setLoading(false);
                    // 这里不设置 error，因为直接链接可能能正常工作
                }
            });

        return () => {
            active = false;
            if (blobUrl && blobUrl.startsWith("blob:")) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [src]);

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

        // If we already have a blobUrl from fetch, use it directly for download
        if (blobUrl && blobUrl.startsWith("blob:")) {
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Otherwise, fetch the file and download it
            fetch(rawUrl)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.blob();
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
                    // Fallback: open in new window
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
                            <p className="text-sm opacity-80">{error}</p>
                            <Button onClick={() => window.location.reload()} variant="outline" className="mt-6 border-red-500/50 text-red-500 hover:bg-red-500/10">重试</Button>
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
