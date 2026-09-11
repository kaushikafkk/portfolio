import { DEVOPS_CONTENT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { useInView } from '@/hooks/useInView';

/**
 * 08 — Cloud & DevOps.
 *
 * The meters fill once, when the panel first comes into view: motion that shows
 * a value arriving rather than decoration that loops forever.
 */
export function CloudDevOps({ className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { metrics, pipeline, status, technologies, eyebrow } = DEVOPS_CONTENT;

  return (
    <Section
      className={className}
      id="devops"
      number="08"
      title="Cloud & DevOps"
      caption={eyebrow}
      bodyClassName="relative space-y-4"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(201,197,189,0.35) 0px, rgba(201,197,189,0.35) 1px, transparent 1px, transparent 26px), ' +
            'radial-gradient(80% 60% at 50% 0%, rgba(247,245,241,0.2), transparent 70%)',
        }}
      />

      <div ref={ref} className="relative grid gap-4 lg:grid-cols-2">
        {/* system status */}
        <GlassCard variant="inset" className="p-5">
          <h3 className="text-sm font-medium text-bone-100">System status</h3>
          <dl className="mt-5 space-y-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm text-bone-300">{metric.label}</dt>
                  <dd className="font-mono text-xs text-bone-100">{metric.value}%</dd>
                </div>
                <div
                  className="meter-track mt-2"
                  role="meter"
                  aria-valuenow={metric.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${metric.label} utilisation`}
                >
                  <div
                    className="meter-fill"
                    style={{ width: inView ? `${metric.value}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </dl>
        </GlassCard>

        {/* deployment pipeline */}
        <GlassCard variant="inset" className="flex flex-col p-5">
          <h3 className="text-sm font-medium text-bone-100">Deployment pipeline</h3>

          <ol className="mt-6 flex items-start justify-between gap-0.5">
            {pipeline.map((stage, i) => (
              <li key={stage} className="relative flex flex-1 flex-col items-center">
                {i < pipeline.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[5px] h-px w-full bg-bone-500/35"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={
                    i === 0
                      ? 'relative z-10 h-2.5 w-2.5 rounded-full bg-brass-400'
                      : 'relative z-10 h-2.5 w-2.5 rounded-full border border-bone-500/60 bg-ink-800'
                  }
                />
                <span className="mt-3 text-center font-mono text-[0.55rem] uppercase tracking-[0.12em] text-bone-400">
                  {stage}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-auto flex items-center gap-3 rounded-lg border border-bone-500/25 bg-white/[0.03] px-4 py-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal-ok/50 animate-pulseDot" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-ok" />
            </span>
            <span className="text-sm text-bone-200">
              {status.label}
              <span className="ml-2 text-bone-400">{status.state}</span>
            </span>
          </div>
        </GlassCard>
      </div>

      {/* technologies */}
      <GlassCard variant="inset" className="relative p-5">
        <h3 className="text-sm font-medium text-bone-100">Technologies</h3>
        <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-4">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="font-mono text-2xs uppercase tracking-widest2 text-bone-300 transition-colors duration-300 hover:text-bone-50"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-30 mix-blend-screen"
          style={{
            backgroundImage: 'radial-gradient(70% 70% at 70% 30%, rgba(227,194,136,0.45), transparent 65%)',
          }}
        />
      </GlassCard>
    </Section>
  );
}

export default CloudDevOps;
