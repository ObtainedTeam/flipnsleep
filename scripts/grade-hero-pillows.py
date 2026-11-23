# Kleurcorrectie van de kussenfoto (geen retouche): contrast licht omhoog, blauw van de
# stiksels verzadigder, en een milde lokale contrastslag zodat het achterste kussen scherper oogt.
import sys, numpy as np
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGBA'); a = im.getchannel('A')
rgb = np.asarray(im.convert('RGB')).astype(np.float32) / 255
# 1. contrast: zachte S-curve rond de lichte middentonen (wit blijft wit, schaduwen iets dieper)
def curve(x, k=0.16, mid=0.74):
    return np.clip(x + k * (x - mid) * (1 - np.abs(2 * x - 1) ** 2) * 1.0, 0, 1)
lum = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
lum2 = curve(lum); rgb = np.clip(rgb * (lum2 / np.maximum(lum, 1e-4))[..., None], 0, 1)
# 2. blauw verzadigen (alleen blauwe tinten: de stiksels en het blauwe weefsel)
mx, mn = rgb.max(-1), rgb.min(-1); sat = (mx - mn) / np.maximum(mx, 1e-4)
blue = (rgb[..., 2] >= rgb[..., 0] + 0.012) & (rgb[..., 2] >= rgb[..., 1] - 0.004)
w = np.clip((sat - 0.055) / 0.07, 0, 1) * blue   # alleen echt blauwe pixels, wit blijft ongemoeid
gray = lum2[..., None]
rgb = np.clip(gray + (rgb - gray) * (1 + 1.1 * w[..., None]), 0, 1)
rgb = rgb * (1 - 0.05 * w[..., None])           # blauw een fractie donkerder: beter leesbaar op wit
res = Image.fromarray((rgb * 255 + .5).astype(np.uint8), 'RGB')
# 3. milde lokale contrastslag (unsharp, grote straal + kleine straal)
res = res.filter(ImageFilter.UnsharpMask(radius=8, percent=20, threshold=0)).filter(ImageFilter.UnsharpMask(radius=1.3, percent=38, threshold=5))
res.putalpha(a); res.save(out)
