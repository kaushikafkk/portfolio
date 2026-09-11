"""
Rebuilds every derived image the page shows inside its cards, from the
original asset pack, at the highest quality the pack allows.

    python build_assets.py [path/to/MKS_Portfolio_Assets_COMPLETE] [--only photos|textures|photos2x]

Three kinds of work:

  photos    The pack's full-resolution renders are lossless PNGs. The old
            pipeline re-saved them as ~150 KB JPEGs, which is where most of
            the softness came from. They are re-encoded as high-quality WebP.

  photos2x  The renders top out at 1250-1536 px, which a 2x display stretches
            (the hero hall to ~2900 px). Each photo also gets an EDSR x2
            variant, served through `srcset` so 1x screens never download it.

  textures  The numbered folders are 100-430 px crops from a presentation
            board, each with its filename printed along the bottom. The band
            is trimmed, then the crop is upscaled with EDSR (a neural
            super-resolution model, two x4 passes) instead of plain Lanczos,
            and written at twice the width the page previously used so the
            browser never has to upscale it again.

Needs Pillow and opencv-contrib-python. The EDSR weights (~38 MB) are
downloaded once into ~/.cache/edsr/.
"""

import os
import sys
import urllib.request

import cv2
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "public", "assets")
ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]
ONLY = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
SRC = ARGS[0] if ARGS else os.path.join(
    HERE, "..", "..", "MKS_Portfolio_All_Images", "MKS_Portfolio_Assets_COMPLETE"
)


def step(name):
    return ONLY is None or ONLY == name
DER = os.path.join(ROOT, "Derived")
TEX = os.path.join(DER, "textures")
os.makedirs(TEX, exist_ok=True)

MODEL_URL = "https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb"
MODEL = os.path.join(os.path.expanduser("~"), ".cache", "edsr", "EDSR_x4.pb")

# ---------------------------------------------------------------- 1. photos
# (pack path, output path relative to ROOT). WebP q92 is visually lossless
# for these renders and lands around a quarter of the PNG size.
PHOTOS = [
    ("Existing_Generated/hero/museum_background.png", "Existing_Generated/hero/museum_background.webp"),
    ("Existing_Generated/about/profile_portrait.png", "Existing_Generated/about/profile_portrait.webp"),
    ("Existing_Generated/projects/architectural_3d_model.png", "Existing_Generated/projects/architectural_3d_model.webp"),
    ("Existing_Generated/projects/file_collaboration_ui.png", "Existing_Generated/projects/file_collaboration_ui.webp"),
]

for rel, out in PHOTOS if step("photos") else []:
    im = Image.open(os.path.join(SRC, rel)).convert("RGB")
    dest = os.path.join(ROOT, out)
    im.save(dest, "WEBP", quality=92, method=6)
    print(f"photo    {out:60s} {im.size}  {os.path.getsize(dest) // 1024} KB", flush=True)

# ---------------------------------------------------------------- 2. textures
# name -> (source, crop box as fractions l,t,r,b — trims the caption band, target width)
JOBS = {
    "ai_network":        ("05_AI_ML/ai_pipeline_background.png",         (0.01, 0.02, 0.99, 0.60), 2600),
    "about_pattern":     ("02_About/about_pattern.png",                  (0.03, 0.02, 0.97, 0.70), 1800),
    "experience_wave":   ("03_Experience/experience_wave.png",           (0.02, 0.02, 0.98, 0.72), 2200),
    "experience_grid":   ("03_Experience/experience_grid.png",           (0.03, 0.03, 0.97, 0.70), 1800),
    "experience_glow":   ("03_Experience/experience_background.png",     (0.03, 0.03, 0.97, 0.70), 1800),
    "stack_field":       ("06_Engineering_Stack/stack_background.png",   (0.03, 0.03, 0.97, 0.70), 1800),
    "architecture_hall": ("07_Architecture/architecture_background.png", (0.03, 0.02, 0.97, 0.70), 1800),
    "cloud_network":     ("08_Cloud_DevOps/cloud_network.png",           (0.02, 0.02, 0.98, 0.66), 2000),
    "server_room":       ("08_Cloud_DevOps/server_room.png",             (0.03, 0.02, 0.97, 0.68), 1800),
    "philosophy_hall":   ("11_Philosophy/philosophy_background.jpg",     (0.02, 0.02, 0.98, 0.70), 2200),
    "contact_hall":      ("12_Contact/contact_background.jpg",           (0.02, 0.02, 0.98, 0.68), 2200),
    "hero_rays":         ("01_Hero/hero_light_rays.png",                 (0.03, 0.00, 0.97, 0.72), 1800),
    "marble":            ("Global/marble_texture.jpg",                   (0.04, 0.03, 0.96, 0.66), 1600),
    "grid_pattern":      ("Global/grid_pattern.png",                     (0.04, 0.03, 0.96, 0.66), 1600),
    "particles":         ("Global/particle_dots.png",                    (0.04, 0.03, 0.96, 0.66), 1600),
    "gradient":          ("Global/background_gradient.png",              (0.04, 0.03, 0.96, 0.66), 1600),
    # shown as a full-bleed blueprint watermark over the 3D render; no caption band
    "wireframe":         ("04_Projects/project_01_wireframe.png",        (0.0, 0.0, 1.0, 1.0), 2400),
}

if not os.path.exists(MODEL):
    os.makedirs(os.path.dirname(MODEL), exist_ok=True)
    print("downloading EDSR weights ...")
    urllib.request.urlretrieve(MODEL_URL, MODEL)

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(MODEL)
sr.setModel("edsr", 4)


def upscale(im, passes=2):
    arr = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
    for _ in range(passes):
        arr = sr.upsample(arr)
    return Image.fromarray(cv2.cvtColor(arr, cv2.COLOR_BGR2RGB))


def texture(name, rel, frac, width):
    im = Image.open(os.path.join(SRC, rel)).convert("RGB")
    w, h = im.size
    l, t, r, b = frac
    im = im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
    im = upscale(im)
    # two x4 passes overshoot the target; the final Lanczos step is a downscale,
    # which tightens the result rather than softening it.
    im = im.resize((width, max(1, round(im.height * width / im.width))), Image.LANCZOS)
    dest = os.path.join(TEX, f"{name}.webp")
    im.save(dest, "WEBP", quality=88, method=6)
    return im.size, os.path.getsize(dest) // 1024


for name, (rel, frac, width) in JOBS.items() if step("textures") else []:
    size, kb = texture(name, rel, frac, width)
    print(f"texture  {name:20s} {size}  {kb} KB", flush=True)

# ---------------------------------------------------------------- 3. signature
# The handwritten "Curious / Disciplined / Builder" over the portrait. One x4
# pass is plenty for its 80 px display size; kept as PNG for the screen blend.
if step("textures"):
    sig = Image.open(os.path.join(SRC, "02_About/profile_decor.png")).convert("RGB")
    sig = upscale(sig, passes=1)
    sig.save(os.path.join(DER, "signature.png"), optimize=True)
    print(f"signature {sig.size}", flush=True)

# ---------------------------------------------------------------- 4. photos @2x
# One EDSR x4 pass, brought down to exactly 2x with Lanczos. Slow on CPU
# (a few minutes per render) but only ever run once.
for rel, out in PHOTOS if step("photos2x") else []:
    im = Image.open(os.path.join(SRC, rel)).convert("RGB")
    big = upscale(im, passes=1).resize((im.width * 2, im.height * 2), Image.LANCZOS)
    dest = os.path.join(ROOT, out.replace(".webp", "@2x.webp"))
    big.save(dest, "WEBP", quality=88, method=6)
    print(f"photo@2x {out:60s} {big.size}  {os.path.getsize(dest) // 1024} KB", flush=True)

print("done")
