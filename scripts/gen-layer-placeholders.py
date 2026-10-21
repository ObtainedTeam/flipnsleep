"""Placeholder layer images for the Look inside section (1600x1200, transparent webp).
Every layer is centered on the canvas with the same footprint (~70% width), so
Higgsfield renders with the same framing can be swapped in by file name."""
import math, random
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import numpy as np

SRC = '/home/claude/flipnsleep/public/images/'
OUT = '/home/claude/flipnsleep/public/images/layers/'
CW, CH = 1600, 1200
cx, cy = CW // 2, CH // 2
BW = 1120            # bottom edge width (70%)
TW = 940             # top edge width (perspective)
PH = 205             # projected depth of the panel
random.seed(7)


def quad(cy_=cy):
    """Corners of the top face (tl, tr, br, bl) centered on cy_."""
    t, b = cy_ - PH / 2, cy_ + PH / 2
    return [(cx - TW / 2, t), (cx + TW / 2, t), (cx + BW / 2, b), (cx - BW / 2, b)]


def coeffs(dst, src):
    m = []
    for (x, y), (u, v) in zip(dst, src):
        m.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        m.append([0, 0, 0, x, y, 1, -v * x, -v * y])
    A = np.array(m, float); B = np.array(src, float).reshape(8)
    return np.linalg.solve(A, B).tolist()


def warp(tex, q):
    w, h = tex.size
    src = [(0, 0), (w, 0), (w, h), (0, h)]
    return tex.transform((CW, CH), Image.PERSPECTIVE, coeffs(q, src), Image.BICUBIC)


def trim(im):
    return im.crop(im.getbbox())


def slab(tex, thick=18, edge=(214, 226, 240)):
    """Warp a flat texture onto the panel quad and add a thin side edge + soft shadow."""
    q = quad()
    canvas = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
    top = warp(tex, q)
    a = top.split()[3]
    # side edge: the top face's alpha shifted down, darkened
    side = Image.new('RGBA', (CW, CH), edge + (255,))
    side_a = Image.new('L', (CW, CH), 0)
    for d in range(1, thick + 1):
        side_a = ImageChops.lighter(side_a, ImageChops.offset(a, 0, d))
    side.putalpha(side_a)
    # contact shadow
    sh = Image.new('RGBA', (CW, CH), (32, 27, 93, 0))
    sa = ImageChops.offset(a, 0, thick + 22).filter(ImageFilter.GaussianBlur(26)).point(lambda v: int(v * .22))
    sh.putalpha(sa)
    canvas.alpha_composite(sh); canvas.alpha_composite(side); canvas.alpha_composite(top)
    return canvas


def cover_tex(name):
    im = trim(Image.open(SRC + name).convert('RGBA'))
    return im.resize((1200, 790), Image.LANCZOS)


def rounded_mask(size, r):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], r, fill=255)
    return m


def mesh_tex():
    w, h = 1200, 790
    S = 2
    im = Image.new('RGBA', (w * S, h * S), (255, 255, 255, 0))
    base = Image.new('RGBA', im.size, (250, 252, 255, 160))
    d = ImageDraw.Draw(base)
    step = 14 * S
    for x in range(-h * S, w * S, step):
        d.line([(x, 0), (x + h * S, h * S)], fill=(150, 175, 205, 150), width=S)
        d.line([(x + h * S, 0), (x, h * S)], fill=(150, 175, 205, 150), width=S)
    # piping + zipper line
    d.rounded_rectangle([3 * S, 3 * S, (w - 3) * S, (h - 3) * S], 60 * S, outline=(205, 215, 230, 255), width=6 * S)
    im = base
    im.putalpha(ImageChops.multiply(im.split()[3], rounded_mask(im.size, 60 * S)))
    return im.resize((w, h), Image.LANCZOS)


def foam():
    """Procedural mound of irregular light-blue chunks inside the panel footprint."""
    S = 2
    big = Image.new('RGBA', (CW * S, CH * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(big)
    q = quad()
    pal = [(120, 196, 236), (150, 212, 244), (98, 180, 228), (176, 224, 248), (84, 168, 222), (200, 234, 250)]
    pts = []
    for _ in range(1700):
        u, v = random.random(), random.random()
        # bilinear point on the top face
        top = (q[0][0] + (q[1][0] - q[0][0]) * u, q[0][1])
        bot = (q[3][0] + (q[2][0] - q[3][0]) * u, q[3][1])
        x = top[0] + (bot[0] - top[0]) * v
        y = top[1] + (bot[1] - top[1]) * v
        # mound: lift points near the center
        du, dv = (u - .5) * 2, (v - .5) * 2
        r = du * du + dv * dv
        if r > 1.02: continue
        lift = 80 * max(0, 1 - r) ** .8
        pts.append((y, x, y - lift))
    pts.sort()  # draw back to front
    for _, x, y in pts:
        n = random.randint(5, 8); rad = random.uniform(16, 34)
        ang0 = random.random() * math.tau
        poly = []
        for k in range(n):
            a = ang0 + k * math.tau / n + random.uniform(-.3, .3)
            rr = rad * random.uniform(.6, 1.15)
            poly.append(((x + math.cos(a) * rr * 1.25) * S, (y + math.sin(a) * rr * .8) * S))
        col = random.choice(pal)
        d.polygon(poly, fill=col + (255,), outline=tuple(max(0, v - 30) for v in col) + (255,))
        # small highlight
        hx, hy = poly[0]
        d.ellipse([hx - 3 * S, hy - 2 * S, hx + 3 * S, hy + 2 * S], fill=(235, 248, 255, 200))
    im = big.resize((CW, CH), Image.LANCZOS)
    a = im.split()[3]
    sh = Image.new('RGBA', (CW, CH), (32, 27, 93, 0))
    sh.putalpha(ImageChops.offset(a, 0, 30).filter(ImageFilter.GaussianBlur(26)).point(lambda v: int(v * .2)))
    out = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
    out.alpha_composite(sh); out.alpha_composite(im)
    return out


def closed():
    im = trim(Image.open(SRC + 'pillow-cover-front.webp').convert('RGBA'))
    w = BW
    im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    out = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
    out.alpha_composite(im, (cx - w // 2, cy - im.height // 2))
    return out


def save(im, name):
    im.save(OUT + name + '.webp', 'WEBP', quality=86, method=6)


import os
os.makedirs(OUT, exist_ok=True)
layers = [
    ('layer-1-cool-cover', slab(cover_tex('pillow-cover-front.webp'), 20)),
    ('layer-2-inner-top', slab(mesh_tex(), 6, (226, 234, 244))),
    ('layer-3-foam', foam()),
    ('layer-4-inner-bottom', slab(mesh_tex(), 6, (226, 234, 244))),
    ('layer-5-bamboo-cover', slab(cover_tex('pillow-cover-back.webp'), 20, (222, 222, 226))),
]
for n, im in layers: save(im, n)
save(closed(), 'layer-0-closed')

# Exploded overview: same offsets the component uses at full explode (GAP = 16.5% of height)
GAP = int(CH * .165)
ex = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
for i in range(4, -1, -1):
    ex.alpha_composite(ImageChops.offset(layers[i][1], 0, int((i - 2) * GAP)))
save(ex, 'layer-exploded')
print('ok')
