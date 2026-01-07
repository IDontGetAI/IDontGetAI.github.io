import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  hover?: boolean;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function GlitchText({ text, className, hover = true }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
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
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    if (!hover) scramble();
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <span
      className={cn("inline-block font-mono", className)}
      onMouseEnter={hover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}
