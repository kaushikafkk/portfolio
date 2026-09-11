import { useRef } from 'react';
import { HERO } from '@/data/assets';
import { PROFILE } from '@/data/content';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { DustMotes } from '@/components/layout/Ambient';
import { Chip } from '@/components/ui/Bits';
import LightRays from '@/components/ui/LightRays';

/**
 * 01 — Welcome.
 *
 * The statue is the one memorable thing on the page, so it gets the budget:
 * a cut-out of the Thinker composited over the empty hall, lit and scaled by
 * scroll position so it "awakens" as the visitor moves down. Everything else in
 * the hero stays quiet.
 */
export function Hero() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const raw = useScrollProgress(ref, 1);
  const p = reduced ? 0 : raw;

  // Awakening: the statue starts dim and slightly small, resolves as you scroll.
  const statueStyle = {
    transform: `translate3d(-50%, ${p * 8}%, 0) scale(${1 + p * 0.1})`,
    filter: `brightness(${0.62 + p * 0.55}) contrast(${1 + p * 0.16}) saturate(${0.85 + p * 0.2})`,
    opacity: 0.82 + p * 0.18,
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Welcome"
    >
      {/* --- backdrop --------------------------------------------------- */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO.hall}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
          style={{ transform: `scale(${1.04 + p * 0.06})`, transformOrigin: '50% 35%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-transparent to-ink-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/88 via-ink-900/25 to-ink-900/88" />
      </div>

      {/* light falling through the dome — live WebGL rays, brightening with scroll */}
      {reduced ? (
        <div
          aria-hidden="true"
          className="light-shaft pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] opacity-90"
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen"
          style={{ opacity: 0.55 + p * 0.35 }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#e3c288"
            raysSpeed={0.6}
            lightSpread={0.7}
            rayLength={1.6}
            fadeDistance={1.1}
            saturation={0.85}
            followMouse
            mouseInfluence={0.08}
            noiseAmount={0.06}
            distortion={0.03}
          />
        </div>
      )}

      {/* --- the statue -------------------------------------------------- */}
      <img
        src={HERO.statue}
        alt="A marble statue of a seated thinker, the emblem of this portfolio"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute bottom-[8%] left-1/2 -z-[5] h-[54%] w-auto max-w-none object-contain sm:h-[64%] lg:h-[74%]"
        style={statueStyle}
      />

      {/* Below lg the copy stacks over the statue rather than beside it, so its
          upper half is dimmed to keep the headline legible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[4] bg-gradient-to-b from-ink-900/80 via-ink-900/40 to-transparent lg:hidden"
      />

      <DustMotes />

      {/* --- content ----------------------------------------------------- */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-between pb-10 pt-24 sm:pt-32 lg:pb-14">
        <div className="grid flex-1 grid-cols-1 content-between gap-10 lg:grid-cols-12 lg:items-center">
          {/* left: identity */}
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-bone-400">
              <span aria-hidden="true" className="h-px w-8 bg-bone-500/60" />
              {PROFILE.name}
            </p>

            <h1 className="mt-5 font-display text-display text-bone-50">
              Full-Stack
              <br />
              Software Engineer
            </h1>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-bone-300">
              {PROFILE.tagline[0]}
              <br />
              {PROFILE.tagline[1]}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {PROFILE.focus.map((item) => (
                <li key={item}>
                  <Chip className="px-3.5 py-1.5 text-[0.7rem]">{item}</Chip>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />

          {/* right: the plaque beside the statue, plus the loop */}
          <div className="flex flex-col gap-10 lg:col-span-4 lg:items-end lg:text-right">
            <ol className="order-2 flex gap-x-5 gap-y-1 font-mono text-2xs uppercase tracking-widest2 text-bone-300 lg:order-1 lg:flex-col lg:gap-1">
              {PROFILE.loop.map((step) => (
                <li key={step}>{step}</li>
              ))}
              <li aria-hidden="true" className="mt-2 hidden h-px w-10 bg-brass-500/60 lg:block" />
            </ol>

            <figure className="order-1 max-w-xs border-l border-bone-500/40 pl-4 lg:order-2 lg:border-l-0 lg:border-r lg:pl-0 lg:pr-4 lg:text-right">
              <figcaption className="text-sm font-medium text-bone-100">
                {PROFILE.statue.title}
              </figcaption>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">{PROFILE.statue.body}</p>
            </figure>
          </div>
        </div>

        {/* baseline */}
        <div className="mt-10 flex items-end justify-between gap-6 border-t border-bone-500/20 pt-5">
          <a
            href="#about"
            className="group flex items-center gap-3 font-mono text-2xs uppercase tracking-widest2 text-bone-300 transition-colors duration-300 hover:text-bone-50"
          >
            Scroll
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 ease-museum group-hover:translate-y-1"
            >
              ↓
            </span>
          </a>

          <p className="hidden max-w-[22rem] text-right font-mono text-2xs uppercase leading-5 tracking-widest2 text-bone-500 sm:block">
            {PROFILE.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
