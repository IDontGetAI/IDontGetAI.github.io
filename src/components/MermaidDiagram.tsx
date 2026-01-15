import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    code: string;
    theme: 'light' | 'dark';
}

/**
 * Mermaid 图表渲染组件
 * 支持懒加载、主题切换、缩放和全屏功能
 */
const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code, theme }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [status, setStatus] = useState<'pending' | 'loading' | 'rendered' | 'error'>('pending');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // 懒加载：使用 IntersectionObserver 检测元素进入视口
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && status === 'pending') {
                    setStatus('loading');
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [status]);

    // 渲染 Mermaid 图表
    useEffect(() => {
        if (status !== 'loading' && status !== 'rendered') return;

        const renderDiagram = async () => {
            try {
                // 基于现代扁平化设计的主题配置
                const themeVariables = theme === 'dark' ? {
                    // 深色主题
                    primaryColor: '#6366f1',          // 主色调 (靛蓝)
                    primaryTextColor: '#ffffff',
                    primaryBorderColor: '#818cf8',
                    secondaryColor: '#ec4899',        // 次要色 (粉色)
                    tertiaryColor: '#8b5cf6',         // 强调色
                    background: '#1f2937',
                    mainBkg: '#374151',
                    nodeBorder: '#d1d5db',
                    clusterBkg: '#4b5563',
                    clusterBorder: '#6b7280',
                    lineColor: '#9ca3af',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textColor: '#f3f4f6',
                    nodeTextColor: '#ffffff',
                    edgeLabelBackground: '#374151',
                } : {
                    // 浅色主题 - 现代扁平化风格
                    primaryColor: '#6366f1',          // 主色调 (靛蓝)
                    primaryTextColor: '#ffffff',
                    primaryBorderColor: '#4f46e5',
                    secondaryColor: '#ec4899',        // 次要色 (粉色)
                    tertiaryColor: '#8b5cf6',         // 强调色
                    background: '#ffffff',
                    mainBkg: '#f3f4f6',               // 节点背景 (浅灰)
                    nodeBorder: '#d1d5db',            // 节点边框
                    clusterBkg: '#f9fafb',            // 子图背景
                    clusterBorder: '#e5e7eb',         // 子图边框
                    lineColor: '#9ca3af',             // 连线颜色
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textColor: '#1f2937',             // 文字颜色
                    nodeTextColor: '#1f2937',
                    edgeLabelBackground: '#ffffff',
                    // 特殊节点配色
                    actorBkg: '#e0e7ff',              // 参与者背景 (浅靛蓝)
                    actorBorder: '#6366f1',
                    noteBkgColor: '#fffbeb',          // 备注背景 (浅黄)
                    noteBorderColor: '#fbbf24',       // 备注边框 (黄色)
                };

                // 配置 Mermaid - 使用 base 主题以获得最佳自定义效果
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base' as 'base' | 'dark' | 'default' | 'forest' | 'neutral',
                    themeVariables: themeVariables,
                    securityLevel: 'loose',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    flowchart: {
                        curve: 'basis',              // 平滑曲线
                        padding: 20,
                        nodeSpacing: 50,
                        rankSpacing: 50,
                    },
                });

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, code);
                setSvg(svg);
                setStatus('rendered');
                setErrorMsg('');
            } catch (err) {
                console.error('Mermaid render error:', err);
                setStatus('error');
                if (err instanceof Error) {
                    setErrorMsg(err.message);
                } else {
                    setErrorMsg('未知错误');
                }
            }
        };

        // 使用 setTimeout 确保 DOM 更新后再渲染
        const timer = setTimeout(() => {
            renderDiagram();
        }, 0);

        return () => clearTimeout(timer);
    }, [status, code, theme]);

    // 处理 ESC 键退出全屏
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
                setZoom(1);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isFullscreen]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        setZoom(1);
    };

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));

    // 错误状态展示
    if (status === 'error') {
        return (
            <div className="p-4 border border-red-200 bg-red-50 rounded text-red-600 text-sm font-mono overflow-auto">
                <p className="font-bold mb-2">Mermaid 语法错误:</p>
                <pre>{errorMsg}</pre>
                <pre className="mt-4 text-xs text-gray-500">{code}</pre>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`mermaid-wrapper relative group transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[100] bg-white dark:bg-zinc-900 p-8 flex flex-col' : 'my-6'}`}
        >
            {/* 工具栏 */}
            {(status === 'rendered' || isFullscreen) && (
                <div className={`absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-zinc-800/90 backdrop-blur border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm p-1 z-10 transition-opacity ${isFullscreen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button onClick={handleZoomOut} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400" title="缩小">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                    </button>
                    <span className="text-xs text-zinc-400 w-8 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={handleZoomIn} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400" title="放大">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                    </button>
                    <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1"></div>
                    <button onClick={toggleFullscreen} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400" title={isFullscreen ? "退出全屏" : "全屏"}>
                        {isFullscreen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                        )}
                    </button>
                </div>
            )}

            {/* 内容区域 */}
            <div className={`mermaid-content flex justify-center items-center overflow-auto ${isFullscreen ? 'flex-1 w-full h-full p-4' : 'w-full'}`} style={{ minHeight: '100px' }}>
                {status === 'pending' || status === 'loading' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-zinc-400 animate-pulse">
                        <svg className="animate-spin mb-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs font-medium">正在渲染图表...</span>
                    </div>
                ) : (
                    <div
                        className="transition-transform duration-200 origin-center"
                        style={{ transform: `scale(${zoom})` }}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                )}
            </div>
        </div>
    );
};

export default MermaidDiagram;
