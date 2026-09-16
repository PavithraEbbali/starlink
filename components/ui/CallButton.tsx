'use client';

import { SITE } from '@/lib/content';
import { Magnetic } from './Magnetic';

type Variant = 'primary' | 'outline' | 'accent' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface CallButtonProps {
  /**
   * Visible button text.
   *
   * Plan cards and body sections pass "Call to order" / "Call for pricing".
   * Only the header and footer pass the raw phone number.
   */
  label: string;
  variant?: Variant;
  size?: Size;
  /** Adds the magnetic hover pull. Off for dense/inline placements. */
  magnetic?: boolean;
  /** Announced context for screen readers, e.g. the plan name. */
  srContext?: string;
  fullWidth?: boolean;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-pure text-void hover:bg-cloud shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset]',
  accent: 'bg-accent text-pure hover:bg-accent-bright',
  outline:
    'border border-hairline-strong bg-transparent text-pure hover:border-mist hover:bg-white/[0.04]',
  ghost: 'bg-white/[0.06] text-pure hover:bg-white/[0.12]',
};

const SIZES: Record<Size, string> = {
  // 44px on touch viewports - the accessible minimum - easing to 40px on
  // pointer devices where the header bar is tighter.
  sm: 'h-11 px-4 text-[0.8125rem] lg:h-10',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-7 text-[0.9375rem]',
};

/**
 * Every phone CTA on the site.
 *
 * The href is always derived from SITE.phoneHref in lib/content.ts, and every
 * instance carries data-call-cta so call tracking can bind to one selector.
 */
export function CallButton({
  label,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  srContext,
  fullWidth = false,
  className = '',
}: CallButtonProps) {
  const anchor = (
    <a
      href={SITE.phoneHref}
      data-call-cta
      data-call-label={label}
      aria-label={
        srContext
          ? `${label} - ${srContext}. Call ${SITE.phoneDisplay}`
          : `${label}. Call ${SITE.phoneDisplay}`
      }
      className={[
        'group relative inline-flex items-center justify-center gap-2',
        'rounded-full font-medium tracking-tight whitespace-nowrap',
        'transition-colors duration-300 ease-[var(--ease-out-expo)]',
        'active:scale-[0.98] motion-safe:transition-transform',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        magnetic ? '' : className,
      ].join(' ')}
    >
      <PhoneGlyph />
      <span>{label}</span>
    </a>
  );

  if (!magnetic) return anchor;

  return (
    <Magnetic
      strength={10}
      className={`inline-flex ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {anchor}
    </Magnetic>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-[1.05em] w-[1.05em] shrink-0"
    >
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.8 19.9 4.1 13.2 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CallButton;
