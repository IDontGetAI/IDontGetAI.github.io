import { TerminalNavbar } from "@/components/TerminalNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <TerminalNavbar />
      <main className="flex-1 w-full relative pt-16">
        {children}
      </main>
    </div>
  );
}
