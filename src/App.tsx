import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, Redirect } from "wouter";
import { useHashLocation } from "./hooks/useHashLocation";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/Layout";

import Home from "@/pages/Home";
import AI from "@/pages/AI";
import Math from "@/pages/Math";

import PdfViewer from "@/components/PdfViewer";
import MarkdownViewer from "@/components/MarkdownViewer";
import Physics from "@/pages/Physics";
import Philosophy from "@/pages/Philosophy";
import Psychology from "@/pages/Psychology";
import Economics from "@/pages/Economics";
import Literature from "@/pages/Literature";
import Cse from "@/pages/cse";
import Tools from "@/pages/Tools";
import NotFound from "@/pages/NotFound";

function RedirectToCse() {
  return <Redirect to="/cse" />;
}


/**
 * Giscus OAuth 回调处理组件
 * 当用户从 Giscus 登录返回时，URL hash 会变成 #comments
 * 此组件负责恢复用户原来的页面上下文（PDF 或 Note Viewer）
 */
function GiscusCallback() {
  // NOTE: 这里不使用 useHashLocation 因为我们需要直接操作 window.location
  
  if (typeof window !== 'undefined') {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const src = params.get('src');
    const giscus = params.get('giscus');

    console.log('[GiscusCallback] 检测到 Giscus 回调', { src, hasGiscus: !!giscus });

    if (src) {
      // 根据 src 参数判断应该恢复到哪个 viewer
      const targetRoute = src.toLowerCase().endsWith('.pdf') 
        ? '/pdf-viewer' 
        : '/note-viewer';
      
      // 构建新 URL，保留所有 query 参数，只修正 hash
      const newUrl = `${window.location.origin}${window.location.pathname}${search}#${targetRoute}`;
      
      console.log('[GiscusCallback] 恢复会话到:', targetRoute);
      
      // 使用 replaceState 避免污染浏览器历史记录
      window.history.replaceState(null, '', newUrl);
      
      // 强制刷新以确保组件正确加载（因为 hash change 可能不触发完整的组件重载）
      window.location.reload();
      
      // 返回加载提示（实际上页面会立即刷新，用户看不到这个）
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <div className="animate-pulse text-primary">正在恢复会话...</div>
          <div className="text-xs text-muted-foreground font-mono opacity-70">
            Restoring session from Giscus login
          </div>
        </div>
      );
    }
  }

  // 如果没有 src 参数，重定向到首页
  return <Redirect to="/" />;
}

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/comments" component={GiscusCallback} />
          <Route path="/ai" component={AI} />
          <Route path="/math" component={Math} />
          <Route path="/physics" component={Physics} />
          <Route path="/philosophy" component={Philosophy} />
          <Route path="/psychology" component={Psychology} />
          <Route path="/economics" component={Economics} />
          <Route path="/literature" component={Literature} />
          <Route path="/cse" component={Cse} />
          <Route path="/humanities" component={RedirectToCse} />
          <Route path="/tools" component={Tools} />

          {/* Specific Notes & Logs */}
          <Route path="/pdf-viewer" component={PdfViewer} />
          <Route path="/note-viewer" component={MarkdownViewer} />

          {/* Placeholder Fallbacks */}
          <Route path="/notes/:subject/:topic">
            {() => (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <h1 className="text-2xl font-display text-primary">Note Under Construction</h1>
              </div>
            )}
          </Route>

          <Route path="/logs/:subject/:topic">
            {() => (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <h1 className="text-2xl font-display text-white">Log Under Construction</h1>
              </div>
            )}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
