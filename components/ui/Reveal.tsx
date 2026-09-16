'use client';

import type { ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* ==========================================================================
   Reveal - generic scroll-triggered entrance
   ========================================================================== */

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay before this element animates in. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  className?: string;
  as?: ElementType;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/* ==========================================================================
   RevealText - word-by-word masked text reveal
   ========================================================================== */

interface RevealTextProps {
  text: string;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

/**
 * Splits a string into words and lifts each one out from behind a mask.
 *
 * The full string stays in the accessibility tree as one label, so screen
 * readers and search engines never see it as a pile of loose spans.
 */
export function RevealText({
  text,
  className = '',
  stagger = 0.045,
  delay = 0,
  as: Tag = 'h2',
}: RevealTextProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[Tag];

  /**
   * The in-view trigger lives on the heading, NOT on the word spans.
   *
   * Each word starts translated 105% down, which puts it completely outside
   * its own overflow-hidden mask. IntersectionObserver clips against
   * overflowing ancestors, so an observer attached to the word itself would
   * see an empty intersection rect and never fire - the word would hide
   * itself forever. The heading is never clipped, so it is the safe element
   * to observe; the words then animate through variant propagation.
   */
  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '105%' },
                visible: {
                  y: '0%',
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </MotionTag>
  );
}

/* ==========================================================================
   StaggerGrid - staggered entrance for a grid of children
   ========================================================================== */

export function StaggerGrid({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? undefined : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

export default Reveal;
