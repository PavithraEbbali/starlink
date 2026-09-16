'use client';

import Image from 'next/image';
import { BackdropImage } from '@/components/ui/BackdropImage';
import {
  getActiveServiceLines,
  SERVICE_LINE_LABELS,
  SECTIONS,
  type PlanGroup,
} from '@/lib/content';
import { RevealText, Reveal, StaggerGrid } from '@/components/ui/Reveal';
import { PlanCard } from './PlanCard';

/**
 * The plans section.
 *
 * This component contains NO plan names, prices or service-line decisions.
 * It walks getActiveServiceLines(), which returns the canonical service-line
 * order filtered down to lines that actually have plans in lib/content.ts.
 *
 * Starlink sells satellite internet only, so fiber, cable, bundles, TV,
 * mobile and phone produce no groups and render nothing at all - no heading,
 * no placeholder card, no empty state. Adding plans for a new line to
 * lib/content.ts is all it would take to make that line appear here, in the
 * correct position, with no edit to this file.
 */
export function Plans() {
  const activeLines = getActiveServiceLines();

  return (
    <section
      id="plans"
      className="relative overflow-hidden border-t border-hairline bg-void py-20 sm:py-24 lg:py-28"
      aria-labelledby="plans-heading"
    >
      {/* Soft top glow so the section lifts off the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="shell relative">
        <header className="max-w-[44rem]">
          <p className="text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-accent-bright">
            {SECTIONS.plans.eyebrow}
          </p>
          <RevealText
            as="h2"
            text={SECTIONS.plans.heading}
            className="mt-4 text-[2rem] font-semibold tracking-[-0.035em] text-pure sm:text-[2.75rem]"
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-mist">
              {SECTIONS.plans.blurb}
            </p>
          </Reveal>
        </header>

        <div className="mt-14 space-y-20 sm:mt-16 lg:space-y-24">
          {activeLines.map(({ line, groups }) => (
            <div key={line}>
              {/* Service-line label appears only when that line has plans. */}
              <span className="sr-only">{SERVICE_LINE_LABELS[line]}</span>

              <div className="space-y-20 lg:space-y-24">
                {groups.map((group) => (
                  <PlanGroupBlock key={group.id} group={group} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanGroupBlock({ group }: { group: PlanGroup }) {
  // 3-up for three plans, 2-up on lg then 4-up on xl for four plans.
  const gridClass =
    group.plans.length >= 4
      ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'
      : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3';

  const onBackdrop = group.imageTreatment === 'backdrop';

  const header = (
    <div
      className={[
        'flex flex-col gap-4 pb-7 lg:flex-row lg:items-end lg:justify-between',
        onBackdrop ? 'border-b border-white/15' : 'border-b border-hairline',
      ].join(' ')}
    >
      <div className="max-w-[34rem]">
        <p
          className={[
            'text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase',
            onBackdrop ? 'text-cloud-deep' : 'text-muted',
          ].join(' ')}
        >
          {group.eyebrow}
        </p>
        <h3 className="mt-2.5 text-[1.625rem] font-semibold tracking-[-0.03em] text-pure sm:text-[2rem]">
          {group.name}
        </h3>
      </div>
      <p
        className={[
          'max-w-[34rem] text-sm leading-relaxed lg:text-right',
          onBackdrop ? 'text-cloud' : 'text-mist',
        ].join(' ')}
      >
        {group.blurb}
      </p>
    </div>
  );

  const grid = (
    <StaggerGrid className={`${gridClass} mt-8`} stagger={0.09}>
      {group.plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onBackdrop={onBackdrop} />
      ))}
    </StaggerGrid>
  );

  /* ---- Backdrop treatment: photo fills the block, behind header and cards. */
  if (onBackdrop && group.image) {
    return (
      <div className="relative isolate overflow-hidden rounded-3xl border border-hairline">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <BackdropImage image={group.image} />
          {/* Restrained scrim - see Faq.tsx for why these values stay low. */}
          <div className="absolute inset-0 bg-void/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-void/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void/85 to-transparent" />
        </div>

        <div className="p-5 sm:p-7 lg:p-9">
          {header}
          {grid}
        </div>
      </div>
    );
  }

  /* ---- Banner treatment: wide strip above the header. */
  return (
    <div>
      {group.image && (
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-hairline bg-elevated sm:aspect-[24/7]">
          <Image
            src={group.image.src}
            alt={group.image.alt}
            fill
            sizes="(min-width: 1200px) 1120px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/35 to-transparent" />
        </div>
      )}

      {header}
      {grid}
    </div>
  );
}

export default Plans;
