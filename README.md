# Starlink Authorized Retailer

A one-page landing site for an independent authorized retailer of Starlink
satellite internet. Built with Next.js 16 (App Router), React 19, TypeScript
and Tailwind CSS 4.

The whole page is statically prerendered — there is no backend, no database
and no API routes.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm start   # production build
npx tsc --noEmit             # typecheck
npx eslint app components lib
```

---

## Architecture: one file controls the content

**`lib/content.ts` is the single source of truth.** Every price, plan name,
speed, hardware cost, phone number, section heading, FAQ entry and legal
string on the site is read from it. No `.tsx` file contains a hard-coded
price, plan name, speed, phone number or CTA string.

To change pricing when Starlink changes theirs, edit that file and nothing
else. One price edit propagates to six places: the hero lockup and its
screen-reader string, the plan card and its screen-reader string, the desktop
comparison table row, and the mobile comparison card.

### Things worth knowing

**Service lines are structural.** `SERVICE_LINE_ORDER` lists every category in
render order; `getActiveServiceLines()` filters out any line with no plans. As
Starlink sells satellite internet only, fiber/cable/bundles/TV/mobile/phone
render *nothing* — not an empty placeholder. Adding plans for a new line to
`lib/content.ts` would make that line appear in the correct position with no
JSX edit.

**One price component.** Everything renders through `<PriceLockup plan={…} />`,
which exposes a clean `sr-only` sentence instead of letting assistive tech read
the price as disconnected fragments.

**One phone constant.** Every `tel:` link derives from `SITE.phoneHref` and
carries a `data-call-cta` attribute, so call tracking binds to one selector.

**Plan group imagery** is switched by `imageTreatment: 'banner' | 'backdrop'`
on each group. Only one group should use `'backdrop'`.

---

## Images

Served files live in `public/images`. Full-resolution originals live in
`design/source-images/`, which is **gitignored and never deployed**.

After replacing an original:

```bash
python scripts/optimize-images.py
```

That crops each source to the exact dimensions the layout expects (no
distortion, per-image anchor) and writes optimised progressive JPEGs. The
originals are ~9 MB PNGs each; the served set is ~5 MB total.

**Art direction:** phone viewports are far taller than these landscape frames,
so `object-cover` would crop the subject out. Images with a `mobileSrc` in
`IMAGES` serve a portrait crop below the `sm` breakpoint via
`<BackdropImage>`. The unused variant is given a 1px `sizes` slot so it
resolves to the smallest entry in the srcset (~1 KB) rather than downloading
twice.

---

## Responsive behaviour

- No horizontal overflow at any width down to **320px**
- All interactive targets are **≥44px** on touch viewports
- `backdrop-filter` is applied from `sm` up only — it is expensive on mobile
  GPUs and the cards are opaque on phones instead
- Tilt, magnetic-hover and Lenis smooth scrolling are disabled for coarse
  pointers and for `prefers-reduced-motion`; every decorative animation
  collapses under that media query

---

## Deploying to Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected). No env vars required.
3. Deploy.

Build command, output directory and install command are all defaults. Nothing
in the app needs a server runtime beyond Next's own image optimizer.

---

## Before going live

These are placeholders and **must** be replaced:

| Where | What |
|---|---|
| `SITE.legalEntity` | Your real registered company name. The footer disclosure needs a named entity to do its job. |
| `SITE.phoneDisplay` / `phoneHref` | Real sales number |
| `SITE.address`, `SITE.email`, `SITE.hours` | Real contact details |
| `SITE.siteUrl` | Production domain (resolves OG image URLs) |
| `/privacy`, `/terms`, `/disclaimer`, `/tcpa`, `/cookies` | Linked in the footer but **not built yet — they will 404** |

**Verify pricing before launch.** starlink.com renders pricing client-side and
blocks automated fetching, so the figures in `lib/content.ts` were
cross-referenced from independent trackers rather than read off the official
site. Confirm them against your retailer portal.

**Known image issues:** `hardware-high-performance.jpg` and
`plan-business.jpg` show round parabolic dishes; Starlink's Flat High
Performance unit is a large flat rectangle. Several photographs are also shot
in South Asian settings while the site targets the US. See `ai.wing`.

---

## Change log

`ai.wing` records every AI-made change to this project — what changed, which
files, why, and how to revert it.
