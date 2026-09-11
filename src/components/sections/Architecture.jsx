import { ARCHITECTURE_CONTENT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Node } from '@/components/ui/Bits';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/cx';

/** Delay between one tier of the diagram lighting up and the next. */
const STEP_MS = 110;

/** One tier of the diagram, rising into place in request order. */
function Step({ step, shown, offset = 0, className = '', children }) {
  return (
    <div
      className={cx(
        'transition-[opacity,transform] duration-700 ease-museum',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${step * STEP_MS + offset}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * A vertical connector between two tiers. The line draws itself downward as the
 * path reaches it, then carries a repeating pulse of light — one request
 * falling through the system.
 */
function Drop({ label, step, shown, pulse }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-1.5">
      <span className="relative block h-5 w-px overflow-hidden">
        <span
          className={cx(
            'absolute inset-0 origin-top bg-gradient-to-b from-bone-500/60 to-bone-500/20',
            'transition-transform duration-500 ease-museum',
            shown ? 'scale-y-100' : 'scale-y-0',
          )}
          style={{ transitionDelay: `${step * STEP_MS}ms` }}
        />
        {pulse ? (
          <span
            className="absolute inset-x-0 top-0 h-3 animate-trace bg-gradient-to-b from-transparent via-brass-400 to-transparent"
            style={{ animationDelay: `${step * 170}ms` }}
          />
        ) : null}
      </span>

      {label ? (
        <Step step={step} shown={shown}>
          <span className="my-1 block rounded bg-ink-900/70 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest2 text-bone-300 backdrop-blur-[2px]">
            {label}
          </span>
        </Step>
      ) : null}
    </div>
  );
}

/**
 * 07 — Architecture.
 *
 * A real request path, drawn top to bottom: the visitor enters at the edge and
 * the request falls through each tier to storage.
 */
export function Architecture({ className = '' }) {
  const { nodes, headline, body, footline, eyebrow } = ARCHITECTURE_CONTENT;
  const [diagramRef, inView] = useInView({ threshold: 0.25 });
  const reduced = usePrefersReducedMotion();

  /* Each tier takes the next slot in the sequence, so the path lights up in the
     order a request actually travels it. */
  let step = 0;
  const next = () => step++;
  const entryStep = next();
  const edgeSteps = nodes.edge.map(() => [next(), next()]);
  const fanOutStep = next();
  const servicesStep = next();
  const persistStep = next();
  const dataStep = next();

  return (
    <Section
      className={className}
      id="architecture"
      number="07"
      title="Architecture"
      caption={eyebrow}
      bodyClassName="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(70% 60% at 50% 100%, rgba(227,194,136,0.24), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/55 to-transparent"
      />

      <div className="relative grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* narrative */}
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <h3 className="font-display text-heading text-bone-50">{headline}</h3>
            <p className="mt-4 max-w-[36ch] text-sm leading-[1.85] text-bone-300">{body}</p>
          </div>
          <p className="font-display text-heading uppercase leading-[1.05] text-bone-200">
            {footline}
          </p>
        </div>

        {/* diagram */}
        <GlassCard ref={diagramRef} variant="inset" className="p-5 sm:p-6">
          <div className="flex flex-col items-center">
            {nodes.entry.map((node) => (
              <Step key={node.id} step={entryStep} shown={inView}>
                <Node icon={node.icon} label={node.label} tone="accent" />
              </Step>
            ))}

            {nodes.edge.map((node, i) => (
              <div key={node.id} className="flex w-full flex-col items-center">
                <Drop step={edgeSteps[i][0]} shown={inView} pulse={!reduced && inView} />
                <Step step={edgeSteps[i][1]} shown={inView}>
                  <Node icon={node.icon} label={node.label} />
                </Step>
              </div>
            ))}

            <Drop label="fan out" step={fanOutStep} shown={inView} pulse={!reduced && inView} />

            <ul className="flex w-full flex-wrap items-center justify-center gap-2">
              {nodes.services.map((node, i) => (
                <li key={node.id}>
                  <Step step={servicesStep} shown={inView} offset={i * 60}>
                    <Node icon={node.icon} label={node.label} />
                  </Step>
                </li>
              ))}
            </ul>

            <Drop label="persist" step={persistStep} shown={inView} pulse={!reduced && inView} />

            <ul className="flex w-full flex-wrap items-center justify-center gap-2">
              {nodes.data.map((node) => (
                <li key={node.id}>
                  <Step step={dataStep} shown={inView}>
                    <Node icon={node.icon} label={node.label} />
                  </Step>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

export default Architecture;
