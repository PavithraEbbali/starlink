'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE, NAV_LINKS } from '@/lib/content';
import { CallButton } from '@/components/ui/CallButton';

/* ==========================================================================
   Logo - custom orbital mark + wordmark
   ========================================================================== */

export function Logo({
  className = '',
  /**
   * Header usage. Below 400px the wordmark is hidden and only the orbital
   * mark shows, so the logo, the full phone number and the menu button all
   * fit inside a 320px viewport. The footer renders the full lockup.
   */
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="h-7 w-7 shrink-0"
      >
        {/* Orbital path */}
        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="6.4"
          transform="rotate(-28 16 16)"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.5"
        />
        {/* Inner orbit */}
        <ellipse
          cx="16"
          cy="16"
          rx="8.6"
          ry="3.8"
          transform="rotate(-28 16 16)"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.85"
        />
        {/* Planet core */}
        <circle cx="16" cy="16" r="3.4" fill="currentColor" />
        {/* Satellite */}
        <circle cx="27.3" cy="9.6" r="1.9" fill="var(--color-accent)" />
      </svg>

      <span
        className={`${compact ? 'hidden xs:flex' : 'flex'} flex-col leading-none`}
      >
        <span className="text-[0.9375rem] font-semibold tracking-[0.14em] uppercase">
          {SITE.carrier}
        </span>
        <span className="mt-[3px] text-[0.6875rem] sm:text-[0.5625rem] font-medium tracking-[0.2em] uppercase text-muted">
          Authorized Retailer
        </span>
      </span>
    </span>
  );
}

/* ==========================================================================
   1. Top disclosure bar - persistent, non-dismissable
   ========================================================================== */

export function DisclosureBar() {
  return (
    <div className="relative z-50 border-b border-hairline bg-void">
      <div className="shell flex min-h-9 items-center justify-center py-2">
        <p className="text-center text-xs sm:text-[0.6875rem] font-medium tracking-[0.08em] uppercase text-mist sm:text-xs">
          {SITE.disclosure}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Sticky header
   ========================================================================== */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet whenever the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full transition-colors duration-500',
        scrolled
          ? 'border-b border-hairline bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a
          href="#hero"
          className="-m-2 flex shrink-0 items-center p-2 text-pure transition-opacity hover:opacity-80"
          aria-label={`${SITE.carrier} authorized retailer - back to top`}
        >
          <Logo compact />
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-mist transition-colors duration-300 hover:text-pure"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Header CTA shows the raw number, per spec. */}
          <CallButton
            label={SITE.phoneDisplay}
            variant="primary"
            size="sm"
            magnetic={false}
          />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-pure transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {/*
              All three bars sit on the centre line and are spread apart with
              translateY. Animating transforms rather than the `d` attribute
              keeps this on the compositor - and SVG path data of differing
              command structure cannot be interpolated at all.
            */}
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              {[
                { closedY: -4.5, openRotate: 45 },
                { closedY: 0, openRotate: 0 },
                { closedY: 4.5, openRotate: -45 },
              ].map((bar, index) => {
                const isMiddle = index === 1;
                return (
                  <motion.line
                    key={index}
                    x1="2.5"
                    y1="10"
                    x2="17.5"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    style={{ transformOrigin: '10px 10px' }}
                    animate={
                      menuOpen
                        ? {
                            y: 0,
                            rotate: bar.openRotate,
                            opacity: isMiddle ? 0 : 1,
                          }
                        : { y: bar.closedY, rotate: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <li key={`m-${link.href}${link.label}`}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-hairline py-4 text-base font-medium text-mist transition-colors hover:text-pure"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
