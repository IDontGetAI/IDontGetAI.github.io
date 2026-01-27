import { useEffect } from "react";
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";
import { compressGitHubUrl, expandGitHubUrl } from "@/lib/utils";
import { useLocationSnapshot } from "@/hooks/useLocationSnapshot";
import { devLog, getQueryStringFromSnapshot } from "@/lib/location";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import readingBg from "@/assets/reading.jpeg";

function parseQuery(queryString: string) {
    const params = new URLSearchParams(queryString);
    const src = params.get("src") || "";
    const title = params.get("title") || "Untitled Note";
    const subtitle = params.get("subtitle") || "";
    const back = params.get("back") || "/";
    const backLabel = params.get("backLabel") || "Back";
    return { src, title, subtitle, back, backLabel };
}

// Helper to auto-convert GitHub Blob URLs to Raw URLs
function processUrl(url: string): string {
    if (!url) return "";

    // 尝试展开 ghs 格式
    let expanded = expandGitHubUrl(url);

    // Recursive decode to handle double-encoded URLs
    const decodeRecursive = (u: string): string => {
        try {
            const d = decodeURIComponent(u);
            return d === u ? u : decodeRecursive(d);
        } catch { return u; }
    };

    if (!expanded.startsWith("https://") && !expanded.startsWith("http://")) {
        expanded = decodeRecursive(url);
    }

    let rawUrl = expanded.trim();

    // GitHub Blob -> Raw
    // Matches: https://github.com/Start/Repo/blob/main/Path/To/File.md
    const githubRegex = /^(?:https?:\/\/)?(?:github\.com)\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/;
    const match = rawUrl.match(githubRegex);
    if (match) {
        const [, owner, repo, branch, path] = match;
        // Construct the raw URL
        rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    }

    // Ensure it's properly encoded for fetch
    return encodeURI(rawUrl);
}


export default function MarkdownViewer() {
    const snapshot = useLocationSnapshot();
    const actualQuery = getQueryStringFromSnapshot(snapshot);
    const { src, title, subtitle, back, backLabel } = parseQuery(actualQuery);

    // 自动压缩 URL 逻辑：如果发现是长链接，自动替换为短链接，解决 Giscus 登录 404 问题
    useEffect(() => {
        if (!src) return;
        
        // 尝试压缩
        const compressed = compressGitHubUrl(src);
        
        // 如果压缩后长度变短了，且当前不是压缩格式
        if (compressed !== src && compressed.length < src.length) {
            devLog("viewer.compress", { page: "note", from: src.length, to: compressed.length });

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

    if (!src) {
        return (
            <PageLayout
                title={title || "笔记预览"}
                subtitle="Remote Markdown Viewer"
                backgroundImage={readingBg}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex gap-2 mb-6">
                        <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
                            <Link href={back || "/"}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel || "返回"}
                            </Link>
                        </Button>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-8 text-muted-foreground">
                        缺少 src 参数，无法加载笔记内容。
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Process the URL to handle GitHub blob links
    const procesedUrl = processUrl(src);
    devLog("viewer.query", { page: "note", hash: snapshot.hash, search: snapshot.search, srcLength: src.length, processedUrlLength: procesedUrl.length });

    return (
        <RemoteNoteLayout
            title={title}
            subtitle={subtitle}
            rawUrl={procesedUrl}
            backLink={back}
            backLabel={backLabel}
        />
    );
}
