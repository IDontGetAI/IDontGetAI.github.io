import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  code: string;
  theme: 'light' | 'dark';
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code, theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [status, setStatus] = useState<'pending' | 'loading' | 'rendered' | 'error'>('pending');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Lazy loading with IntersectionObserver
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

  // Render mermaid
  useEffect(() => {
    if (status !== 'loading' && status !== 'rendered') return; 

    const renderDiagram = async () => {
      try {
        // Dynamically get styles from computed properties to support cogito.css variables
        let themeVariables = {};
        let mermaidTheme = 'base';

        if (theme === 'dark') {
            mermaidTheme = 'dark';
            // We can optionally override some dark theme vars here if cogito defines dark mode vars
        } else {
            // Light mode: use cogito.css variables
            const getVar = (name: string, fallback: string) => {
                if (!containerRef.current) return fallback;
                const val = getComputedStyle(containerRef.current).getPropertyValue(name).trim();
                return val || fallback;
            };

            themeVariables = {
                primaryColor: getVar('--primary-color', '#4870ac'),
                primaryTextColor: '#ffffff', // Fixed white for contrast on primary
                secondaryColor: getVar('--marker-color', '#a2b6d4'),
                tertiaryColor: getVar('--block-bg-color', '#f6f8fa'),
                mainBkg: getVar('--bg-color', '#ffffff'),
                nodeBorder: getVar('--primary-color', '#4870ac'),
                clusterBkg: getVar('--block-bg-color', '#f6f8fa'),
                clusterBorder: getVar('--marker-color', '#a2b6d4'),
                lineColor: getVar('--primary-color', '#4870ac'),
                fontFamily: '"Cantarell", "SourceHanSerifCN", "JetBrainsMono", sans-serif',
                textColor: getVar('--text-color', '#40464f'),
            };
        }

        // Configure mermaid based on theme
        mermaid.initialize({
          startOnLoad: false,
          theme: mermaidTheme, 
          themeVariables: themeVariables,
          securityLevel: 'loose',
          fontFamily: '"Cantarell", "SourceHanSerifCN", "JetBrainsMono", sans-serif',
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
            setErrorMsg('Unknown error');
        }
      }
    };

    // Use setTimeout to ensure DOM has updated styles if theme changed recently
    const timer = setTimeout(() => {
        renderDiagram();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [status, code, theme]); 

  // Handle Fullscreen
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
    setZoom(1); // Reset zoom on toggle
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  if (status === 'error') {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded text-red-600 text-sm font-mono overflow-auto">
        <p className="font-bold mb-2">Mermaid Syntax Error:</p>
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
      {/* Toolbar */}
      {(status === 'rendered' || isFullscreen) && (
        <div className={`absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-zinc-800/90 backdrop-blur border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm p-1 z-10 transition-opacity ${isFullscreen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400" title="Zoom Out">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <span className="text-xs text-zinc-400 w-8 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400" title="Zoom In">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1"></div>
          <button onClick={toggleFullscreen} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
            )}
          </button>
        </div>
      )}

      {/* Content */}
      <div className={`mermaid-content flex justify-center items-center overflow-auto ${isFullscreen ? 'flex-1 w-full h-full p-4' : 'w-full'}`} style={{ minHeight: '100px' }}>
        {status === 'pending' || status === 'loading' ? (
           <div className="flex flex-col items-center justify-center py-12 text-zinc-400 animate-pulse">
             <svg className="animate-spin mb-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             <span className="text-xs font-medium">Rendering Diagram...</span>
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
