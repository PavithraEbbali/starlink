import { DisclosureBar, Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Plans } from '@/components/sections/Plans';
import { FinePrint } from '@/components/sections/FinePrint';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';

/**
 * Canonical section order.
 *
 *  1. Top disclosure bar   - persistent, non-dismissable
 *  2. Sticky header        - logo, anchor nav, phone CTA
 *  3. Hero                 - ZIP checker + call button + price anchor
 *  4. Plans                - service lines in canonical order, data-driven
 *  5. Fine print           - comparison table + hardware costs
 *  6. How it works         - scroll-scrubbed dish assembly
 *  7. FAQ                  - accordion
 *  8. Footer               - links, legal, reseller disclosure
 */
export default function Home() {
  return (
    <>
      <DisclosureBar />
      <Header />

      <main id="main">
        <Hero />
        <Plans />
        <FinePrint />
        <HowItWorks />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
