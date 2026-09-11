import { AI_CONTENT } from '@/data/content';
import { Section } from '@/components/ui/Section';

/**
 * 05 — AI / ML.
 *
 * The pipeline is a genuine sequence, so it is drawn as one: six stops on a
 * single line with the LLM stage held as the centre of gravity.
 */
export function AIMLSection({ className = '' }) {
  const { headline, pipeline, caption, eyebrow } = AI_CONTENT;

  return (
    <Section className={className} id="ai" number="05" title="AI / ML" caption={eyebrow} bodyClassName="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 50% 40%, rgba(227,194,136,0.16), transparent 65%), ' +
            'repeating-linear-gradient(45deg, rgba(201,197,189,0.1) 0px, rgba(201,197,189,0.1) 1px, transparent 1px, transparent 64px), ' +
            'repeating-linear-gradient(-45deg, rgba(201,197,189,0.1) 0px, rgba(201,197,189,0.1) 1px, transparent 1px, transparent 64px)',
        }}
      />

      <div className="relative">
        <h3 className="text-center font-display text-title uppercase text-bone-50">
          <span aria-hidden="true" className="mr-3 text-bone-500">
            [
          </span>
          {headline}
          <span aria-hidden="true" className="ml-3 text-bone-500">
            ]
          </span>
        </h3>

        {/* pipeline */}
        <ol className="mt-9 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {pipeline.map((stage, i) => {
            const isCore = stage === 'LLM';
            return (
              <li key={stage} className="flex items-center gap-2">
                <span
                  className={
                    isCore
                      ? 'rounded-lg border border-brass-500/50 bg-brass-500/[0.08] px-3.5 py-2 font-mono text-2xs uppercase tracking-widest2 text-brass-400 shadow-[0_0_24px_-6px_rgba(201,162,39,0.5)]'
                      : 'rounded-lg border border-bone-500/35 bg-white/[0.035] px-3.5 py-2 font-mono text-2xs uppercase tracking-widest2 text-bone-200'
                  }
                >
                  {stage}
                </span>

                {i < pipeline.length - 1 ? (
                  <svg
                    aria-hidden="true"
                    width="26"
                    height="8"
                    viewBox="0 0 26 8"
                    className="shrink-0 text-bone-500"
                  >
                    <path
                      d="M0 4h20"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      className="animate-flow"
                    />
                    <path
                      d="m19 1 4 3-4 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ol>

        <p className="mt-7 text-center font-mono text-2xs uppercase tracking-widest2 text-bone-400">
          {caption}
        </p>
      </div>
    </Section>
  );
}

export default AIMLSection;
