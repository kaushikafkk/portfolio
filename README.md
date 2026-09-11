# MKS Portfolio

Portfolio site for **Motesha Kaushik Singh**, Full-Stack Software Engineer.
React 18 + Vite 5 + Tailwind CSS 3, built as a single scrolling hall: a museum
interior with the Thinker at its centre, and twelve numbered glass panels
stacked in two columns beneath it.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | Does                                              |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                        |
| `npm run build`   | Production build into `dist/`                     |
| `npm run preview` | Serves the built `dist/` on port 4173             |
| `npm run lint`    | ESLint across `src/`                              |

Node 18 or newer.

---

## Structure

```
mks-portfolio/
├── index.html                 Fonts, meta tags, favicon
├── vite.config.js             '@' → src alias, relative base
├── tailwind.config.js         Palette, type scale, keyframes
├── public/
│   └── assets/                Every image, served by path
└── src/
    ├── main.jsx
    ├── App.jsx                Section order and the two-column layout
    ├── styles/index.css       Glass recipe, base styles, utilities
    ├── lib/cx.js
    ├── data/
    │   ├── content.js         Every word and number on the page
    │   └── assets.js          Path manifest for every image
    ├── hooks/
    │   ├── useScrollProgress.js
    │   ├── useActiveSection.js
    │   ├── useInView.js
    │   └── usePrefersReducedMotion.js
    └── components/
        ├── ui/                GlassCard, Section, Icon, Bits
        ├── layout/            Navbar, Preloader, Ambient, Footer
        └── sections/          Hero + the twelve panels
```

### Editing content

All copy lives in `src/data/content.js`. Nothing is hard-coded in components, so
changing a job title, adding a project or reordering the stack clusters is a
one-file edit. `SECTIONS` in that file drives the nav counter, the scroll spy and
the mobile drawer at once — add an entry there and it appears in all three.

---

## The glass

`.glass-card` in `src/styles/index.css` is the supplied recipe, character for
character, including both pseudo-element edges and the fixed `240x360`.

Tailwind's utility layer is emitted *after* the component layer, so
`.glass-card--fluid` (`w-full; h-auto`) and any width class passed from a
component override that fixed footprint without the original block being edited.

Three variants sit beside it:

| Class               | Tint                      | Used for                       |
| ------------------- | ------------------------- | ------------------------------ |
| `.glass-card`       | `rgba(255,255,255,0.23)`  | The recipe as supplied         |
| `.glass-card--dark` | `rgba(255,255,255,0.035)` | Every panel on the page        |
| `.glass-card--inset`| `rgba(255,255,255,0.022)` | Panels nested inside a panel   |

The dark variants exist because a 23% white fill over a near-black background
renders as a light grey slab rather than glass. Structure, blur radius, corner
radius and both light edges are identical — only the alphas move. Use
`<GlassCard variant="light">` for the original tint over bright imagery.

---

## Images

`public/assets/` holds the full original pack. Two tiers:

**`Existing_Generated/`** — full-resolution renders. Everything shown at size on
the page comes from here: the museum hall, your portrait, the 3D architectural
model, the file-collaboration UI.

**Numbered folders + `Global/`** — 100–430px crops lifted from an asset board.
Every one of them has **its own filename printed across the bottom**, which tiles
across the page if used directly. They are only used as textures, and only via
cleaned copies.

**`Derived/`** — generated from the pack, checked in so the project builds with
no extra step:

- `thinking_statue_large.png` — the statue cut out of `experience_visual.png`
  with a feathered alpha mask, composited over the empty hall in the hero. The
  pack's own `thinking_statue.png` is 107x164 and unusable at hero size.
- `textures/` — caption bands trimmed off each board crop, upscaled, lightly
  blurred. No longer referenced by any component (the board crops are only
  90-430px, so upscaled they read as blur rather than atmosphere); section
  background washes are now plain CSS gradients defined per component instead.
  Kept on disk for provenance. `grain.png` is the exception — still used via
  the `.grain` utility in `index.css`, generated procedurally so it tiles
  seamlessly at full sharpness regardless of size.
- `icons/` — square crops of the certification and achievement glyphs, still
  used at their native small size.

To regenerate `Derived/`'s statue and icons after changing the source pack,
re-run the two scripts kept at the repository root (`prep_assets.py`,
`clean_textures.py` — the latter now only matters for its `grain.png` step).
They need Pillow and read from the unpacked asset pack.

---

## Motion

One orchestrated entrance (the preloader, which waits on the hero imagery so the
statue never appears half-decoded), then reveal-on-scroll per panel. The statue
brightens and scales with scroll position; meters and progress bars fill once
when their panel first enters view.

`prefers-reduced-motion: reduce` disables all of it — the CSS neutralises
transitions and animations, and `usePrefersReducedMotion` pins the statue's
scroll progress at zero so the JS-driven parallax stops too.

---

## The contact form

Set an endpoint in `.env`:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

It POSTs `{ name, email, message }` as JSON and shows sending, sent and error
states. With no endpoint set it falls back to opening the visitor's mail client
with the message prefilled, so a plain static deploy still works.

---

## Before going live

- [ ] Real LinkedIn, GitHub and Instagram URLs in `SOCIALS` (`content.js`)
- [ ] Live URL for the file-collaboration project (`PROJECTS[1].cta.href`)
- [ ] A contact endpoint, or accept the `mailto:` fallback
- [ ] Swap `og:image` in `index.html` for a purpose-made 1200x630 card
- [ ] Confirm the certification progress figures in `LEARNING.tracks`

---

## Deploying

Static output, no server. `npm run build`, then upload `dist/`.

`base` is `'./'` in `vite.config.js`, so the build works from a subdirectory
(GitHub Pages project sites included) as well as from a domain root.
