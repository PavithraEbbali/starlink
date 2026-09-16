'use client';

import { BackdropImage } from '@/components/ui/BackdropImage';
import { motion, useReducedMotion } from 'motion/react';
import { HERO, IMAGES, LEAD_PLAN, MARQUEE_ITEMS } from '@/lib/content';
import { PriceLockup } from '@/components/ui/PriceLockup';
import { Marquee } from '@/components/ui/Marquee';
import { ZipChecker } from './ZipChecker';

/**
 * Hero.
 *
 * Background is a single photograph with a darkening scrim - no animated
 * starfield or black hole. The image is marked priority so it is the LCP
 * element and is not lazy-loaded.
 *
 * The only call-to-action here is the ZIP availability checker; the phone
 * CTA lives in the sticky header directly above.
 */
export function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-void"
      aria-labelledby="hero-heading"
    >
      {/* ---- Background photograph ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <BackdropImage image={IMAGES.heroBackground} priority />

        {/*
          Two-pass scrim. The horizontal pass keeps the left-hand column
          readable over a busy photo; the vertical pass seats the section
          against the black page background above and below.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-transparent to-void" />
      </div>

      <div className="shell relative z-10 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-[46rem]">
          {/* Eyebrow */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-white/[0.06] px-3.5 py-1.5 text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-mist backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
              {HERO.eyebrow}
            </span>
          </motion.div>

          {/* Headline - masked word reveal */}
          <h1
            id="hero-heading"
            aria-label={HERO.headline}
            className="mt-5 text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.035em] text-pure sm:text-[3.25rem] lg:text-[4rem]"
          >
            <span aria-hidden="true">
              {HERO.headline.split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <motion.span
                    className="inline-block"
                    initial={prefersReduced ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.95,
                      delay: 0.1 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                  {index < HERO.headline.split(' ').length - 1 && (
                    <span>&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
          </h1>

          {/* Subline */}
          <motion.p
            {...fadeUp(0.42)}
            className="mt-5 max-w-[38rem] text-base leading-relaxed text-mist sm:text-lg"
          >
            {HERO.subline}
          </motion.p>

          {/* Price anchor */}
          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3"
          >
            <div>
              <p className="text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-muted">
                {HERO.priceCaption}
              </p>
              <div className="mt-2">
                <PriceLockup
                  plan={LEAD_PLAN}
                  size="hero"
                  showQualifier={false}
                />
              </div>
            </div>

            <p className="mb-1.5 max-w-[15rem] text-sm leading-snug text-muted">
              {LEAD_PLAN.name} &middot; {LEAD_PLAN.equipmentFee}
            </p>
          </motion.div>

          {/* ZIP availability checker */}
          <motion.div {...fadeUp(0.66)} className="mt-8 max-w-[34rem]">
            <ZipChecker />
          </motion.div>

          {/* Trust chips */}
          <motion.ul
            {...fadeUp(0.78)}
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            {HERO.trustChips.map((chip) => (
              <li
                key={chip}
                className="flex items-center gap-2 rounded-full border border-hairline bg-white/[0.05] px-3.5 py-2 text-[0.8125rem] font-medium text-mist backdrop-blur-sm"
              >
                <CheckGlyph />
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Trust ticker */}
      <div className="relative z-10 border-y border-hairline bg-void/70 py-4 backdrop-blur-sm">
        <Marquee items={MARQUEE_ITEMS} duration={42} />
      </div>
    </section>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 text-accent-bright"
    >
      <path
        d="M3 8.5 6.2 11.7 13 4.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Hero;
