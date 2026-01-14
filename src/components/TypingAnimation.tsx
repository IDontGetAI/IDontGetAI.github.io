import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  delay?: number;
  hideCursorAfterComplete?: boolean;
  onComplete?: () => void;
}

export function TypingAnimation({
  text,
  speed = 50,
  className,
  cursor = true,
  delay = 0,
  hideCursorAfterComplete = false,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      setStarted(false);
      setCompleted(false);
      setDisplayedText("");
    }, 0);

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => {
      clearTimeout(resetTimeout);
      clearTimeout(startTimeout);
    };
  }, [delay, text]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        setCompleted(true);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <span className={cn("font-mono whitespace-pre-wrap", className)}>
      {displayedText}
      {cursor && (!hideCursorAfterComplete || !completed) && (
        <span className="animate-pulse [animation-duration:4s] inline-block w-2 h-4 bg-primary ml-1 align-middle" />
      )}
    </span>
  );
}
