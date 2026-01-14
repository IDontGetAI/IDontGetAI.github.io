import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/Layout";
import { useEffect } from "react";

import Home from "@/pages/Home";
import AI from "@/pages/AI";
import Math from "@/pages/Math";

import PdfViewer from "@/components/PdfViewer";
import NoteViewer from "@/components/NoteViewer";
import Physics from "@/pages/Physics";
import Philosophy from "@/pages/Philosophy";
import Psychology from "@/pages/Psychology";
import Economics from "@/pages/Economics";
import Literature from "@/pages/Literature";
import Cse from "@/pages/cse";
import Tools from "@/pages/Tools";
import NotFound from "@/pages/NotFound";

function RedirectToCse() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/cse");
  }, [setLocation]);

  return null;
}

function AppRouter() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // 恢复从 404.html 保存的路径
    // 当 GitHub Pages 返回 404 时，404.html 会保存原始路径到 sessionStorage
    const savedPath = sessionStorage.getItem('spa_path');
    if (savedPath) {
      sessionStorage.removeItem('spa_path');
      setLocation(savedPath);
    }
  }, [setLocation]);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
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
          <Route path="/note-viewer" component={NoteViewer} />

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
