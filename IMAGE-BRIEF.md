# Image Brief — 12 images

## How this works

1. Generate each image with the prompt below.
2. Save it with the **exact filename** shown.
3. Drop it into `public/images/` (placeholders are already there — just
   overwrite them).
4. Done. No code change needed — paths are wired in `lib/content.ts`.

Save everything as **.jpg**, quality ~85, sRGB. Keep the stated dimensions so
nothing gets letterboxed or cropped oddly.

---

## Making them look real, not AI-generated

Append this to **every** prompt:

> Shot on a Canon EOS R5 with a 35mm f/1.8 lens, natural available light,
> realistic depth of field, subtle film grain, slightly imperfect candid
> framing, documentary editorial photography. Ordinary lived-in details.
> Not CGI, not a 3D render, not illustrated. No over-sharpening, no HDR halos,
> no glow, no lens flare, no oversaturated colour, no perfect symmetry,
> no stock-photo smiles.

**Why:** the "AI look" comes mostly from over-sharpening, impossible lighting,
excessive symmetry and plastic skin. Naming a real camera and lens, asking for
available light and allowing imperfection removes most of it.

**Two things to watch:**

- **Dish accuracy.** Image models render the Starlink dish wrong often —
  wrong shape, fake logos, parabolic satellite-TV dishes. The real Standard
  dish is a **flat rectangle with rounded corners, off-white/light grey, on a
  small dark grey kickstand**, with a thin dark cable. Regenerate if you get a
  curved TV-style dish. It is better to have the dish small or partly out of
  frame than visibly wrong.
- **Where possible, use official Starlink retailer media assets** for the three
  hardware product shots instead of generating them. Authorized retailers
  normally get a brand asset pack, and real product photography will always
  beat a generated approximation for hardware. Use generated images for the
  lifestyle/context shots.

---

## 1. Hero background — `hero-background.jpg`

**Size:** 2400 × 1350 (16:9)
**Where:** full-bleed background of the hero section.

⚠️ **Composition matters here.** The headline, price and ZIP box sit over the
**left half**, which is darkened by a scrim. Keep the left third visually
quiet — sky, field, wall — and put the subject on the **right**.

> A real single-storey rural American home at blue hour, photographed from the
> front garden. A flat rectangular white Starlink dish on a small kickstand is
> mounted at the right edge of the roofline, cable running down the wall.
> Warm interior lights glow in the windows. Open sky and a treeline fill the
> left of the frame. Overcast-to-clear transitional sky, cool ambient light,
> no direct sun.

**Alternatives if that one doesn't land:** a farmhouse at dusk with fields
behind it, or a mountain cabin with the dish on a pole mount in the yard.

---

## 2. Plan banners — 1600 × 500 each

Wide, short banners above each plan group. A left-to-right dark scrim covers
roughly the left half, so again **keep the subject on the right**.

### `plan-residential.jpg`
> A two-storey suburban family house on a quiet street in late afternoon, seen
> from across the road. A flat rectangular white Starlink dish sits on the roof
> near the right edge of the frame. Parked car in the driveway, basketball hoop,
> ordinary garden. Soft low sun.

### `plan-roam.jpg`
> A camper van parked at a remote lakeside pull-off in the late afternoon. A
> small square white Starlink Mini dish sits on a folding camp table beside the
> van with its kickstand out, a thin cable running to the van's side door. Camp
> chairs, a cooler, boots by the step. Mountains across the water.

### `plan-business.jpg`
> The flat roof of a small commercial building on an industrial estate, morning
> light. A large flat white Starlink High Performance dish is bolted to a
> permanent pole mount at the right of frame, conduit running along the roof
> deck. HVAC units and roof vents nearby. Plain overcast sky.

---

## 3. Hardware — 1200 × 900 each (4:3)

Product-in-context shots. Clean but not floating-in-a-void studio renders —
the card already has a dark background behind them.

### `hardware-standard.jpg`
> A flat rectangular off-white Starlink dish standing on its dark grey kickstand
> base on a mown back lawn, photographed at eye level from a few feet away. A
> thin black cable runs from the base out of frame toward the house, which is
> softly out of focus behind. Late afternoon side light, shallow depth of field.

### `hardware-mini.jpg`
> A small square white Starlink Mini dish, roughly the size of a laptop,
> resting on a flat rock beside a hiking trail with its integrated kickstand
> extended. A short cable coils beside it next to a battery pack. Dry grass and
> a backpack slightly out of focus behind. Soft morning light.

### `hardware-high-performance.jpg`
> A large flat white Starlink High Performance dish on a heavy permanent pole
> mount, bolted to the parapet of a commercial building. Weatherproof conduit
> and a grounding wire run from its base. Photographed from slightly below
> against a plain grey overcast sky. Visible weathering on the mount.

---

## 4. Setup steps — 1200 × 900 each (4:3)

These carry the "anyone can do this" message, so they need to feel like real
people in real homes, not a polished commercial. Hands and partial figures work
better than posed faces.

### `setup-step-1.jpg` — Unpack the kit
> An opened cardboard Starlink box on a living room floor with the contents laid
> out on the rug beside it: a flat white rectangular dish, a white router, a
> coiled black cable and a dark kickstand base. A person's hands lift the dish
> from the packaging, seen from above. Ordinary home flooring, warm daylight
> from a window off to the side.

### `setup-step-2.jpg` — Choose a location
> A person standing in their back garden holding a smartphone up toward the sky
> at arm's length, seen from behind over their shoulder. The garden, fence and
> a few tall trees are visible ahead of them. Overcast afternoon, flat soft
> light. Their face is not visible.

### `setup-step-3.jpg` — Connect the hardware
> Close-up of hands plugging a cable into a white Starlink router sitting on a
> wooden shelf beside some books. The cable runs down and away toward a window.
> A small status light glows on the router. Shallow depth of field, warm indoor
> lamp light mixed with daylight.

### `setup-step-4.jpg` — Get online
> A family of three on a sofa in an ordinary living room in the evening, a
> laptop open on one person's knees and a tablet held by another. Relaxed,
> unposed, mid-conversation, nobody looking at the camera. Warm lamp light,
> slightly messy room, a throw blanket over the sofa arm.

---

## 5. Social share card — `og-image.jpg`

**Size:** 1200 × 630
**Where:** link previews on WhatsApp, iMessage, LinkedIn, X.

> A rural home at dusk with a flat rectangular white Starlink dish on the
> roofline, wide landscape framing, deep blue evening sky with the last light
> low on the horizon. Composed with clear open space across the upper left.

Leave the upper-left clear — some platforms overlay a title there.

---

## Checklist

| # | Filename | Size |
|---|---|---|
| 1 | `hero-background.jpg` | 2400 × 1350 |
| 2 | `plan-residential.jpg` | 1600 × 500 |
| 3 | `plan-roam.jpg` | 1600 × 500 |
| 4 | `plan-business.jpg` | 1600 × 500 |
| 5 | `hardware-standard.jpg` | 1200 × 900 |
| 6 | `hardware-mini.jpg` | 1200 × 900 |
| 7 | `hardware-high-performance.jpg` | 1200 × 900 |
| 8 | `setup-step-1.jpg` | 1200 × 900 |
| 9 | `setup-step-2.jpg` | 1200 × 900 |
| 10 | `setup-step-3.jpg` | 1200 × 900 |
| 11 | `setup-step-4.jpg` | 1200 × 900 |
| 12 | `og-image.jpg` | 1200 × 630 |

**Priority if you want to do these in batches:** #1 first (it is the LCP image
and the biggest visual change), then #8–11 (the setup steps), then #5–7, then
#2–4, then #12.
