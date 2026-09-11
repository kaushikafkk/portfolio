import { EXPERIENCE_CONTENT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';

/**
 * 03 — Experience.
 *
 * The numbering here is real: the year span is a timeline, so the rule between
 * [2025] and [2026] carries the roles as stops along it.
 */
export function Experience({ className = '' }) {
  const { span, roles, capabilities } = EXPERIENCE_CONTENT;

  return (
    <Section
      className={className}
      id="experience"
      number="03"
      title="Experience"
      caption={EXPERIENCE_CONTENT.eyebrow}
      bodyClassName="relative"
    >
      {/* light-trail wash behind the timeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-45 mix-blend-screen"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, rgba(227,194,136,0.4) 45%, rgba(227,194,136,0.16) 62%, transparent), ' +
            'radial-gradient(40% 100% at 30% 0%, rgba(247,245,241,0.12), transparent 70%)',
        }}
      />

      <div className="relative">
        <h3 className="font-display text-title uppercase text-bone-50">Experience</h3>

        {/* timeline */}
        <div className="mt-6">
          <div className="flex items-center gap-4 font-mono text-2xs tracking-widest2 text-bone-400">
            <span>[ {span.from} ]</span>
            <span aria-hidden="true" className="relative h-px flex-1 bg-bone-500/35">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brass-500/70 to-transparent" />
            </span>
            <span>[ {span.to} ]</span>
          </div>

          <ol className="mt-5 space-y-5">
            {roles.map((role) => (
              <li key={role.title} className="relative pl-7">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 flex h-3 w-3 items-center justify-center"
                >
                  <span className="absolute h-3 w-3 rounded-full border border-brass-500/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brass-400 animate-pulseDot" />
                </span>

                <GlassCard variant="inset" className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base font-medium text-bone-50">{role.title}</h4>
                    <span className="font-mono text-2xs uppercase tracking-widest2 text-bone-400">
                      {role.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-bone-300">{role.org}</p>

                  <ul className="mt-4 space-y-2">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-bone-300">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-bone-400"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </li>
            ))}
          </ol>
        </div>

        {/* capability grid */}
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((cap) => (
            <li key={cap.title}>
              <GlassCard variant="inset" className="h-full p-4">
                <h4 className="text-sm font-medium leading-snug text-bone-100">{cap.title}</h4>
                <div className="mt-3 h-px w-8 bg-bone-500/40" />
                <ul className="mt-3 space-y-1">
                  {cap.items.map((item) => (
                    <li key={item} className="font-mono text-2xs tracking-wide text-bone-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default Experience;
