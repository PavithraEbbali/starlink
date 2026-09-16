import type { PlanItem } from '@/lib/content';

type LockupSize = 'hero' | 'card' | 'compact';

interface PriceLockupProps {
  plan: PlanItem;
  size?: LockupSize;
  /** Show the qualifier line beneath the figure (e.g. "per month, no contract"). */
  showQualifier?: boolean;
  className?: string;
}

/**
 * THE universal price lockup.
 *
 * Every dollar figure on the site renders through this one component, so the
 * dollar sign, the dominant integer and the muted cents always share a single
 * visual rhythm. It reads straight off a PlanItem from lib/content.ts - change
 * a price there and every lockup on every card, hero and table updates.
 *
 * Accessibility: the visual row is aria-hidden and a single clean sentence is
 * exposed to screen readers instead, so assistive tech never reads the price
 * as disconnected fragments ("dollar", "55", "per month").
 */
export function PriceLockup({
  plan,
  size = 'card',
  showQualifier = true,
  className = '',
}: PriceLockupProps) {
  const hasPrice = typeof plan.price === 'number';

  /* ---- No listed price: render a clean textual stand-in, never "$undefined". */
  if (!hasPrice) {
    return (
      <div className={className}>
        <p
          className={
            size === 'hero'
              ? 'text-3xl font-medium tracking-tight text-pure sm:text-4xl'
              : 'text-2xl font-medium tracking-tight text-pure'
          }
        >
          Custom pricing
        </p>
        {showQualifier && (
          <p className="mt-2 text-sm text-muted">
            Pricing confirmed for your address
          </p>
        )}
      </div>
    );
  }

  const dollars = Math.trunc(plan.price as number);
  const cents = plan.cents;

  /* Integer stays inside the 2.5rem - 3.5rem band at every breakpoint. */
  const integerSize =
    size === 'hero'
      ? 'text-[2.75rem] sm:text-[3.5rem]'
      : size === 'card'
        ? 'text-[2.5rem]'
        : 'text-[2.5rem]';

  const symbolSize =
    size === 'hero' ? 'text-xl sm:text-2xl' : 'text-lg';

  const centsSize = size === 'hero' ? 'text-lg sm:text-xl' : 'text-base';

  /* ---- Accessible sentence. One string, read naturally. */
  const spoken = [
    `${plan.name}:`,
    `${dollars}${cents ? ` dollars and ${cents} cents` : ' dollars'} per month`,
    plan.promoQualifier ? `, ${plan.promoQualifier}` : '',
  ]
    .join(' ')
    .replace(/\s+,/, ',');

  return (
    <div className={className}>
      <span className="sr-only">{spoken}</span>

      <div
        aria-hidden="true"
        className="flex items-start gap-[0.15em] leading-none text-pure"
      >
        <span
          className={`${symbolSize} mt-[0.35em] font-medium tabular-nums text-mist`}
        >
          $
        </span>

        <span
          className={`${integerSize} font-semibold tracking-[-0.045em] tabular-nums`}
        >
          {dollars}
        </span>

        <span className="mt-[0.45em] flex items-baseline gap-1">
          {cents && (
            <span
              className={`${centsSize} font-medium tabular-nums text-mist`}
            >
              {cents}
            </span>
          )}
          <span className="text-sm font-medium text-muted">/mo</span>
        </span>
      </div>

      {showQualifier && plan.promoQualifier && (
        <p aria-hidden="true" className="mt-2 text-sm text-muted">
          {plan.promoQualifier}
        </p>
      )}
    </div>
  );
}

export default PriceLockup;
