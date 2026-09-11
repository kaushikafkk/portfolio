import { LEARNING_ICONS } from '@/data/assets';
import { LEARNING } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { useInView } from '@/hooks/useInView';

/** 10 — Currently building / learning. Four certification tracks in flight. */
export function Learning({ className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <Section
      className={className}
      id="learning"
      number="10"
      title="Currently Building / Learning"
      caption={LEARNING.eyebrow}
      bodyClassName="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(201,197,189,0.5) 0px, rgba(201,197,189,0.5) 1px, transparent 1px, transparent 48px), ' +
            'repeating-linear-gradient(90deg, rgba(201,197,189,0.5) 0px, rgba(201,197,189,0.5) 1px, transparent 1px, transparent 48px)',
        }}
      />

      <div ref={ref} className="relative">
        <h3 className="font-display text-title uppercase leading-[0.98] text-bone-50">
          {LEARNING.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {LEARNING.tracks.map((track) => (
            <li key={track.name}>
              <GlassCard variant="inset" className="flex h-full flex-col p-4">
                <img
                  src={LEARNING_ICONS[track.icon]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-8 w-8 object-contain opacity-80 mix-blend-screen"
                />

                <h4 className="mt-4 text-sm font-medium text-bone-50">{track.name}</h4>
                <p className="mt-1 text-xs text-bone-400">{track.level}</p>

                <div className="mt-auto pt-5">
                  <div
                    className="meter-track"
                    role="progressbar"
                    aria-valuenow={track.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${track.name} ${track.level} progress`}
                  >
                    <div
                      className="meter-fill"
                      style={{ width: inView ? `${track.progress}%` : '0%' }}
                    />
                  </div>
                  <p className="mt-3 inline-flex items-center gap-2 whitespace-nowrap rounded border border-bone-500/35 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-bone-400">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-signal-warn animate-pulseDot"
                    />
                    {track.status}
                  </p>
                </div>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default Learning;
