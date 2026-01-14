import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

const navItems = [
  { path: "/", cmd: "./home", label: "主页" },
  { path: "/ai", cmd: "cd /ai", label: "AI" },
  { path: "/math", cmd: "cd /math", label: "数学" },
  { path: "/physics", cmd: "cd /physics", label: "物理" },
  { path: "/philosophy", cmd: "cd /phil", label: "哲学" },
  { path: "/psychology", cmd: "cd /psych", label: "心理" },
  { path: "/economics", cmd: "cd /econ", label: "经济" },
  { path: "/literature", cmd: "cd /lit", label: "文学" },
  { path: "/cse", cmd: "cd /cse", label: "公考" },
  { path: "/tools", cmd: "./tools.sh", label: "工具" },
];

export function TerminalNavbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for background transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled
            ? "bg-black/80 backdrop-blur-md border-primary/20 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo / Terminal Prompt */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Terminal className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-mono text-sm md:text-base font-bold text-primary">
                root@idontgetai:~<span className="animate-pulse">_</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={cn(
                      "font-mono text-sm cursor-pointer transition-colors relative group",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                    )}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3 text-secondary">
                      &gt;
                    </span>
                    {item.cmd}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-primary/20 backdrop-blur-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "font-mono text-sm py-2 px-4 rounded border border-transparent transition-all cursor-pointer",
                      location === item.path
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "text-muted-foreground hover:bg-white/5 hover:text-primary"
                    )}
                  >
                    <span className="text-secondary mr-2">$</span>
                    {item.cmd}
                    <span className="float-right text-xs opacity-50">
                      // {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
