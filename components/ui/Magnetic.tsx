'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  /** How far the element is allowed to travel toward the cursor, in px. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic hover wrapper for CTAs.
 *
 * Tracks the pointer inside the element's bounds and eases the content toward
 * it on a spring. Pointer-capability and reduced-motion aware: on touch
 * devices and for users who ask for reduced motion it renders a plain div and
 * attaches no listeners at all, so there is no scroll-time cost on mobile.
 */
export function Magnetic({
  children,
  strength = 14,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 18, mass: 0.35 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Coarse pointers (touch) get no magnetism - it only fights the tap.
    if (event.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);

    // Normalise to -1..1 across the element, then scale by strength.
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
