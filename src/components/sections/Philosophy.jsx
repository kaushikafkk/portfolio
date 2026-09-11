import { PHILOSOPHY_CONTENT, PROFILE } from '@/data/content';
import { Section } from '@/components/ui/Section';

/** 11 — Personal philosophy. */
export function Philosophy({ className = '' }) {
  const { headline, verbs, eyebrow } = PHILOSOPHY_CONTENT;

  return (
    <Section
      className={className}
      id="philosophy"
      number="11"
      title="Philosophy"
      caption={eyebrow}
      bodyClassName="relative"
    >
      {/* a colonnade in gradients: receding pillars, a shaft of light down the
          middle, and the polished floor catching it at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 104px, rgba(247,245,241,0.05) 104px 118px, rgba(247,245,241,0.016) 118px 132px, transparent 132px 210px), ' +
            'linear-gradient(0deg, rgba(227,194,136,0.07) 0%, transparent 34%), ' +
            'radial-gradient(50% 78% at 50% 0%, rgba(227,194,136,0.16), transparent 70%)',
        }}
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <h3 className="font-display text-title uppercase leading-[0.98] text-bone-50">
            {headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          <ul className="mt-7 space-y-1">
            {verbs.map((verb, i) => (
              <li
                key={verb}
                className="font-display text-heading uppercase leading-[1.12] text-bone-200"
                style={{ opacity: 1 - i * 0.07 }}
              >
                {verb}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative lg:pl-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-bone-500/40 to-transparent lg:block"
          />
          <blockquote className="text-base leading-relaxed text-bone-200">
            <span aria-hidden="true" className="mr-1 text-bone-500">
              &ldquo;
            </span>
            {PROFILE.quote.text}
          </blockquote>
          <figcaption className="mt-4 font-mono text-2xs uppercase tracking-widest2 text-bone-400">
            <span aria-hidden="true" className="mr-2">
              &mdash;
            </span>
            {PROFILE.quote.attribution}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

export default Philosophy;
