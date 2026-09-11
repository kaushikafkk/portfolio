import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { STACK } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/cx';

const left = STACK.clusters.filter((c) => c.side === 'left');
const right = STACK.clusters.filter((c) => c.side === 'right');

/** Gap kept between a line's ends and the core ring / the label box. */
const CORE_GAP = 6;
const LABEL_GAP = 10;

function Cluster({ cluster, align, labelRef }) {
  return (
    <li
      className={cx(
        'flex flex-col',
        align === 'right' ? 'lg:col-start-3 lg:items-end lg:text-right' : 'lg:col-start-1',
      )}
    >
      <h4
        ref={labelRef}
        className={cx(
          'inline-flex self-start rounded-md border border-bone-500/40 bg-ink-800/80 px-3 py-1.5 font-mono text-2xs uppercase tracking-widest2 text-bone-100',
          align === 'right' && 'lg:self-end',
        )}
      >
        {cluster.title}
      </h4>
      <ul className="mt-3 space-y-1.5">
        {cluster.items.map((item) => (
          <li key={item} className="text-sm leading-snug text-bone-300">
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

const px = (n) => n.toFixed(1);

/**
 * Builds one curved path per cluster, from the edge of the core ring to the
 * near edge of that cluster's label. Coordinates are pixels relative to the
 * card, so the SVG overlay uses no viewBox and simply covers the card.
 */
function buildPaths(container, core, labels) {
  const box = container.getBoundingClientRect();
  const c = core.getBoundingClientRect();
  const cx0 = c.left - box.left + c.width / 2;
  const cy0 = c.top - box.top + c.height / 2;
  const r = c.width / 2 + CORE_GAP;

  return STACK.clusters.map((cluster) => {
    const el = labels.get(cluster.id);
    if (!el) return null;
    const l = el.getBoundingClientRect();
    const isLeft = cluster.side === 'left';

    const ex = (isLeft ? l.right + LABEL_GAP : l.left - LABEL_GAP) - box.left;
    const ey = l.top - box.top + l.height / 2;

    // Start on the ring, pointing at the label.
    const dx = ex - cx0;
    const dy = ey - cy0;
    const len = Math.hypot(dx, dy) || 1;
    const sx = cx0 + (dx / len) * r;
    const sy = cy0 + (dy / len) * r;

    const c1x = sx + (ex - sx) * 0.45;
    const c2x = sx + (ex - sx) * 0.55;

    const d = [
      'M', px(sx), px(sy),
      'C', px(c1x), px(sy) + ',', px(c2x), px(ey) + ',', px(ex), px(ey),
    ].join(' ');

    return { id: cluster.id, d, end: [ex, ey] };
  });
}

/** 06 — Engineering stack. Six clusters orbiting a labelled core, wired to it. */
export function Stack({ className = '' }) {
  const [inViewRef, inView] = useInView({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();

  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const labelRefs = useRef(new Map());
  const [paths, setPaths] = useState([]);

  const setContainer = useCallback(
    (el) => {
      containerRef.current = el;
      inViewRef.current = el;
    },
    [inViewRef],
  );

  const labelRef = (id) => (el) => {
    if (el) labelRefs.current.set(id, el);
    else labelRefs.current.delete(id);
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const core = coreRef.current;
    if (!container || !core) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      setPaths(buildPaths(container, core, labelRefs.current).filter(Boolean));
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(container);
    window.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <Section
      className={className}
      id="stack"
      number="06"
      title="Engineering Stack"
      caption={STACK.eyebrow}
      bodyClassName="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: 'radial-gradient(55% 55% at 50% 45%, rgba(227,194,136,0.16), transparent 68%)',
        }}
      />

      <GlassCard ref={setContainer} variant="inset" className="relative p-5 sm:p-7">
        {/* wiring from the core to each cluster — large screens only */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
        >
          <defs>
            <radialGradient id="stack-pulse">
              <stop offset="0%" stopColor="#f7f5f1" />
              <stop offset="45%" stopColor="#e3c288" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e3c288" stopOpacity="0" />
            </radialGradient>
          </defs>

          {paths.map((p, i) => (
            <g key={p.id}>
              {/* base line, drawn in once the card is in view */}
              <path
                d={p.d}
                fill="none"
                stroke="rgba(201,197,189,0.28)"
                strokeWidth="1"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={inView ? 0 : 1}
                style={{
                  transition: `stroke-dashoffset 1.4s cubic-bezier(0.22,0.61,0.36,1) ${i * 90}ms`,
                }}
              />
              {/* flowing current, core → label */}
              <path
                d={p.d}
                fill="none"
                stroke="rgba(227,194,136,0.55)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="4 24"
                className={cx(
                  'animate-flow transition-opacity duration-700',
                  !inView && 'opacity-0',
                )}
                style={{ transitionDelay: `${900 + i * 90}ms` }}
              />
              {/* pulse of light travelling out to the label */}
              {!reduced && inView ? (
                <circle r="3.5" fill="url(#stack-pulse)">
                  <animateMotion
                    dur="3.2s"
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                    path={p.d}
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                    keyTimes="0;1"
                  />
                </circle>
              ) : null}
              {/* terminal dot at the label */}
              <circle
                cx={p.end[0]}
                cy={p.end[1]}
                r="1.6"
                fill="#e3c288"
                className={cx('transition-opacity duration-700', !inView && 'opacity-0')}
                style={{ transitionDelay: `${1200 + i * 90}ms` }}
              />
            </g>
          ))}
        </svg>

        {/* One grid at every size. Below lg the core leads and clusters run
            2-up beneath it; at lg the grid flows column-wise into three rows,
            so the core spans the middle column with three clusters each side. */}
        <ul className="relative grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-flow-col lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-3 lg:items-center lg:gap-x-6 lg:gap-y-14">
          <li className="col-span-2 flex justify-center lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1">
            <div
              ref={coreRef}
              className="relative flex h-36 w-36 items-center justify-center sm:h-48 sm:w-48"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-bone-500/45"
              />
              <span
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-bone-500/25"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(227,194,136,0.12),transparent_68%)]"
              />
              <p className="relative text-center font-mono text-2xs uppercase leading-5 tracking-widest2 text-bone-100">
                {STACK.core.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </li>

          {left.map((cluster) => (
            <Cluster
              key={cluster.id}
              cluster={cluster}
              align="left"
              labelRef={labelRef(cluster.id)}
            />
          ))}
          {right.map((cluster) => (
            <Cluster
              key={cluster.id}
              cluster={cluster}
              align="right"
              labelRef={labelRef(cluster.id)}
            />
          ))}
        </ul>
      </GlassCard>
    </Section>
  );
}

export default Stack;
