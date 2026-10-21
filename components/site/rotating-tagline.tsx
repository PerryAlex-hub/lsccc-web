"use client";

import { useEffect, useRef, useState } from "react";

export function RotatingTagline({
  messages,
  intervalMs = 3000,
  className = "",
}: {
  messages: readonly string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (messages.length < 2 || paused || reducedMotion.current) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [messages.length, intervalMs, paused]);

  useEffect(() => {
    function handleVisibility() {
      setPaused(document.hidden);
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (messages.length === 0) {
    return null;
  }

  return (
    <span
      className={`block ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={messages.length > 1 ? 0 : undefined}
    >
      <span key={index} className="tagline-fade block">
        {messages[index]}
      </span>
    </span>
  );
}
