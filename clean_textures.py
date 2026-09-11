"""
The numbered asset folders are crops from a presentation board, and every crop
carries its own filename printed across the bottom. Anything used as a visible
texture has to have that band removed first, otherwise it tiles the filename
across the page.

This writes cleaned copies into public/assets/Derived/textures/ and leaves the
original pack untouched.
"""

import os
from PIL import Image, ImageFilter

SRC = "/home/claude/extract/MKS_Portfolio_Assets_COMPLETE"
OUT = "/home/claude/mks-portfolio/public/assets/Derived/textures"
os.makedirs(OUT, exist_ok=True)

# name -> (source path, crop box as fractions l, t, r, b, upscale target width)
JOBS = {
    "ai_network":        ("05_AI_ML/ai_pipeline_background.png",       (0.01, 0.02, 0.99, 0.60), 1300),
    "about_pattern":     ("02_About/about_pattern.png",                (0.03, 0.02, 0.97, 0.70), 900),
    "experience_wave":   ("03_Experience/experience_wave.png",         (0.02, 0.02, 0.98, 0.72), 1100),
    "experience_grid":   ("03_Experience/experience_grid.png",         (0.03, 0.03, 0.97, 0.70), 900),
    "experience_glow":   ("03_Experience/experience_background.png",   (0.03, 0.03, 0.97, 0.70), 900),
    "stack_field":       ("06_Engineering_Stack/stack_background.png", (0.03, 0.03, 0.97, 0.70), 900),
    "architecture_hall": ("07_Architecture/architecture_background.png", (0.03, 0.02, 0.97, 0.70), 900),
    "cloud_network":     ("08_Cloud_DevOps/cloud_network.png",         (0.02, 0.02, 0.98, 0.66), 1000),
    "server_room":       ("08_Cloud_DevOps/server_room.png",           (0.03, 0.02, 0.97, 0.68), 900),
    "philosophy_hall":   ("11_Philosophy/philosophy_background.jpg",   (0.02, 0.02, 0.98, 0.70), 1100),
    "contact_hall":      ("12_Contact/contact_background.jpg",         (0.02, 0.02, 0.98, 0.68), 1100),
    "hero_rays":         ("01_Hero/hero_light_rays.png",               (0.03, 0.00, 0.97, 0.72), 900),
    "marble":            ("Global/marble_texture.jpg",                 (0.04, 0.03, 0.96, 0.66), 800),
    "grid_pattern":      ("Global/grid_pattern.png",                   (0.04, 0.03, 0.96, 0.66), 800),
    "particles":         ("Global/particle_dots.png",                  (0.04, 0.03, 0.96, 0.66), 800),
    "gradient":          ("Global/background_gradient.png",            (0.04, 0.03, 0.96, 0.66), 800),
}


def clean(name, rel, frac, width):
    im = Image.open(os.path.join(SRC, rel)).convert("RGB")
    w, h = im.size
    l, t, r, b = frac
    box = (int(w * l), int(h * t), int(w * r), int(h * b))
    im = im.crop(box)

    # These crops are tiny, so upscaling hard-edges them. A light blur after the
    # resize keeps them reading as atmosphere instead of mush.
    ratio = width / im.width
    im = im.resize((width, max(1, int(im.height * ratio))), Image.LANCZOS)
    im = im.filter(ImageFilter.GaussianBlur(0.6))
    im.save(os.path.join(OUT, f"{name}.jpg"), "JPEG", quality=82, optimize=True)
    return im.size


for name, (rel, frac, width) in JOBS.items():
    print(f"{name:20s} {clean(name, rel, frac, width)}")

# ---------------------------------------------------------------- grain
# Procedural, so it tiles seamlessly and carries no baked text.
import random

random.seed(7)
SIZE = 160
grain = Image.new("LA", (SIZE, SIZE))
grain.putdata([(200, random.randint(0, 46)) for _ in range(SIZE * SIZE)])
grain.save(os.path.join(OUT, "grain.png"), optimize=True)
print("grain                (160, 160)")
