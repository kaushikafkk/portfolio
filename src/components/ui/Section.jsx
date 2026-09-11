import { useInView } from '@/hooks/useInView';
import { cx } from '@/lib/cx';
import { GlassCard } from './GlassCard';

/**
 * A numbered panel in the hall. Every section from 02 onward is one of these:
 * a glass plate with a number / title on the left of its header rule and a
 * caption on the right, exactly as the design lays them out.
 */
export function Section({
  id,
  number,
  title,
  caption,
  className = '',
  bodyClassName = '',
  children,
}) {
  const [ref, inView] = useInView();

  return (
    <GlassCard
      as="section"
      id={id}
      ref={ref}
      className={cx(
        'reveal scroll-mt-28 overflow-hidden',
        inView && 'is-visible',
        className,
      )}
      aria-labelledby={`${id}-title`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-bone-500/20 px-5 py-4 sm:px-7">
        <h2 id={`${id}-title`} className="eyebrow flex items-baseline gap-3 text-bone-200">
          <span className="text-bone-400">{number}</span>
          <span aria-hidden="true" className="h-px w-5 bg-bone-500/50" />
          <span>{title}</span>
        </h2>
        {caption ? <p className="eyebrow text-bone-500">{caption}</p> : null}
      </header>

      <div className={cx('px-5 py-6 sm:px-7 sm:py-8', bodyClassName)}>{children}</div>
    </GlassCard>
  );
}

/** Standalone reveal wrapper for elements outside a Section. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={cx('reveal', inView && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Section;
