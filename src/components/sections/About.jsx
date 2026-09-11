import { ABOUT } from '@/data/assets';
import { ABOUT_CONTENT, PROFILE } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Stat } from '@/components/ui/Bits';

/** 02 — About. Headline and portrait share a row; stats run underneath. */
export function About({ className = '' }) {
  return (
    <Section className={className} id="about" number="02" title="About" caption={ABOUT_CONTENT.eyebrow}>
      <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
        {/* headline + body */}
        <div className="relative overflow-hidden rounded-xl border border-bone-500/20 bg-ink-800/40 p-6 sm:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(201,197,189,0.4) 0px, rgba(201,197,189,0.4) 1px, transparent 1px, transparent 48px), ' +
                'repeating-linear-gradient(0deg, rgba(201,197,189,0.4) 0px, rgba(201,197,189,0.4) 1px, transparent 1px, transparent 48px), ' +
                'radial-gradient(120% 100% at 0% 0%, rgba(227,194,136,0.1), transparent 60%)',
            }}
          />
          <div className="relative">
            <h3 className="font-display text-title uppercase text-bone-50">
              {ABOUT_CONTENT.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>

            <p className="mt-6 max-w-[46ch] text-sm leading-[1.85] text-bone-300">
              {ABOUT_CONTENT.body}
            </p>
          </div>
        </div>

        {/* portrait */}
        <figure className="relative overflow-hidden rounded-xl border border-bone-500/20 bg-ink-800">
          <img
            src={ABOUT.portrait}
            alt={`${PROFILE.name}, photographed in profile`}
            loading="lazy"
            decoding="async"
            className="h-full min-h-[280px] w-full object-cover object-[30%_20%] grayscale-[0.35] contrast-[1.05]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent"
          />

          <figcaption className="absolute bottom-4 right-4 flex flex-col items-end">
            <img
              src={ABOUT.signature}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-16 w-auto opacity-90 mix-blend-screen sm:h-20"
            />
            <span className="sr-only">{ABOUT_CONTENT.signature.join(', ')}</span>
          </figcaption>
        </figure>
      </div>

      {/* stats */}
      <ul className="mt-7 grid grid-cols-2 divide-x divide-y divide-bone-500/15 overflow-hidden rounded-xl border border-bone-500/20 bg-ink-800/40 sm:grid-cols-4 sm:divide-y-0">
        {ABOUT_CONTENT.stats.map((stat) => (
          <li key={stat.label}>
            <Stat value={stat.value} label={stat.label} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default About;
