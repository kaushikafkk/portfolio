import os, glob
from PIL import Image, ImageFilter, ImageDraw, ImageChops

ROOT = "/home/claude/mks-portfolio/public/assets"
SRC = "/home/claude/extract/MKS_Portfolio_Assets_COMPLETE"

# ---------------------------------------------------------------- 1. optimise
converted = []
for p in glob.glob(os.path.join(ROOT, "**", "*.png"), recursive=True) + \
         glob.glob(os.path.join(ROOT, "**", "*.jpg"), recursive=True):
    if os.path.getsize(p) < 400_000:
        continue
    im = Image.open(p)
    has_alpha = im.mode in ("RGBA", "LA") and im.getchannel("A").getextrema()[0] < 255
    im = im.convert("RGBA" if has_alpha else "RGB")
    im.thumbnail((1600, 1600), Image.LANCZOS)
    if has_alpha:
        im.save(p, optimize=True)
        converted.append((p, p))
    else:
        out = os.path.splitext(p)[0] + ".jpg"
        im.save(out, "JPEG", quality=86, optimize=True, progressive=True)
        if out != p:
            os.remove(p)
        converted.append((p, out))

# ---------------------------------------------------------------- 2. statue
DER = os.path.join(ROOT, "Derived")
os.makedirs(DER, exist_ok=True)

src = Image.open(os.path.join(SRC, "Existing_Generated/experience/experience_visual.png")).convert("RGB")
statue = src.crop((540, 130, 1000, 1010))          # head-to-floor
w, h = statue.size

# feathered alpha so the plate melts into the hero backdrop
mask = Image.new("L", (w, h), 0)
d = ImageDraw.Draw(mask)
d.rectangle([40, 20, w - 40, h - 30], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(46))

# fade the very bottom so the marble floor merges with the hero floor
grad = Image.new("L", (w, h), 255)
gd = ImageDraw.Draw(grad)
for y in range(h - 150, h):
    gd.line([(0, y), (w, y)], fill=int(255 * (1 - (y - (h - 150)) / 150) ** 1.4))
mask = ImageChops.multiply(mask, grad)

statue.putalpha(mask)
statue.save(os.path.join(DER, "thinking_statue_large.png"), optimize=True)

# ---------------------------------------------------------------- 3. icons
ICO = os.path.join(DER, "icons")
os.makedirs(ICO, exist_ok=True)

for name in ["aws", "cka", "gcp", "terraform"]:
    im = Image.open(os.path.join(SRC, f"10_Learning/{name}_icon.png")).convert("RGB")
    im.crop((4, 2, im.width - 4, 66)).resize((176, 176), Image.LANCZOS) \
      .save(os.path.join(ICO, f"{name}.png"), optimize=True)

for name in ["trophy", "medal", "certificate", "code"]:
    im = Image.open(os.path.join(SRC, f"09_Achievements/achievement_{name}.png")).convert("RGB")
    im.crop((6, 4, im.width - 6, 96)).resize((176, 176), Image.LANCZOS) \
      .save(os.path.join(ICO, f"{name}.png"), optimize=True)

# ---------------------------------------------------------------- 4. report
print("converted:", len(converted))
for a, b in converted:
    print("  ", os.path.relpath(a, ROOT), "->", os.path.relpath(b, ROOT))
tot = sum(os.path.getsize(f) for f in glob.glob(os.path.join(ROOT, "**", "*"), recursive=True) if os.path.isfile(f))
print("total assets MB:", round(tot / 1e6, 2))
