import { ACHIEVEMENTS } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';

/** 09 — Achievements. Four milestones, numbered because the list is ordered. */
export function Achievements({ className = '' }) {
  return (
    <Section className={className} id="achievements" number="09" title="Achievements" caption="Milestones that matter">
      <h3 className="font-display text-title uppercase text-bone-50">Achievements</h3>

      <ul className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {ACHIEVEMENTS.map((item) => (
          <li key={item.number}>
            <GlassCard variant="inset" className="h-full p-4">
              <div>
                <span className="font-mono text-2xs tracking-widest2 text-bone-500">
                  {item.number}
                </span>
              </div>

              <h4 className="mt-5 text-sm font-medium leading-snug text-bone-50">
                {item.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-bone-400">
                {item.org}
                {item.detail ? (
                  <>
                    <br />
                    {item.detail}
                  </>
                ) : null}
              </p>
            </GlassCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Achievements;
