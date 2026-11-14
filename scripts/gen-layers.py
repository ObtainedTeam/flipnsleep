# Builds the LookInside images for the site from the approved renders: crops each to its object, writes a 1200 px
# WebP plus a 640 px variant under public/images/layers/, and prints the geometry the component needs.
import sys, json, io
from PIL import Image
import numpy as np
SRC, OUT = sys.argv[1], sys.argv[2]
ITEMS = [
    ('layer-0-closed', 'hf3/C1b.png', 0),
    ('layer-1-cool-cover', 'hf3/L1.png', -560),
    ('layer-2-inner-top', 'hf2/L2.png', -270),
    ('layer-3-foam', 'hf2/L3.png', 20),
    ('layer-4-inner-bottom', 'hf2/L4.png', 320),
    ('layer-5-bamboo-cover', 'hf3/L5.png', 585),
    ('layer-section', 'hf4/X.png', 0),
]
geo = {}
crops = {}
for name, f, off in ITEMS:
    im = Image.open(f'{SRC}/{f}').convert('RGBA')
    a = np.asarray(im)[:, :, 3]
    ys, xs = np.where(a > 10)
    box = (max(0, int(xs.min()) - 4), max(0, int(ys.min()) - 4), min(im.width, int(xs.max()) + 5), min(im.height, int(ys.max()) + 5))
    c = im.crop(box)
    crops[name] = (c, off)
    for w, suffix in ((1200, ''), (640, '-640')):
        h = round(c.height * w / c.width)
        c.resize((w, h), Image.LANCZOS).save(f'{OUT}/{name}{suffix}.webp', 'WEBP', quality=82, method=6)
    geo[name] = {'w': 1200, 'h': round(c.height * 1200 / c.width), 'fw': box[2] - box[0], 'off': off}
# the whole stack in one picture, for reduced motion: the layers at their exploded places, bottom first
FW, FH = 2400, 2060
stack = Image.new('RGBA', (FW, FH), (0, 0, 0, 0))
for name in ['layer-5-bamboo-cover', 'layer-4-inner-bottom', 'layer-3-foam', 'layer-2-inner-top', 'layer-1-cool-cover']:
    c, off = crops[name]
    stack.alpha_composite(c, (FW // 2 - c.width // 2, FH // 2 + off - c.height // 2))
for w, suffix in ((1200, ''), (640, '-640')):
    stack.resize((w, round(FH * w / FW)), Image.LANCZOS).save(f'{OUT}/layer-exploded{suffix}.webp', 'WEBP', quality=82, method=6)
geo['layer-exploded'] = {'w': 1200, 'h': round(FH * 1200 / FW)}
print(json.dumps(geo, indent=1))
