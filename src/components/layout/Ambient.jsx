/**
 * The hall behind every panel: a faint marble wash, a survey grid, a soft glow,
 * drifting dust and a film of grain. The wash/grid/glow are drawn as pure CSS
 * gradients rather than the asset pack's texture crops — those crops are
 * 90-130px source images meant as tiny presentation-board thumbnails, so
 * stretched across the full viewport they only ever read as blur. Gradients
 * stay crisp at any size and sit at the same low opacity so they still read as
 * atmosphere, not pattern.
 */
export function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'radial-gradient(60% 45% at 15% 10%, rgba(247,245,241,0.5), transparent 65%), ' +
            'radial-gradient(55% 40% at 85% 85%, rgba(247,245,241,0.35), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(201,197,189,0.9) 0px, rgba(201,197,189,0.9) 1px, transparent 1px, transparent 340px), ' +
            'repeating-linear-gradient(90deg, rgba(201,197,189,0.9) 0px, rgba(201,197,189,0.9) 1px, transparent 1px, transparent 340px)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(45% 35% at 25% 20%, rgba(227,194,136,0.5), transparent 65%), ' +
            'radial-gradient(40% 30% at 75% 65%, rgba(247,245,241,0.3), transparent 60%)',
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.05]" />
      <div className="vignette absolute inset-0" />
    </div>
  );
}

/** Slow motes of dust, used inside the hero only. */
export function DustMotes({ count = 14 }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-brass-400/50 animate-dust"
          style={{
            left: `${(i * 37) % 100}%`,
            bottom: `${-10 + ((i * 23) % 60)}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            animationDelay: `${(i * 1.15) % 14}s`,
            animationDuration: `${11 + (i % 6) * 1.6}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Ambient;
