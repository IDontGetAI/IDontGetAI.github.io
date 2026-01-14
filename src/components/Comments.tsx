/**
 * Giscus 评论系统组件
 * 基于 GitHub Discussions 的评论功能
 * NOTE: 需要在 GitHub 仓库中启用 Discussions 并安装 Giscus App
 */

import Giscus from "@giscus/react";
import { useTheme } from "@/contexts/ThemeContext";

interface CommentsProps {
    /** 自定义分类映射标识符，默认使用当前页面路径 */
    term?: string;
    /** 映射方式: pathname | url | title | og:title | specific | number */
    mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
    /** 是否显示评论区 */
    enabled?: boolean;
}

/**
 * 评论区组件
 * 使用 Giscus 集成 GitHub Discussions
 * 
 * 配置说明：
 * - repo: GitHub 仓库名称（用户名/仓库名）
 * - repoId: 仓库 ID（从 Giscus 网站获取）
 * - category: Discussions 分类名称
 * - categoryId: 分类 ID（从 Giscus 网站获取）
 * 
 * 获取配置：访问 https://giscus.app/ 并按提示配置
 */
export function Comments({ term, mapping = "pathname", enabled = true }: CommentsProps) {
    const { theme } = useTheme();

    // 如果禁用评论则不渲染
    if (!enabled) return null;

    return (
        <section className="mt-16 pt-8">
            <div className="mb-6">
                <h2 className="text-xl font-display text-primary flex items-center gap-2">
                    <span className="text-secondary animate-pulse">&gt;</span>
                    评论区
                    <span className="text-xs text-muted-foreground font-mono ml-auto opacity-50">
                        [SYSTEM: GISCUS_V2.0]
                    </span>
                </h2>
                <p className="text-xs text-muted-foreground font-mono mt-1 opacity-70">
                    $ cat /etc/comments.conf → 使用 GitHub 账号登录后可发表评论
                </p>
            </div>

            <div className="relative group">
                {/* 终端窗口效果 */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                
                <div className="relative bg-black/90 border border-primary/40 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5),0_0_10px_rgba(0,255,136,0.1)]">
                    {/* 终端标题栏 */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/95 border-b border-primary/20">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-xs font-mono text-muted-foreground opacity-60">
                                root@idontgetai:~/comments
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-mono text-primary opacity-70">LIVE</span>
                        </div>
                    </div>

                    {/* 扫描线效果 */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-[scan_3s_linear_infinite]" />
                    </div>

                    {/* CRT 效果 */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-30" />

                    {/* Giscus 组件 */}
                    <div className="relative giscus-wrapper">
                        <Giscus
                            id="comments"
                            repo="IDontGetAI/IDontGetAI.github.io"
                            repoId="R_kgDOQ0avSQ"
                            category="Announcements"
                            categoryId="DIC_kwDOQ0avSc4C05f9"
                            mapping={mapping}
                            term={term}
                            reactionsEnabled="1"
                            emitMetadata="0"
                            inputPosition="top"
                            theme={theme === "dark" ? "dark_dimmed" : "light"}
                            lang="zh-CN"
                            loading="lazy"
                        />
                    </div>

                    {/* 底部装饰 */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
                </div>
            </div>
        </section>
    );
}
