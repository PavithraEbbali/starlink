'use client';

import { useState } from 'react';
import { BackdropImage } from '@/components/ui/BackdropImage';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, SECTIONS, CTA_LABELS, IMAGES } from '@/lib/content';
import { RevealText, Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { CallButton } from '@/components/ui/CallButton';

/**
 * FAQ accordion.
 *
 * One panel open at a time. Each trigger is a real button wired to its panel
 * with aria-expanded / aria-controls, and the panel keeps its heading
 * association, so the whole thing is keyboard and screen-reader navigable.
 */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden border-t border-hairline bg-void py-20 sm:py-24 lg:py-28"
      aria-labelledby="faq-heading"
    >
      {/* ---- Full-bleed section background ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <BackdropImage image={IMAGES.faqBackground} />

        {/*
          Scrim. Flat pass for overall darkness, a light left pass behind the
          heading rail, and two fixed-height edge bands that fade into the
          black sections above and below.

          Kept restrained on purpose - an earlier pass at bg-void/65 plus a
          from-void/75 left gradient multiplied out to roughly 9% image
          visibility on the left, so the photograph read as flat black.
          The accordion's frosted panel carries legibility instead.
        */}
        <div className="absolute inset-0 bg-void/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/55 via-void/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Heading rail */}
          <header className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-accent-bright">
              {SECTIONS.faq.eyebrow}
            </p>
            <RevealText
              as="h2"
              text={SECTIONS.faq.heading}
              className="mt-4 text-[2rem] font-semibold tracking-[-0.035em] text-pure sm:text-[2.75rem]"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[26rem] text-base leading-relaxed text-cloud">
                {SECTIONS.faq.blurb}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 hidden lg:block">
                <CallButton
                  label={CTA_LABELS.order}
                  variant="outline"
                  size="md"
                />
              </div>
            </Reveal>
          </header>

          {/*
            Accordion sits on a frosted panel rather than straight on the
            photograph - it holds contrast wherever the image is brightest
            and keeps the section reading as an enterprise page, not a poster.
          */}
          <StaggerGrid
            className="divide-y divide-hairline rounded-2xl border border-hairline bg-void/80 px-5 sm:bg-void/72 sm:px-7 sm:backdrop-blur-lg"
            stagger={0.05}
          >
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `${item.id}-panel`;

              return (
                <StaggerItem key={item.id}>
                  <div>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex w-full items-start justify-between gap-5 py-5 text-left transition-colors"
                      >
                        <span
                          className={[
                            'text-[1.0625rem] font-medium tracking-tight transition-colors duration-300 sm:text-lg',
                            isOpen
                              ? 'text-pure'
                              : 'text-mist group-hover:text-pure',
                          ].join(' ')}
                        >
                          {item.question}
                        </span>

                        <span
                          aria-hidden="true"
                          className={[
                            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                            isOpen
                              ? 'border-accent bg-accent/15 text-accent-bright'
                              : 'border-hairline-strong text-muted group-hover:border-mist group-hover:text-mist',
                          ].join(' ')}
                        >
                          <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3">
                            <motion.path
                              d="M7 1.5v11"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              style={{ transformOrigin: '7px 7px' }}
                            />
                            <path
                              d="M1.5 7h11"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          key={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.28 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[40rem] pr-10 pb-6 text-[0.9375rem] leading-relaxed text-mist">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>

        {/* Mobile CTA */}
        <Reveal delay={0.1}>
          <div className="mt-10 lg:hidden">
            <CallButton
              label={CTA_LABELS.order}
              variant="primary"
              size="lg"
              fullWidth
              magnetic={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Faq;
