import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { RemoteNoteLayout } from "@/components/RemoteNoteLayout";

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

    // Recursive decode to handle double-encoded URLs
    const decodeRecursive = (u: string): string => {
        try {
            const d = decodeURIComponent(u);
            return d === u ? u : decodeRecursive(d);
        } catch { return u; }
    };

    const decoded = decodeRecursive(url);
    let rawUrl = decoded.trim();

    // GitHub Blob -> Raw
    // Matches: https://github.com/Start/Repo/blob/main/Path/To/File.md
    const githubRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/;
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
