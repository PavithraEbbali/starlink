'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Adds a cursor-tracking specular highlight across the surface. */
  glare?: boolean;
}

/**
 * 3D tilt-on-mouse-move card used for the plan cards.
 *
 * Rotation is driven by springs so the card settles rather than snapping.
 * Touch pointers and reduced-motion users get a plain static card with no
 * listeners attached - the tilt is pure desktop polish and never blocks a tap.
 */
export function TiltCard({
  children,
  className = '',
  max = 6,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // -0.5 .. 0.5 across the card on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [max, -max]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-max, max]),
    spring,
  );

  // Glare follows the cursor across the surface.
  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useMotionValue(0);
  const glareOpacitySpring = useSpring(glareOpacity, {
    stiffness: 180,
    damping: 24,
  });
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.28), transparent 60%)`,
  );

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ perspective: 1100 }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full will-change-transform"
      >
        {children}

        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
            style={{
              opacity: glareOpacitySpring,
              background: glareBackground,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default TiltCard;
