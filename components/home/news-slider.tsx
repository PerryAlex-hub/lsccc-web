"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function NewsSlider({ children }: { children: ReactNode }) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [limits, setLimits] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) {
      return;
    }

    const update = () => {
      const start = element.scrollLeft <= 2;
      const end =
        element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      setLimits((previous) =>
        previous.start === start && previous.end === end
          ? previous
          : { start, end },
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: number) {
    const element = track.current;
    const first = element?.firstElementChild;
    const second = first?.nextElementSibling;
    if (!element || !first || !second) {
      return;
    }

    const distance =
      second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    element.scrollBy({
      left: distance * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <div className="min-w-0">
      <div
        id={id}
        ref={track}
        role="region"
        aria-label="Agency news"
        tabIndex={0}
        className="news-track"
      >
        {children}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-navy lg:hidden">
        <p>Swipe to explore news</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous news"
            aria-controls={id}
            disabled={limits.start}
            onClick={() => move(-1)}
            className="motion-control inline-flex size-11 items-center justify-center border border-border hover:border-blue hover:bg-paper disabled:cursor-default disabled:opacity-35"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next news"
            aria-controls={id}
            disabled={limits.end}
            onClick={() => move(1)}
            className="motion-control inline-flex size-11 items-center justify-center border border-border hover:border-blue hover:bg-paper disabled:cursor-default disabled:opacity-35"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
