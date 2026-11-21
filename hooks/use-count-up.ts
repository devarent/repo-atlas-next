"use client";

import * as React from "react";

/**
 * Animated counter that stays correct in occluded/background tabs.
 * SSR renders the real value; the animation only runs when frames are
 * actually delivered, with a watchdog that snaps to the target otherwise.
 */
export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = React.useState(target);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    let watchdog = 0;
    let started = false;

    const run = () => {
      if (started || document.visibilityState !== "visible") return;
      started = true;
      let frames = 0;

      watchdog = window.setTimeout(() => {
        if (frames === 0) setValue(target);
      }, 350);

      const start = performance.now();
      const tick = (now: number) => {
        frames += 1;
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      setValue(0);
      raf = requestAnimationFrame(tick);
    };

    run();
    const onVisible = () => run();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(watchdog);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [target, duration]);

  return value;
}
