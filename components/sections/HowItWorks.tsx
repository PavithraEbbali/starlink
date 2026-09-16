import Image from 'next/image';
import { BackdropImage } from '@/components/ui/BackdropImage';
import { SETUP_STEPS, SECTIONS, CTA_LABELS, IMAGES } from '@/lib/content';
import { RevealText, Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { CallButton } from '@/components/ui/CallButton';

/**
 * How it works.
 *
 * Four numbered steps in a plain card grid - the layout the reference
 * retailer sites use. No scroll-scrubbed animation and no sticky column:
 * each step is readable at a glance, in order, without scrolling through a
 * timeline to reach it.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden border-t border-hairline bg-void py-20 sm:py-24 lg:py-28"
      aria-labelledby="how-it-works-heading"
    >
      {/* ---- Full-bleed section background ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <BackdropImage image={IMAGES.howItWorksBackground} />

        {/*
          Scrim. Flat pass for overall darkness, a light left pass behind the
          heading, and two fixed-height edge bands that fade into the black
          sections above and below.

          These values are deliberately restrained. An earlier pass used
          bg-void/70 plus a from-void/80 left gradient, which multiplied out to
          roughly 6% image visibility across the left half - the photograph was
          technically rendering but read as flat black. Legibility is carried
          by the frosted cards on top of this, not by drowning the image.
        */}
        <div className="absolute inset-0 bg-void/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/55 via-void/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="shell relative">
        <header className="max-w-[46rem]">
          <p className="text-xs sm:text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-accent-bright">
            {SECTIONS.howItWorks.eyebrow}
          </p>
          <RevealText
            as="h2"
            text={SECTIONS.howItWorks.heading}
            className="mt-4 text-[2rem] font-semibold tracking-[-0.035em] text-pure sm:text-[2.75rem]"
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-cloud">
              {SECTIONS.howItWorks.blurb}
            </p>
          </Reveal>
        </header>

        <StaggerGrid
          className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {SETUP_STEPS.map((step) => (
            <StaggerItem key={step.id} className="h-full">
              {/*
                Cards are translucent over the section photograph so it reads
                as a real background rather than being boxed out by four
                opaque panels. The blur keeps the body copy legible.
              */}
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-panel sm:bg-panel/88 sm:backdrop-blur-lg transition-colors duration-500 hover:border-hairline-strong">
                {/* Step photograph */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-elevated">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent to-transparent" />

                  <span className="absolute bottom-3 left-4 text-xs sm:text-[0.6875rem] font-semibold tracking-[0.14em] tabular-nums text-accent-bright">
                    STEP {step.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-pure">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">
                    {step.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-hairline bg-panel p-6 sm:bg-panel/85 sm:backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-[34rem] text-[0.9375rem] leading-relaxed text-mist">
              {SECTIONS.howItWorks.ctaText}
            </p>
            <div className="shrink-0">
              <CallButton label={CTA_LABELS.order} variant="primary" size="lg" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HowItWorks;
