import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  delay?: number;
}

export function TypingAnimation({ text, speed = 50, className, cursor = true, delay = 0 }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [estimatedHeight, setEstimatedHeight] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (text) {
      const lines = text.split('\n').length;
      const lineHeight = 24;
      const cursorHeight = cursor ? 20 : 0;
      setEstimatedHeight(lines * lineHeight + cursorHeight);
    }
  }, [text, cursor]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
          if (index >= text.length) {
              clearInterval(interval);
              return prev;
          }
          const nextChar = text[index];
          return text.slice(0, index + 1);
      });
      index++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <span 
      ref={containerRef}
      className={cn("font-mono whitespace-pre-wrap inline-block", className)}
      style={{ 
        minHeight: `${estimatedHeight}px`,
        display: 'inline-block',
        width: '100%'
      }}
    >
      {displayedText}
      {cursor && (
        <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
      )}
    </span>
  );
}
