import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  hover?: boolean;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function GlitchText({ text, className, hover = true }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  const scramble = useCallback(() => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " " || char === "\n" || char === "\t") {
              return char;
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    if (!hover) {
      const readyTimeout = setTimeout(() => setIsReady(true), 0);
      scramble();
      return () => {
        clearTimeout(readyTimeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [hover, scramble]);

  return (
    <span
      ref={textRef}
      className={cn("inline-block font-mono", className)}
      onMouseEnter={hover ? () => { setIsReady(true); scramble(); } : undefined}
      style={{ 
        minWidth: isReady ? `${textWidth}px` : 'auto',
        display: 'inline-block',
        verticalAlign: 'baseline',
        lineHeight: '1.5'
      }}
    >
      {displayText}
    </span>
  );
}
