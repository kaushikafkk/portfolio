import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

let instance = null;

/** The live Lenis instance, or null when smooth scroll is off (reduced motion). */
export const getLenis = () => instance;

/**
 * Inertia smooth scrolling for the whole page.
 *
 * Lenis drives the real window scroll, so every existing scroll listener — the
 * hero parallax, the scroll spy, the reading rule — keeps working unchanged.
 * Anchor links (#about …) are intercepted and eased to the target, and the
 * whole thing is skipped when the visitor prefers reduced motion.
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: true, // honours each Section's `scroll-mt-28` automatically
      autoRaf: true,
    });

    return () => {
      instance.destroy();
      instance = null;
    };
  }, [reduced]);
}

export default useSmoothScroll;
