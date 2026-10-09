"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Animate the persistent main element so navigation does not reset page state.
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const main = document.getElementById("main-content");
    if (!main || preference.matches) {
      return;
    }

    const animation = main.animate([{ opacity: 0.65 }, { opacity: 1 }], {
      duration: 240,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    });
    const stop = () => animation.cancel();
    preference.addEventListener("change", stop);

    return () => {
      animation.cancel();
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);

  return null;
}
