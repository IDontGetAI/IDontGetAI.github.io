import { useState, useEffect } from "react";
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";
import { compressGitHubUrl, expandGitHubUrl } from "@/lib/utils";

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
    // Listen to hash changes to update content even if the path part is unchanged
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const onHashChange = () => setHash(window.location.hash);
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const actualQuery = hash.split("?")[1] || window.location.search.slice(1);
    const { src, title, subtitle, back, backLabel } = parseQuery(actualQuery);

    // 自动压缩 URL 逻辑：如果发现是长链接，自动替换为短链接，解决 Giscus 登录 404 问题
    useEffect(() => {
        if (!src) return;
        
        // 尝试压缩
        const compressed = compressGitHubUrl(src);
        
        // 如果压缩后长度变短了，且当前不是压缩格式
        if (compressed !== src && compressed.length < src.length) {
            console.log("Compressing URL for Giscus compatibility:", { from: src.length, to: compressed.length });
            
            // 构造新的 URL
            if (window.location.hash) {
                const [path, query] = window.location.hash.split("?");
                const params = new URLSearchParams(query);
                params.set("src", compressed);
                const newHash = `${path}?${params.toString()}`;
                
                window.history.replaceState(null, "", newHash);
                // 仅更新 URL，不触发重渲染循环，因为 parseQuery 依赖于 hash prop，
                // 而我们这里是静默更新 URL 以服务于 Giscus
                // setHash(newHash); 
            } else {
                 const params = new URLSearchParams(window.location.search);
                 params.set("src", compressed);
                 const newUrl = `${window.location.pathname}?${params.toString()}`;
                 window.history.replaceState(null, "", newUrl);
            }
        }
    }, [src]);

    if (!src) {
        return (
            <div className="flex items-center justify-center h-screen text-muted-foreground">
                Missing "src" parameter.
            </div>
        );
    }

    // Process the URL to handle GitHub blob links
    const procesedUrl = processUrl(src);

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
