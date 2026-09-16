import {
  SITE,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  FOOTER_LEGAL,
} from '@/lib/content';
import { CallButton } from '@/components/ui/CallButton';
import { Logo } from './Header';

/**
 * Footer.
 *
 * Four-column brand / Shop / Learn / Contact grid over a legal fine-print
 * block and a policy-link row, matching the enterprise retailer convention.
 * The footer and the header are the only two places that surface the raw
 * phone number as button text; everywhere else uses "Call to order".
 */
export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-void">
      <div className="shell py-16 sm:py-20">
        {/* ---- Top grid ---- */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:pr-6">
            <div className="text-pure">
              <Logo />
            </div>
            <p className="mt-5 max-w-[22rem] text-[0.8125rem] leading-relaxed text-muted">
              Independent authorized retailer helping U.S. households and
              businesses order {SITE.carrier} satellite internet.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-xs sm:text-[0.6875rem] font-semibold tracking-[0.14em] uppercase text-pure">
                {column.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <a
                      href={link.href}
                      className="-my-1.5 block py-3 text-[0.8125rem] text-muted transition-colors duration-300 hover:text-pure sm:my-0 sm:py-0"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-xs sm:text-[0.6875rem] font-semibold tracking-[0.14em] uppercase text-pure">
              Talk to a human
            </h2>

            <div className="mt-5">
              {/* Footer CTA shows the raw number, per spec. */}
              <CallButton
                label={SITE.phoneDisplay}
                variant="outline"
                size="sm"
                magnetic={false}
              />
            </div>

            <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
              {SITE.hours}
            </p>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
              {SITE.address}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 -my-1.5 inline-block py-3 text-[0.8125rem] text-muted transition-colors duration-300 hover:text-pure sm:my-0 sm:py-0"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* ---- Legal fine print ---- */}
        <div className="mt-14 border-t border-hairline pt-10">
          <h2 className="sr-only">Legal disclosures</h2>

          <div className="max-w-[62rem] space-y-4">
            <p className="text-[0.75rem] leading-relaxed text-faint">
              {FOOTER_LEGAL.retailerDisclosure}
            </p>
            <p className="text-[0.75rem] leading-relaxed text-faint">
              {FOOTER_LEGAL.compensation}
            </p>
            <p className="text-[0.75rem] leading-relaxed text-faint">
              {FOOTER_LEGAL.pricingNote}
            </p>
          </div>
        </div>

        {/* ---- Policy links ---- */}
        <div className="mt-10 border-t border-hairline pt-8">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="-my-2 block py-3.5 text-[0.75rem] text-muted transition-colors duration-300 hover:text-pure sm:my-0 sm:py-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
