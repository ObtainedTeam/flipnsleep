"""Maakt kleinere webp-varianten (-480, -960) van grote afbeeldingen in
public/images, voor srcset. Schrijft src/data/variants.js met de lijst.
Opnieuw draaien na het toevoegen van nieuwe foto's: python3 scripts/gen-variants.py"""
import pathlib, json
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMGDIR = ROOT / 'public' / 'images'
WIDTHS = (480, 960)
done = []
for f in sorted(IMGDIR.iterdir()):
    if f.suffix.lower() not in ('.webp', '.jpg', '.jpeg', '.png') or any(f.stem.endswith(f'-{w}') for w in WIDTHS):
        continue
    if f.stem.startswith('logo') or f.stem == 'hero-poster-720':
        continue
    im = Image.open(f)
    if im.width < 1100:
        continue
    keep_alpha = im.mode in ('RGBA', 'LA', 'P')
    im = im.convert('RGBA' if keep_alpha else 'RGB')
    for w in WIDTHS:
        out = IMGDIR / f'{f.stem}-{w}.webp'
        if not out.exists():
            im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(out, 'WEBP', quality=78, method=6)
    done.append(f'/images/{f.name}')
(ROOT / 'src' / 'data' / 'variants.js').write_text(
    '// Gegenereerd door scripts/gen-variants.py: afbeeldingen met -480/-960 webp-varianten.\n'
    f'export const VARIANTS = new Set({json.dumps(done, indent=2)});\n')
print(len(done), 'afbeeldingen')
