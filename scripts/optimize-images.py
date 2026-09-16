# -*- coding: utf-8 -*-
"""
Convert the full-resolution source PNGs in design/source-images into
optimised JPEGs in public/images, at the exact dimensions the layout expects.

Run after replacing any original:  python scripts/optimize-images.py

Crops never distort - the source is cropped to the target aspect ratio and
then resized. `ax` / `ay` anchor that crop (0.0 = left/top, 0.5 = centre,
1.0 = right/bottom), which matters for the portrait mobile crops where a
centred cut would slice the subject out of frame.
"""
import os
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

SRC = os.path.join('public', 'images')
ORIGINALS = os.path.join('design', 'source-images')

# out stem, W, H, ay, source stem (None = same), ax
SPECS = [
    ('hero-background',           2400, 1350, 0.50, None, 0.50),
    # Portrait crop for phones. A phone hero is roughly 0.4:1, so the
    # landscape frame would be cropped to ~22% of its width and the house
    # would vanish. ax=0.62 keeps the house and dish in frame.
    ('hero-background-mobile',    1200, 1500, 0.50, 'hero-background', 0.62),
    ('og-image',                  1200,  630, 0.45, None, 0.50),
    ('faq-background',            2400, 1400, 0.50, 'og-image', 0.50),
    ('faq-background-mobile',     1200, 1600, 0.50, 'og-image', 0.58),
    ('how-it-works-background',   2400, 1400, 0.50, 'plan-roam', 0.50),
    ('how-it-works-background-mobile', 1200, 1600, 0.50, 'plan-roam', 0.55),
    # Plan-group artwork. Used as a full-block backdrop when the group sets
    # imageTreatment: 'backdrop', otherwise as a banner strip (object-cover
    # crops the same file down to the strip).
    ('plan-residential',          2000, 1250, 0.45, None, 0.50),
    ('plan-residential-mobile',   1200, 1600, 0.45, 'plan-residential', 0.55),
    ('plan-roam',                 2000, 1250, 0.50, None, 0.50),
    ('plan-business',             2000, 1250, 0.40, None, 0.50),
    ('hardware-standard',         1200,  900, 0.50, None, 0.50),
    ('hardware-mini',             1200,  900, 0.50, None, 0.50),
    ('hardware-high-performance', 1200,  900, 0.45, None, 0.50),
    ('setup-step-1',              1200,  900, 0.50, None, 0.50),
    ('setup-step-2',              1200,  900, 0.50, None, 0.50),
    ('setup-step-3',              1200,  900, 0.50, None, 0.50),
    ('setup-step-4',              1200,  900, 0.50, None, 0.50),
]


def cover_crop(im, target_w, target_h, ay=0.5, ax=0.5):
    """Crop to the target aspect ratio without distorting, then resize."""
    src_w, src_h = im.size
    target_ratio = target_w / target_h

    if src_w / src_h > target_ratio:
        # Source is wider than the target: trim the sides.
        new_w = int(round(src_h * target_ratio))
        left = int(round((src_w - new_w) * ax))
        left = max(0, min(left, src_w - new_w))
        box = (left, 0, left + new_w, src_h)
    else:
        # Source is taller: trim top and bottom.
        new_h = int(round(src_w / target_ratio))
        top = int(round((src_h - new_h) * ay))
        top = max(0, min(top, src_h - new_h))
        box = (0, top, src_w, top + new_h)

    return im.crop(box).resize((target_w, target_h), Image.LANCZOS)


def load(stem):
    path = os.path.join(ORIGINALS, stem + '.png')
    if not os.path.exists(path):
        return None
    im = Image.open(path)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, (5, 5, 7))
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert('RGB')


rows = []
total = 0

for stem, w, h, ay, src_stem, ax in SPECS:
    im = load(src_stem or stem)
    if im is None:
        print('MISSING source for ' + stem)
        continue

    out_path = os.path.join(SRC, stem + '.jpg')
    cover_crop(im, w, h, ay, ax).save(
        out_path, 'JPEG', quality=82, optimize=True, progressive=True)

    size = os.path.getsize(out_path)
    total += size
    rows.append((stem, size, w, h))

print('{:<34} {:>9} {:>12}'.format('image', 'jpg', 'output'))
print('-' * 58)
for stem, size, w, h in rows:
    print('{:<34} {:>6.0f}KB {:>12}'.format(
        stem, size / 1024, '{}x{}'.format(w, h)))
print('-' * 58)
print('{} files, {:.1f} MB total'.format(len(rows), total / 1048576))
