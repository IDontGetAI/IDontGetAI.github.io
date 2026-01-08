import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/Layout";

import Home from "@/pages/Home";
import AI from "@/pages/AI";
import Math from "@/pages/Math";
import MathAnalysisNote from "@/pages/notes/math/MathAnalysisNote";
import RemoteNoteDemo from "@/pages/notes/RemoteNoteDemo";
import Physics from "@/pages/Physics";
import Philosophy from "@/pages/Philosophy";
import Psychology from "@/pages/Psychology";
import Economics from "@/pages/Economics";
import Literature from "@/pages/Literature";
import Humanities from "@/pages/Humanities";
import Tools from "@/pages/Tools";
import NotFound from "@/pages/NotFound";

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
          <Route path="/humanities" component={Humanities} />
          <Route path="/tools" component={Tools} />
          
          {/* Specific Notes & Logs */}
          <Route path="/notes/math/analysis-note" component={MathAnalysisNote} />
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
