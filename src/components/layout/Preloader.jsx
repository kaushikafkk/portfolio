import { useEffect, useState } from 'react';
import { CRITICAL_IMAGES } from '@/data/assets';
import { PROFILE } from '@/data/content';
import { cx } from '@/lib/cx';

const MIN_VISIBLE_MS = 700;

/** How long the curtain takes to clear once it starts lifting. */
const EXIT_MS = 1100;

/**
 * The page-load moment: the hall is dark until the hero imagery is decoded, so
 * the statue never pops in half-loaded. This is the one orchestrated entrance
 * on the page — everything after it is reveal-on-scroll.
 *
 * The curtain owns its own exit: `onDone` fires as the lift *starts*, so the
 * page fades up underneath while the curtain is still clearing, and this
 * unmounts itself once it has. Handing the unmount to the parent instead would
 * cut the fade the moment it began.
 */
export function Preloader({ onDone }) {
  const [loaded, setLoaded] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  const total = CRITICAL_IMAGES.length;
  const pct = Math.round((loaded / total) * 100);

  useEffect(() => {
    let cancelled = false;
    const started = performance.now();

    const load = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (!cancelled) setLoaded((n) => n + 1);
          resolve();
        };
        img.src = src;
      });

    const lift = () => {
      if (cancelled) return;
      setHidden(true);
      onDone?.();
      window.setTimeout(() => {
        if (!cancelled) setGone(true);
      }, EXIT_MS);
    };

    Promise.all(CRITICAL_IMAGES.map(load)).then(() => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - started));
      window.setTimeout(lift, wait);
    });

    // Never trap the visitor behind a stalled image.
    const failsafe = window.setTimeout(lift, 6000);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, [onDone, total]);

  if (gone) return null;

  return (
    <div
      aria-hidden={hidden}
      role="status"
      aria-live="polite"
      className={cx(
        'fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink-900',
        'transition-opacity duration-1000 ease-museum',
        hidden && 'pointer-events-none opacity-0',
      )}
    >
      <div className="light-shaft pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* the mark drifts up and opens out as the curtain lifts */}
      <div
        className={cx(
          'flex flex-col items-center transition-[opacity,transform] duration-1000 ease-museum',
          hidden ? '-translate-y-2 scale-[1.04] opacity-0' : 'translate-y-0 scale-100 opacity-100',
        )}
      >
        <p className="font-display text-3xl tracking-tight text-bone-50">[{PROFILE.initials}]</p>
        <p className="mt-3 font-mono text-2xs uppercase tracking-widest2 text-bone-400">
          {PROFILE.role}
        </p>
      </div>

      <div
        className={cx(
          'flex flex-col items-center transition-opacity duration-500 ease-museum',
          hidden && 'opacity-0',
        )}
      >
        <div className="relative mt-8 h-px w-40 overflow-hidden bg-bone-500/25">
          <span
            className="absolute inset-y-0 left-0 bg-brass-400 transition-[width] duration-500 ease-museum"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-2xs tracking-widest2 text-bone-500">
          {String(pct).padStart(3, '0')}
        </p>
      </div>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}

export default Preloader;
