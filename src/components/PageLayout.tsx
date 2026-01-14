import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  backgroundImage,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("relative w-full overflow-hidden min-h-screen", className)}>
      {/* Background Layer (Fixed) */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" /> {/* Overlay darkening */}
          <img
            src={backgroundImage}
            alt="Background"
            className="h-full w-full object-cover opacity-60 blur-[1px]"
            style={{ 
              imageRendering: 'auto',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              position: 'fixed',
              top: 0,
              left: 0
            }}
          />
          {/* Scanline/Grid Effect */}
          <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
          <div className="absolute inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20" />
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-30 container mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 space-y-2 border-l-4 border-primary pl-6"
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-shine">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary/80 font-mono">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            {children}
        </motion.div>
      </div>
    </div>
  );
}
