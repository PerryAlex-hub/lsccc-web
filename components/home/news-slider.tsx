"use client";

import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

function subscribeReducedMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

type SliderPosition = {
  index: number;
  stops: number[];
  visible: number[] | null;
};

export function NewsSlider({ children }: { children: ReactNode }) {
  const id = useId();
  const region = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [position, setPosition] = useState<SliderPosition>({
    index: 0,
    stops: [0],
    visible: null,
  });
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const canSlide = position.stops.length > 1;
  const automatic = canSlide && !paused && !reducedMotion;

  useEffect(() => {
    const element = track.current;
    const container = region.current;
    if (!element || !container) {
      return;
    }
    let frame = 0;
    const update = () => {
      if (!element.clientWidth) {
        return;
      }
      const bounds = element.getBoundingClientRect();
      const maximum = Math.max(0, element.scrollWidth - element.clientWidth);
      const slides = Array.from(element.children);
      const stops = [
        ...new Set(
          slides.map((slide) => {
            const left =
              slide.getBoundingClientRect().left -
              bounds.left +
              element.scrollLeft;
            return Math.round(Math.min(Math.max(0, left), maximum));
          }),
        ),
      ];
      const index = stops.reduce(
        (closest, stop, index) =>
          Math.abs(stop - element.scrollLeft) <
          Math.abs(stops[closest] - element.scrollLeft)
            ? index
            : closest,
        0,
      );
      const visible = slides.flatMap((slide, index) => {
        const rectangle = slide.getBoundingClientRect();
        return rectangle.left >= bounds.left - 2 &&
          rectangle.right <= bounds.right + 2
          ? [index]
          : [];
      });
      setPosition((previous) => {
        if (
          previous.index === index &&
          previous.stops.join() === stops.join() &&
          previous.visible?.join() === visible.join()
        ) {
          return previous;
        }
        return { index, stops, visible };
      });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    const visibility = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    visibility.observe(container);
    element.addEventListener("scroll", schedule, { passive: true });
    return () => {
      resize.disconnect();
      visibility.disconnect();
      element.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, [items.length]);

  useEffect(() => {
    if (!automatic || interacting || !inView) {
      return;
    }
    const timer = window.setInterval(() => {
      if (document.hidden) {
        return;
      }
      if (
        region.current?.contains(document.activeElement) ||
        region.current?.matches(":hover")
      ) {
        return;
      }
      const next = (position.index + 1) % position.stops.length;
      track.current?.scrollTo({
        left: position.stops[next],
        behavior: "smooth",
      });
    }, 7000);
    return () => window.clearInterval(timer);
  }, [automatic, interacting, inView, position.index, position.stops]);

  function goTo(index: number) {
    setPaused(true);
    if (track.current?.contains(document.activeElement)) {
      track.current.focus({ preventScroll: true });
    }
    track.current?.scrollTo({
      left: position.stops[
        Math.max(0, Math.min(index, position.stops.length - 1))
      ],
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  const visible = position.visible?.length
    ? position.visible
    : [position.index];
  const first = visible[0] + 1;
  const last = visible[visible.length - 1] + 1;

  if (!items.length) {
    return (
      <p className="text-sm text-muted">
        More agency updates will appear here when published.
      </p>
    );
  }

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="agency-news-title"
      className="min-w-0"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInteracting(false);
        }
      }}
      onKeyDown={(event) => {
        const destinations: Record<string, number> = {
          ArrowLeft: position.index - 1,
          ArrowRight: position.index + 1,
          Home: 0,
          End: position.stops.length - 1,
        };
        if (event.key in destinations) {
          event.preventDefault();
          goTo(destinations[event.key]);
        }
      }}
    >
      <div
        id={id}
        ref={track}
        tabIndex={0}
        aria-label="Browse agency news with the arrow keys"
        className="news-track"
      >
        {items.map((item, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`News item ${index + 1} of ${items.length}`}
            inert={
              position.visible !== null && !position.visible.includes(index)
            }
            className="news-slide"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4">
        <p
          aria-live={automatic ? "off" : "polite"}
          aria-atomic="true"
          className="text-xs tabular-nums text-muted"
        >
          {first === last ? `Showing ${first}` : `Showing ${first}–${last}`} of{" "}
          {items.length} updates
        </p>
        {canSlide && (
          <>
            <div
              className="order-3 flex w-full justify-center gap-1 sm:order-none sm:w-auto"
              aria-label="News carousel positions"
            >
              {position.stops.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to news position ${index + 1} of ${position.stops.length}`}
                  aria-current={position.index === index ? "true" : undefined}
                  aria-controls={id}
                  onClick={() => goTo(index)}
                  className="inline-flex size-11 items-center justify-center rounded-full"
                >
                  <span
                    className={`size-2 rounded-full transition-colors motion-reduce:transition-none ${position.index === index ? "bg-gold" : "bg-border"}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {!reducedMotion && (
                <button
                  type="button"
                  aria-label={
                    paused
                      ? "Start automatic news sliding"
                      : "Pause automatic news sliding"
                  }
                  aria-controls={id}
                  onClick={() => setPaused(!paused)}
                  className="motion-control inline-flex size-11 items-center justify-center rounded-full border border-border text-navy hover:border-blue hover:bg-paper"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    {paused ? (
                      <path d="M4 2.5 13 8l-9 5.5z" />
                    ) : (
                      <path d="M4 3h3v10H4zm5 0h3v10H9z" />
                    )}
                  </svg>
                </button>
              )}
              {([-1, 1] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  aria-label={direction === -1 ? "Previous news" : "Next news"}
                  aria-controls={id}
                  disabled={
                    direction === -1
                      ? position.index === 0
                      : position.index === position.stops.length - 1
                  }
                  onClick={() => goTo(position.index + direction)}
                  className="motion-control inline-flex size-11 items-center justify-center rounded-full border border-border text-navy hover:border-blue hover:bg-paper disabled:cursor-default disabled:opacity-35"
                >
                  <span aria-hidden="true">{direction === -1 ? "←" : "→"}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
