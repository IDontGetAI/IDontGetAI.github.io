import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 压缩 GitHub 资源 URL 以缩短 query string 长度
 * 格式: ghs/owner/repo/branch/path
 */
export function compressGitHubUrl(url: string): string {
  if (!url) return "";
  
  // 已经压缩过
  if (url.startsWith("ghs/")) return url;

  try {
    const decoded = decodeURIComponent(url);
    // 匹配 raw.githubusercontent.com 或 github.com/blob/raw
    // 支持 refs/heads/ 这种长格式，也支持直接 branch
    const regex = /^(?:https?:\/\/)?(?:raw\.githubusercontent\.com|github\.com)\/([^/]+)\/([^/]+)\/(?:blob\/|raw\/|refs\/heads\/)?([^/]+)\/(.+)$/;
    
    const match = decoded.match(regex);
    if (match) {
      const [, owner, repo, branch, path] = match;
      return `ghs/${owner}/${repo}/${branch}/${path}`;
    }
  } catch (e) {
    console.warn("Failed to compress URL:", e);
  }
  
  return url;
}

/**
 * 还原压缩的 GitHub URL 为可访问的 Raw URL
 */
export function expandGitHubUrl(url: string): string {
  if (!url) return "";
  
  if (url.startsWith("ghs/")) {
    const parts = url.split("/");
    // ghs/owner/repo/branch/path...
    if (parts.length >= 5) {
      const owner = parts[1];
      const repo = parts[2];
      const branch = parts[3];
      const path = parts.slice(4).join("/");
      return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    }
  }
  
  // 如果不是压缩格式，尝试常规处理（确保是 Raw URL）
  // 这里可以复用之前的 processUrl 逻辑，或者在组件中统一处理
  return url;
}
