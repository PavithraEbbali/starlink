/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every price, speed, hardware fee, feature bullet, disclosure and CTA label
 * rendered anywhere on this site is read from this file.
 *
 * To update the site when Starlink changes pricing or plan structure, edit
 * ONLY this file. No JSX/TSX layout file contains a hard-coded price, plan
 * name, speed, hardware cost, phone number or legal string.
 *
 * Service lines that Starlink does not sell simply have no entry in
 * PLAN_GROUPS. The renderer walks SERVICE_LINE_ORDER and skips any line with
 * zero groups, so unsold categories (fiber, cable, bundles, TV, mobile, phone)
 * disappear from the page entirely rather than rendering empty placeholders.
 * ============================================================================
 */

export type ServiceLine =
  | 'satellite'
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Optional extensions used by the layout engine (all non-breaking). */
  group?: string;
  latency?: string;
  bestFor?: string;
}

export interface PlanGroup {
  id: string;
  serviceLine: ServiceLine;
  name: string;
  eyebrow: string;
  blurb: string;
  /** Optional photograph for the group. */
  image?: SiteImage;
  /**
   * How that photograph is used:
   *   'banner'   - a wide strip above the group header (default)
   *   'backdrop' - fills the whole block, behind the header and plan cards
   *
   * Only one group should use 'backdrop'. Stacking three photo blocks in a
   * row overwhelms the section; one gives the lead group emphasis.
   */
  imageTreatment?: 'banner' | 'backdrop';
  plans: PlanItem[];
}

export interface HardwareItem {
  id: string;
  name: string;
  price: number;
  summary: string;
  specs: string[];
  bestFor: string;
  image?: SiteImage;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/* ==========================================================================
 * 1. RETAILER IDENTITY  (edit these to rebrand the whole site)
 * ========================================================================== */

export const SITE = {
  brandName: 'Starlink Authorized Retailer',
  /**
   * The operating entity named in the footer disclosures.
   *
   * NOTE: a retailer disclosure has to make clear that the site is NOT the
   * carrier, so this cannot simply be the word "Starlink" - that would read
   * as "Starlink is an independent authorized retailer of Starlink" and
   * defeat the purpose of the disclosure. Replace this with your real
   * registered company name before launch.
   */
  legalEntity: 'Starlink Authorized Retailer',
  carrier: 'Starlink',
  /** Single phone constant. Every tel: link on the site derives from this. */
  phoneDisplay: '(833) 641-0221',
  phoneHref: 'tel:+18336410221',
  hours: 'Mon-Fri 8AM-9PM ET · Sat-Sun 9AM-6PM ET',
  address: '1209 Orange Street, Wilmington, DE 19801',
  email: 'orders@starlinkretailer.us',
  /**
   * Canonical origin, used to resolve Open Graph / Twitter image URLs to
   * absolute paths. Set this to your production domain before launch.
   */
  siteUrl: 'https://starlinkretailer.us',
  /** Persistent, non-dismissable top bar. */
  disclosure: 'Independent Authorized Retailer of Starlink.',
  metaTitle: 'Starlink Authorized Retailer | High-Speed Satellite Internet',
  metaDescription:
    'Order Starlink satellite internet through an independent authorized retailer. Residential, Roam and Business plans with unlimited data and no contracts.',
} as const;

/* ==========================================================================
 * 1b. IMAGERY
 * --------------------------------------------------------------------------
 * Every photograph on the site is referenced from here. Drop a file into
 * /public/images using the exact filename below and it appears on the page -
 * no component edit required.
 *
 * Served files are optimised JPEGs. The full-resolution originals live in
 * /design/source-images (gitignored, not deployed); re-run
 * `python scripts/optimize-images.py` to regenerate the served set after
 * replacing an original.
 * ========================================================================== */

export interface SiteImage {
  src: string;
  alt: string;
  /**
   * Portrait crop served below the `sm` breakpoint. A phone viewport is far
   * taller than these landscape frames, so object-cover would crop the
   * subject out entirely. Omit it and the landscape file is used everywhere.
   */
  mobileSrc?: string;
}

export const IMAGES = {
  heroBackground: {
    src: '/images/hero-background.jpg',
    mobileSrc: '/images/hero-background-mobile.jpg',
    // Decorative: the hero headline already carries the meaning.
    alt: '',
  },
  ogImage: {
    src: '/images/og-image.jpg',
    alt: '',
  },
  /** Full-bleed backdrop behind the FAQ section. */
  faqBackground: {
    src: '/images/faq-background.jpg',
    mobileSrc: '/images/faq-background-mobile.jpg',
    // Decorative: sits behind the FAQ copy and carries no information.
    alt: '',
  },
  /** Full-bleed backdrop behind the How it works section. */
  howItWorksBackground: {
    src: '/images/how-it-works-background.jpg',
    mobileSrc: '/images/how-it-works-background-mobile.jpg',
    alt: '',
  },
} as const satisfies Record<string, SiteImage>;

/* ==========================================================================
 * 2. NAVIGATION
 * ========================================================================== */

export const NAV_LINKS = [
  { label: 'Plans', href: '#plans' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* ==========================================================================
 * 3. HERO
 * ========================================================================== */

export const HERO = {
  eyebrow: 'Authorized Retailer',
  headline: 'High-speed satellite internet for homes, vehicles and businesses.',
  subline:
    'Starlink delivers high-speed, low-latency internet using a constellation of low Earth orbit satellites, serving homes, vehicles and worksites beyond the reach of wired networks. Suitable for streaming, video conferencing and online gaming.',
  /** Which plan anchors the hero price lockup. Must match a PlanItem id. */
  leadPlanId: 'residential-100',
  priceCaption: 'Residential service starts at',
  zipLabel: 'Check availability at your address',
  zipPlaceholder: 'Enter ZIP code',
  zipCta: 'Check availability',
  trustChips: ['Unlimited Data', 'No Contracts', 'High-Speed, Low-Latency'],
} as const;

/* ==========================================================================
 * 3b. SECTION HEADINGS
 * --------------------------------------------------------------------------
 * All section copy lives here rather than inline in the JSX, so wording can
 * be revised without touching a layout file.
 * ========================================================================== */

export const SECTIONS = {
  plans: {
    eyebrow: 'Plans & Pricing',
    heading: 'Compare Starlink plans and pricing.',
    blurb:
      'All plans are month to month and can be changed or paused as your needs change. Monthly service pricing is shown below. Hardware is a separate one-time purchase.',
  },
  finePrint: {
    eyebrow: 'Plan comparison',
    heading: 'Complete plan and pricing comparison.',
    blurb:
      'Monthly service, hardware cost, data policy and contract terms for every plan, side by side. Hardware is a one-time purchase and is not included in the monthly figure.',
  },
  hardware: {
    eyebrow: 'Hardware',
    heading: 'Starlink hardware options.',
    blurb:
      'The kit you need depends on the plan you choose. Each one ships complete with everything required to get online and is designed for self-installation.',
  },
  howItWorks: {
    eyebrow: 'How it works',
    heading: 'A simple, four-step setup process.',
    blurb:
      'Starlink is designed for self-installation. Each kit arrives complete, and the dish aligns itself automatically once connected to power. No technician visit or additional wiring is required.',
    ctaText:
      'Not sure which kit suits your property? Speak with our team about your installation.',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Frequently asked questions.',
    blurb:
      'Common questions about hardware, installation and service, answered directly.',
  },
} as const;

/* ==========================================================================
 * 4. MARQUEE TICKER
 * ========================================================================== */

export const MARQUEE_ITEMS = [
  'Unlimited Standard Data',
  'No Long-Term Contracts',
  '25-60 ms Typical Latency',
  'No Technician Visit Required',
  'Coverage Beyond The Grid',
  'Works In Rain & Snow',
  'Free Shipping Available',
  '30-Day Trial Period',
] as const;

/* ==========================================================================
 * 5. SERVICE LINE RENDER ORDER
 * --------------------------------------------------------------------------
 * The page renders service lines in this exact sequence. A line with no
 * groups below is skipped completely - no heading, no placeholder, no card.
 *
 * AUDIT RESULT (starlink.com): Starlink sells satellite internet only.
 * It does not sell fiber, cable, bundles, TV, mobile phone or home phone
 * service, so those lines intentionally have zero groups and never render.
 * ========================================================================== */

export const SERVICE_LINE_ORDER: ServiceLine[] = [
  'fiber',
  'cable',
  'bundle',
  'tv',
  'mobile',
  'phone',
  'satellite',
];

export const SERVICE_LINE_LABELS: Record<ServiceLine, string> = {
  satellite: 'Satellite Internet',
  fiber: 'Fiber Internet',
  cable: 'Cable Internet',
  bundle: 'Bundles',
  tv: 'TV',
  mobile: 'Mobile',
  phone: 'Home Phone',
};

/* ==========================================================================
 * 6. PLANS  -  the pricing engine
 * ========================================================================== */

export const PLAN_GROUPS: PlanGroup[] = [
  {
    id: 'residential',
    serviceLine: 'satellite',
    name: 'Starlink Residential',
    eyebrow: 'For the home',
    blurb:
      'Fixed service at a single address. Choose the speed tier that matches your household. All residential tiers include unlimited data with no long-term contract.',
    image: {
      src: '/images/plan-residential.jpg',
      mobileSrc: '/images/plan-residential-mobile.jpg',
      alt: 'A suburban family home at sunset with a car parked in the driveway.',
    },
    // The lead group carries the full-block backdrop; Roam and Business keep
    // the banner strip. Move this line to another group to shift the emphasis.
    imageTreatment: 'backdrop',
    plans: [
      {
        id: 'residential-100',
        name: 'Residential 100 Mbps',
        serviceLine: 'satellite',
        group: 'residential',
        speedDown: 100,
        speedUp: 20,
        price: 55,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$349 Standard Kit',
        dataPolicy: 'Unlimited Standard Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Everyday browsing, HD streaming and video calls',
        features: [
          'Unlimited data with no overage charges',
          'Streams HD video on several devices at once',
          'Self-install — no technician appointment',
          'Pause or cancel your service any month',
        ],
      },
      {
        id: 'residential-200',
        name: 'Residential 200 Mbps',
        serviceLine: 'satellite',
        group: 'residential',
        speedDown: 200,
        speedUp: 25,
        price: 85,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$349 Standard Kit',
        dataPolicy: 'Unlimited Standard Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Busy households running 4K streams and remote work',
        isPopular: true,
        features: [
          'Unlimited data with no overage charges',
          'Handles 4K streaming plus simultaneous work calls',
          'Comfortable headroom for a full house of devices',
          'Self-install — no technician appointment',
        ],
      },
      {
        id: 'residential-max',
        name: 'Residential Max',
        serviceLine: 'satellite',
        group: 'residential',
        speedDown: 400,
        speedUp: 30,
        price: 130,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$349 Standard Kit',
        dataPolicy: 'Unlimited Priority Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Heavy users who want the top speed tier available',
        features: [
          'Highest network priority during peak hours',
          'Top residential speed tier, 200-400 Mbps range',
          'Built for large households and home studios',
          'Self-install — no technician appointment',
        ],
      },
    ],
  },
  {
    id: 'roam',
    serviceLine: 'satellite',
    name: 'Starlink Roam',
    eyebrow: 'For travel',
    blurb:
      'Portable service for travel and temporary locations. Suitable for RVs, remote cabins and job sites, with the option to pause billing between trips.',
    image: {
      src: '/images/plan-roam.jpg',
      alt: 'A camper van parked beside a lake with a Starlink Mini dish set up on a table.',
    },
    plans: [
      {
        id: 'roam-100',
        name: 'Roam 100 GB',
        serviceLine: 'satellite',
        group: 'roam',
        speedDown: 100,
        speedUp: 15,
        price: 55,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$249 Starlink Mini',
        dataPolicy: '100 GB Mobile Data, then reduced speeds',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Weekend trips and occasional off-grid use',
        features: [
          'Pause and resume billing month to month',
          'Use it anywhere on land in your service region',
          'Starlink Mini packs into a backpack',
          'Extra data available if you run out',
        ],
      },
      {
        id: 'roam-300',
        name: 'Roam 300 GB',
        serviceLine: 'satellite',
        group: 'roam',
        speedDown: 100,
        speedUp: 15,
        price: 80,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$249 Starlink Mini',
        dataPolicy: '300 GB Mobile Data, then reduced speeds',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Longer trips and part-time remote work on the road',
        isPopular: true,
        features: [
          'Triple the high-speed allowance of the 100 GB tier',
          'Pause and resume billing month to month',
          'Comfortable for streaming while travelling',
          'Works in motion on supported hardware',
        ],
      },
      {
        id: 'roam-unlimited',
        name: 'Roam Unlimited',
        serviceLine: 'satellite',
        group: 'roam',
        speedDown: 100,
        speedUp: 15,
        price: 175,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$249 Starlink Mini',
        dataPolicy: 'Unlimited Mobile Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Full-time RV and van life with no data ceiling',
        features: [
          'Unlimited mobile data with no allowance to track',
          'Built for full-time life on the road',
          'Pause and resume billing month to month',
          'Works in motion on supported hardware',
        ],
      },
    ],
  },
  {
    id: 'business',
    serviceLine: 'satellite',
    name: 'Starlink Business',
    eyebrow: 'For work',
    blurb:
      'Priority data for commercial use. Each tier includes a monthly priority allowance; once it is used, service continues at standard speeds.',
    image: {
      src: '/images/plan-business.jpg',
      alt: 'A satellite dish mounted on the roof of a commercial building.',
    },
    plans: [
      {
        id: 'business-50gb',
        name: 'Business Priority 50 GB',
        serviceLine: 'satellite',
        group: 'business',
        speedDown: 220,
        speedUp: 25,
        price: 55,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$2,500 High Performance Kit',
        dataPolicy: '50 GB Priority Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Small sites with light but critical connectivity needs',
        features: [
          'Priority access ahead of residential traffic',
          'Publicly routable IP available',
          '24/7 priority support',
          'High Performance hardware built for all weather',
        ],
      },
      {
        id: 'business-500gb',
        name: 'Business Priority 500 GB',
        serviceLine: 'satellite',
        group: 'business',
        speedDown: 220,
        speedUp: 25,
        price: 155,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$2,500 High Performance Kit',
        dataPolicy: '500 GB Priority Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Storefronts, clinics and small offices',
        isPopular: true,
        features: [
          'Priority access ahead of residential traffic',
          'Supports point-of-sale, VoIP and cloud tools',
          '24/7 priority support',
          'Wide field of view for tougher installs',
        ],
      },
      {
        id: 'business-1tb',
        name: 'Business Priority 1 TB',
        serviceLine: 'satellite',
        group: 'business',
        speedDown: 220,
        speedUp: 25,
        price: 280,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$2,500 High Performance Kit',
        dataPolicy: '1 TB Priority Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'Multi-user teams and connected job sites',
        features: [
          'Priority access ahead of residential traffic',
          'Sized for teams sharing one connection',
          '24/7 priority support',
          'Publicly routable IP available',
        ],
      },
      {
        id: 'business-2tb',
        name: 'Business Priority 2 TB',
        serviceLine: 'satellite',
        group: 'business',
        speedDown: 220,
        speedUp: 25,
        price: 530,
        promoQualifier: 'per month, no contract',
        equipmentFee: '$2,500 High Performance Kit',
        dataPolicy: '2 TB Priority Data',
        contractTerm: 'No Contracts',
        latency: '25-60 ms typical',
        bestFor: 'High-demand operations and temporary large sites',
        features: [
          'Largest standard priority allowance',
          'Built for heavy upload and backup workloads',
          '24/7 priority support',
          'Publicly routable IP available',
        ],
      },
    ],
  },
];

/* ==========================================================================
 * 7. HARDWARE
 * ========================================================================== */

export const HARDWARE: HardwareItem[] = [
  {
    id: 'standard',
    name: 'Starlink Standard Kit',
    price: 349,
    summary:
      'The everyday home dish. Ships with the dish, a Wi-Fi router, a 50 ft cable and a base for ground or balcony placement.',
    specs: [
      'Rectangular dish with built-in snow melt',
      'Wi-Fi router included in the box',
      'Rated for wind, rain, sleet and snow',
      'Guided self-install through the Starlink app',
    ],
    bestFor: 'Residential plans',
    image: {
      src: '/images/hardware-standard.jpg',
      alt: 'A Starlink Standard dish on its tripod base on a back lawn behind a house.',
    },
  },
  {
    id: 'mini',
    name: 'Starlink Mini Kit',
    price: 249,
    summary:
      'A backpack-sized dish with the router built into the unit. Made for travel, camping and anywhere power is limited.',
    specs: [
      'Integrated Wi-Fi router in the dish',
      'Fits in a backpack — under 3 lbs',
      'Low power draw for battery setups',
      'Kickstand built into the body',
    ],
    bestFor: 'Roam plans',
    image: {
      src: '/images/hardware-mini.jpg',
      alt: 'The compact Starlink Mini dish resting on a rock beside a hiking trail.',
    },
  },
  {
    id: 'high-performance',
    name: 'Flat High Performance Kit',
    price: 2500,
    summary:
      'The commercial dish. A wider field of view and stronger all-weather performance for demanding sites and in-motion use.',
    specs: [
      'Wider field of view than the Standard dish',
      'Better performance in extreme heat and cold',
      'Enhanced GPS and in-motion capability',
      'Permanent-mount design for fixed sites',
    ],
    bestFor: 'Business plans',
    image: {
      src: '/images/hardware-high-performance.jpg',
      alt: 'A pole-mounted satellite dish on the exterior of a commercial building.',
    },
  },
];

/* ==========================================================================
 * 8. HOW IT WORKS  (scroll-scrubbed assembly steps)
 * ========================================================================== */

export const SETUP_STEPS = [
  {
    id: 'unbox',
    index: '01',
    title: 'Unpack the kit',
    body: 'Each kit ships complete with the dish, base, router and cable. There is no separate equipment order to place and no technician appointment to schedule.',
    image: {
      src: '/images/setup-step-1.jpg',
      alt: 'An opened Starlink box on a rug with the dish, router, base and cable laid out.',
    },
  },
  {
    id: 'place',
    index: '02',
    title: 'Choose a location',
    body: 'The dish requires a clear, unobstructed view of the sky. The Starlink app scans a prospective spot with your phone camera and identifies trees or rooflines that would interrupt the signal.',
    image: {
      src: '/images/setup-step-2.jpg',
      alt: 'Two people standing in a garden holding up a phone to check the view of the sky.',
    },
  },
  {
    id: 'connect',
    index: '03',
    title: 'Connect the hardware',
    body: 'Run the cable from the dish to the router and connect power. The dish levels itself and aligns automatically with the satellite constellation.',
    image: {
      src: '/images/setup-step-3.jpg',
      alt: 'Hands connecting a cable to a Starlink router on a wooden shelf beside books.',
    },
  },
  {
    id: 'online',
    index: '04',
    title: 'Get online',
    body: 'Join the network from the Starlink app and your service is active across every device in the property.',
    image: {
      src: '/images/setup-step-4.jpg',
      alt: 'A family sitting together on a sofa at home using a laptop and a tablet.',
    },
  },
] as const;

/* ==========================================================================
 * 9. FAQ
 * ========================================================================== */

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-install',
    question: 'Do I need a professional installer?',
    answer:
      'No. Starlink is designed to be self-installed. The kit ships with everything you need, the dish aims itself once it has power, and the Starlink app walks you through choosing a spot with a clear view of the sky.',
  },
  {
    id: 'faq-hardware-cost',
    question: 'Is the hardware included in the monthly price?',
    answer:
      'The hardware is a separate one-time purchase. The Standard Kit is $349, the Starlink Mini is $249, and the Flat High Performance Kit for business use is $2,500. Your monthly plan price covers service only.',
  },
  {
    id: 'faq-weather',
    question: 'Does weather affect the connection?',
    answer:
      'The dish is built for the outdoors and is rated for rain, wind, sleet and snow. The Standard dish has a snow melt function that clears accumulation on its own. Very heavy storms can briefly reduce speeds, and service returns to normal once the weather passes.',
  },
  {
    id: 'faq-obstructions',
    question: 'What if trees block part of my sky view?',
    answer:
      'Obstructions cause brief dropouts when a satellite passes behind them. The Starlink app scans your sky with your phone camera and shows exactly where the blockages are, so you can pick a clearer spot or raise the dish on a mount.',
  },
  {
    id: 'faq-speed',
    question: 'What speeds and latency should I expect?',
    answer:
      'Speeds depend on the plan tier you choose, from 100 Mbps up to the 200-400 Mbps range on Residential Max. Latency typically runs 25-60 ms, which is low enough for video calls, live streaming and online gaming.',
  },
  {
    id: 'faq-data-cap',
    question: 'Is there a data cap?',
    answer:
      'Residential plans include unlimited data with no overage charges. Roam plans include a set allowance of high-speed mobile data each month — after that, service continues at reduced speeds rather than stopping. Roam Unlimited has no allowance to track.',
  },
  {
    id: 'faq-contract',
    question: 'Am I locked into a contract?',
    answer:
      'No. Service is month to month. You can change your plan tier, pause Roam service between trips, or cancel at any time without an early termination fee.',
  },
  {
    id: 'faq-move',
    question: 'Can I take the service with me if I move?',
    answer:
      'Yes. Residential service is tied to your service address and can be updated when you move, subject to capacity in the new area. Roam plans are portable by design and work anywhere on land within your service region.',
  },
];

/* ==========================================================================
 * 10. FOOTER
 * ========================================================================== */

export const FOOTER_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Starlink Residential', href: '#plans' },
      { label: 'Starlink Roam', href: '#plans' },
      { label: 'Starlink Business', href: '#plans' },
      { label: 'Hardware', href: '#hardware' },
      { label: 'Check availability', href: '#hero' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Plan comparison', href: '#fine-print' },
      { label: 'All FAQs', href: '#faq' },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'TCPA Consent', href: '/tcpa' },
  { label: 'Cookie Policy', href: '/cookies' },
] as const;

export const FOOTER_LEGAL = {
  retailerDisclosure: `This site is operated by an independent authorized retailer of ${SITE.carrier}. ${SITE.carrier} and the ${SITE.carrier} logo are trademarks of Space Exploration Technologies Corp. This site is not operated by Space Exploration Technologies Corp.`,
  compensation: `The retailer operating this site receives compensation for orders placed through it.`,
  pricingNote:
    'Monthly service pricing excludes hardware, shipping, taxes and applicable fees. Plan availability, speeds and pricing vary by service address and are confirmed at the time of order. Speeds listed are maximum tier speeds; actual speeds vary with location, network conditions and obstructions.',
} as const;

/* ==========================================================================
 * 11. DERIVED HELPERS  -  used by components so layout files stay data-free
 * ========================================================================== */

/** All plans, flattened, in render order. */
export const ALL_PLANS: PlanItem[] = PLAN_GROUPS.flatMap((g) => g.plans);

/** Look a plan up by id. */
export function getPlanById(id: string): PlanItem | undefined {
  return ALL_PLANS.find((p) => p.id === id);
}

/** The plan that anchors the hero price lockup. */
export const LEAD_PLAN: PlanItem = getPlanById(HERO.leadPlanId) ?? ALL_PLANS[0];

/** Groups belonging to one service line. */
export function getGroupsForLine(line: ServiceLine): PlanGroup[] {
  return PLAN_GROUPS.filter((g) => g.serviceLine === line);
}

/**
 * Service lines that actually have plans, in canonical order.
 * Lines Starlink does not sell return nothing and are never rendered.
 */
export function getActiveServiceLines(): {
  line: ServiceLine;
  groups: PlanGroup[];
}[] {
  return SERVICE_LINE_ORDER.map((line) => ({
    line,
    groups: getGroupsForLine(line),
  })).filter((entry) => entry.groups.length > 0);
}

/**
 * The only two CTA strings used anywhere outside the header and footer.
 * Header and footer intentionally show the raw phone number instead.
 */
export const CTA_LABELS = {
  order: 'Call to order',
  pricing: 'Call for pricing',
} as const;

/** CTA label rule: priced plans say "Call to order", unpriced say "Call for pricing". */
export function planCtaLabel(plan: PlanItem): string {
  return typeof plan.price === 'number' ? CTA_LABELS.order : CTA_LABELS.pricing;
}

/** Renders a plan's speed pair for tables, e.g. "100 Mbps down / 20 Mbps up". */
export function formatSpeedPair(plan: PlanItem): string {
  const down = formatSpeed(plan.speedDown);
  const up = formatSpeed(plan.speedUp);
  if (down && up) return `${down} down / ${up} up`;
  if (down) return `${down} down`;
  if (up) return `${up} up`;
  return '—';
}

/** Renders a plan's monthly price for tables, e.g. "$55/mo". */
export function formatMonthly(plan: PlanItem): string {
  if (typeof plan.price !== 'number') return CTA_LABELS.pricing;
  return `$${plan.price}${plan.cents ? `.${plan.cents}` : ''}/mo`;
}

/** Lowest monthly price across every plan on the site. */
export function getStartingPrice(): number | undefined {
  const priced = ALL_PLANS.map((p) => p.price).filter(
    (p): p is number => typeof p === 'number',
  );
  return priced.length ? Math.min(...priced) : undefined;
}

/** Formats a speed value for display, e.g. 100 -> "100 Mbps". */
export function formatSpeed(mbps?: number): string | undefined {
  return typeof mbps === 'number' ? `${mbps} Mbps` : undefined;
}
