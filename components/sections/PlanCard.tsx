'use client';

import { motion } from 'motion/react';
import type { PlanItem } from '@/lib/content';
import { planCtaLabel, formatSpeed } from '@/lib/content';
import { PriceLockup } from '@/components/ui/PriceLockup';
import { CallButton } from '@/components/ui/CallButton';
import { TiltCard } from '@/components/ui/TiltCard';
import { staggerItem } from '@/components/ui/Reveal';

/**
 * One plan card.
 *
 * Reads every value off the PlanItem - name, speeds, price, data policy,
 * hardware, contract term, features and the CTA label. Nothing here is
 * hard-coded, so a change in lib/content.ts flows straight through.
 */
export function PlanCard({
  plan,
  /**
   * True when this card sits on a group backdrop photograph. Frosting is
   * scoped to that case - on the plain dark section there is nothing behind
   * the card to show through, so the blur would just cost GPU for nothing.
   */
  onBackdrop = false,
}: {
  plan: PlanItem;
  onBackdrop?: boolean;
}) {
  const down = formatSpeed(plan.speedDown);
  const up = formatSpeed(plan.speedUp);

  return (
    <motion.div variants={staggerItem} className="h-full">
      <TiltCard className="h-full" max={5}>
        <article
          className={[
            // No overflow-hidden here: the "Most popular" badge is positioned
            // above the card's top edge and would be clipped by it.
            'relative flex h-full flex-col rounded-2xl border p-6 sm:p-7',
            'transition-colors duration-500',
            // On a backdrop, frosted rather than opaque so the photograph is
            // not boxed out. Opacity stays uniform across both card types -
            // an earlier version used a gradient that thinned out at the top
            // of the popular card, and a bright patch of photo behind it
            // wiped out the contrast on the heading.
            onBackdrop ? 'bg-panel sm:bg-panel/92 sm:backdrop-blur-lg' : 'bg-panel',
            plan.isPopular
              ? 'border-accent/45'
              : 'border-hairline hover:border-hairline-strong',
          ].join(' ')}
        >
          {/* Accent wash for the popular card - tint only, no transparency. */}
          {plan.isPopular && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-2xl bg-gradient-to-b from-accent/20 to-transparent"
            />
          )}
          {plan.isPopular && (
            <span className="absolute -top-2.5 left-6 rounded-full bg-accent px-3 py-1 text-[0.6875rem] sm:text-[0.625rem] font-semibold tracking-[0.12em] uppercase text-pure">
              Most popular
            </span>
          )}

          {/* Name */}
          <h4 className="text-lg font-semibold tracking-tight text-pure">
            {plan.name}
          </h4>

          {plan.bestFor && (
            <p
              className={[
                'mt-1.5 text-sm leading-snug',
                onBackdrop ? 'text-mist' : 'text-muted',
              ].join(' ')}
            >
              {plan.bestFor}
            </p>
          )}

          {/* Price */}
          <div className="mt-5">
            <PriceLockup plan={plan} size="card" />
          </div>

          {/* Speeds */}
          {(down || up) && (
            <div className="mt-5 flex items-stretch gap-3 rounded-xl border border-hairline bg-void/60 p-3.5">
              {down && (
                <SpeedStat label="Download" value={down} arrow="down" />
              )}
              {down && up && (
                <span aria-hidden="true" className="w-px bg-hairline" />
              )}
              {up && <SpeedStat label="Upload" value={up} arrow="up" />}
            </div>
          )}

          {/* Spec rows */}
          <dl className="mt-5 space-y-2.5 border-t border-hairline pt-5 text-sm">
            {plan.dataPolicy && (
              <SpecRow term="Data" definition={plan.dataPolicy} />
            )}
            {plan.latency && (
              <SpecRow term="Latency" definition={plan.latency} />
            )}
            {plan.equipmentFee && (
              <SpecRow term="Hardware" definition={plan.equipmentFee} />
            )}
            {plan.contractTerm && (
              <SpecRow term="Term" definition={plan.contractTerm} />
            )}
          </dl>

          {/* Features */}
          {plan.features.length > 0 && (
            <ul className="mt-5 space-y-2.5 border-t border-hairline pt-5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-snug text-mist"
                >
                  <CheckGlyph />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA - pinned to the bottom so every card in a row lines up */}
          <div className="mt-auto pt-7">
            <CallButton
              label={planCtaLabel(plan)}
              variant={plan.isPopular ? 'accent' : 'primary'}
              size="md"
              fullWidth
              magnetic={false}
              srContext={plan.name}
            />
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

function SpeedStat({
  label,
  value,
  arrow,
}: {
  label: string;
  value: string;
  arrow: 'up' | 'down';
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="flex items-center gap-1.5 text-[0.6875rem] sm:text-[0.625rem] font-medium tracking-[0.12em] uppercase text-muted">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 text-accent-bright"
        >
          <path
            d={arrow === 'down' ? 'M6 1v10M2.5 7.5 6 11l3.5-3.5' : 'M6 11V1M2.5 4.5 6 1l3.5 3.5'}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </p>
      <p className="mt-1 truncate text-[0.9375rem] font-semibold tracking-tight text-pure tabular-nums">
        {value}
      </p>
    </div>
  );
}

function SpecRow({ term, definition }: { term: string; definition: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-muted">{term}</dt>
      <dd className="min-w-0 text-right font-medium text-mist">{definition}</dd>
    </div>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-[0.3rem] h-3 w-3 shrink-0 text-accent-bright"
    >
      <path
        d="M3 8.5 6.2 11.7 13 4.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PlanCard;
