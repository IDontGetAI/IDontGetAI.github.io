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


function GiscusCallback() {
  const [, setLocation] = useHashLocation();

  // This component handles the redirect from Giscus which ends with #comments
  // We try to restore the user's context (Note or PDF) from the query string
  if (typeof window !== 'undefined') {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const src = params.get('src');

    if (src) {
      // Simple heuristic to determine viewer type
      if (src.toLowerCase().endsWith('.pdf')) {
        // Use replace to avoid history pollution
        window.location.hash = '/pdf-viewer';
        console.log("Recovered PDF session from Giscus login");
      } else {
        window.location.hash = '/note-viewer';
        console.log("Recovered Note session from Giscus login");
      }
      return <div className="flex items-center justify-center min-h-[50vh]">Restoring session...</div>;
    }
  }

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
