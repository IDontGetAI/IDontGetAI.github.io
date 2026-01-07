import { useState, useEffect } from "react";
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

  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

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
    <span className={cn("font-mono whitespace-pre-wrap", className)}>
      {displayedText}
      {cursor && (
        <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
      )}
    </span>
  );
}
