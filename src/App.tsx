import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/Layout";
import { useEffect } from "react";

import Home from "@/pages/Home";
import AI from "@/pages/AI";
import Math from "@/pages/Math";
import MathAnalysisNote from "@/pages/notes/math/MathAnalysisNote";
import RemoteNoteDemo from "@/pages/notes/RemoteNoteDemo";
import Expression from "@/pages/notes/cse/expression.tsx";
import Judgment from "@/pages/notes/cse/judgment";
import Quantitative from "@/pages/notes/cse/quantitative";
import DataAnalysis from "@/pages/notes/cse/dataAnalysis";
import PdfViewer from "@/pages/refs/cse/pdf-viewer";
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
  return (
    <Router hook={useHashLocation}>
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
          <Route path="/notes/math/analysis-note" component={MathAnalysisNote} />
          <Route path="/notes/cse/expression" component={Expression} />
          <Route path="/notes/cse/judgment" component={Judgment} />
          <Route path="/notes/cse/quantitative" component={Quantitative} />
          <Route path="/notes/cse/data-analysis" component={DataAnalysis} />
          <Route path="/refs/cse/pdf-viewer" component={PdfViewer} />
          <Route path="/remote-demo" component={RemoteNoteDemo} />

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
