'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling.
 *
 * Mounted once at the root. Driven off requestAnimationFrame and torn down on
 * unmount. Users who ask for reduced motion keep native scrolling - Lenis is
 * never instantiated for them, so they pay no rAF cost.
 *
 * Anchor links are intercepted so in-page navigation shares the same easing
 * as wheel scrolling, with a top offset that clears the fixed chrome.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Expo-out easing: quick to leave, long settle. Reads as "expensive".
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch beats emulated momentum every time.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute('href');
      if (!id || id === '#') return;

      const node = document.querySelector(id);
      if (!node) return;

      event.preventDefault();
      // Clear the disclosure bar + sticky header.
      lenis.scrollTo(node as HTMLElement, { offset: -96, duration: 1.15 });
      // Keep the URL shareable without triggering a native jump.
      window.history.pushState(null, '', id);
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
