'use client';

import Image from 'next/image';
import {
  ALL_PLANS,
  HARDWARE,
  FOOTER_LEGAL,
  SECTIONS,
  CTA_LABELS,
  formatSpeedPair,
  formatMonthly,
} from '@/lib/content';
import { RevealText, Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { CallButton } from '@/components/ui/CallButton';

/**
 * The honest fine-print grid.
 *
 * Every row is generated from ALL_PLANS and every hardware card from
 * HARDWARE, so this table can never drift out of sync with the plan cards
 * above it - both read the same objects in lib/content.ts.
 *
 * Renders as a real <table> from lg up and as stacked cards below it, which
 * keeps the data readable at 320px without a horizontal scroll container.
 */
export function FinePrint() {
  const columns = [
    { key: 'price', label: 'Monthly' },
    { key: 'speed', label: 'Speed' },
    { key: 'data', label: 'Data' },
    { key: 'hardware', label: 'Hardware' },
    { key: 'term', label: 'Term' },
  ] as const;

  const rowValues = (plan: (typeof ALL_PLANS)[number]) => ({
    price: formatMonthly(plan),
    speed: formatSpeedPair(plan),
    data: plan.dataPolicy ?? '—',
    hardware: plan.equipmentFee ?? '—',
    term: plan.contractTerm ?? '—',
  });

  return (
    <section
      id="fine-print"
      className="relative border-t border-hairline bg-ink py-20 sm:py-24 lg:py-28"
      aria-labelledby="fine-print-heading"
    >
      <div className="shell">
        <header className="max-w-[44rem]">
          <p className="text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-accent-bright">
            {SECTIONS.finePrint.eyebrow}
          </p>
          <RevealText
            as="h2"
            text={SECTIONS.finePrint.heading}
            className="mt-4 text-[2rem] font-semibold tracking-[-0.035em] text-pure sm:text-[2.75rem]"
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-mist">
              {SECTIONS.finePrint.blurb}
            </p>
          </Reveal>
        </header>

        {/* ---- Desktop table ---- */}
        <Reveal delay={0.1} className="mt-12 hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-panel">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Starlink plan comparison: monthly price, speed, data policy,
                hardware cost and contract term.
              </caption>
              <thead>
                <tr className="border-b border-hairline-strong bg-white/[0.02]">
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs sm:text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-muted"
                  >
                    Plan
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-6 py-4 text-xs sm:text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-muted"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_PLANS.map((plan) => {
                  const values = rowValues(plan);
                  return (
                    <tr
                      key={plan.id}
                      className="border-b border-hairline transition-colors last:border-0 hover:bg-white/[0.025]"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-sm font-semibold text-pure"
                      >
                        {plan.name}
                        {plan.isPopular && (
                          <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[0.625rem] sm:text-[0.5625rem] font-semibold tracking-[0.1em] uppercase text-accent-bright">
                            Popular
                          </span>
                        )}
                      </th>
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={[
                            'px-6 py-4 text-sm',
                            column.key === 'price'
                              ? 'font-semibold text-pure tabular-nums'
                              : 'text-mist',
                          ].join(' ')}
                        >
                          {values[column.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ---- Mobile / tablet stacked cards ---- */}
        <StaggerGrid
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden"
          stagger={0.06}
        >
          {ALL_PLANS.map((plan) => {
            const values = rowValues(plan);
            return (
              <StaggerItem key={plan.id}>
                <div className="rounded-xl border border-hairline bg-panel p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[0.9375rem] font-semibold tracking-tight text-pure">
                      {plan.name}
                    </h3>
                    <span className="shrink-0 text-[0.9375rem] font-semibold text-pure tabular-nums">
                      {values.price}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2 border-t border-hairline pt-4 text-[0.8125rem]">
                    {columns
                      .filter((column) => column.key !== 'price')
                      .map((column) => (
                        <div
                          key={column.key}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <dt className="shrink-0 text-muted">
                            {column.label}
                          </dt>
                          <dd className="min-w-0 text-right text-mist">
                            {values[column.key]}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        {/* ---- Hardware ---- */}
        <div id="hardware" className="mt-20 scroll-mt-28 sm:mt-24">
          <header className="max-w-[44rem]">
            <p className="text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-accent-bright">
              {SECTIONS.hardware.eyebrow}
            </p>
            <RevealText
              as="h3"
              text={SECTIONS.hardware.heading}
              className="mt-4 text-[1.75rem] font-semibold tracking-[-0.03em] text-pure sm:text-[2.25rem]"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-mist">
                {SECTIONS.hardware.blurb}
              </p>
            </Reveal>
          </header>

          <StaggerGrid
            className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
            stagger={0.1}
          >
            {HARDWARE.map((kit) => (
              <StaggerItem key={kit.id} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-panel transition-colors duration-500 hover:border-hairline-strong">
                  {kit.image && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-elevated">
                      <Image
                        src={kit.image.src}
                        alt={kit.image.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-panel/85 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <h4 className="text-base font-semibold tracking-tight text-pure">
                      {kit.name}
                    </h4>

                    <p className="mt-4 text-[2.5rem] leading-none font-semibold tracking-[-0.045em] text-pure tabular-nums">
                      <span className="align-top text-lg font-medium text-mist">
                        $
                      </span>
                      {kit.price.toLocaleString('en-US')}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      One-time &middot; {kit.bestFor}
                    </p>

                    <p className="mt-5 border-t border-hairline pt-5 text-sm leading-relaxed text-mist">
                      {kit.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {kit.specs.map((spec) => (
                        <li
                          key={spec}
                          className="flex items-start gap-2.5 text-sm leading-snug text-mist"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent-bright"
                          />
                          {spec}
                        </li>
                      ))}
                    </ul>

                    {/* CTA pinned to the bottom so all three cards align. */}
                    <div className="mt-auto pt-6">
                      <CallButton
                        label={CTA_LABELS.order}
                        variant="primary"
                        size="md"
                        fullWidth
                        magnetic={false}
                        srContext={kit.name}
                      />
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>

        {/* ---- Pricing note + CTA ---- */}
        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-col gap-6 rounded-2xl border border-hairline bg-panel p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[46rem] text-[0.8125rem] leading-relaxed text-muted">
              {FOOTER_LEGAL.pricingNote}
            </p>
            <div className="shrink-0">
              <CallButton
                label={CTA_LABELS.order}
                variant="primary"
                size="lg"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FinePrint;
