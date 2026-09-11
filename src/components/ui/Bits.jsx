import { cx } from '@/lib/cx';
import { Icon } from './Icon';

/** Small bordered label used for technologies and project tags. */
export function Chip({ children, className = '' }) {
  return <span className={cx('chip', className)}>{children}</span>;
}

/** A number with its meaning underneath. */
export function Stat({ value, label, className = '' }) {
  return (
    <div className={cx('px-4 py-4 text-center sm:px-5', className)}>
      <p className="font-display text-2xl text-bone-50 sm:text-3xl">{value}</p>
      <p className="mt-1.5 font-mono text-2xs uppercase tracking-widest text-bone-400 sm:tracking-widest2">
        {label}
      </p>
    </div>
  );
}

/** A boxed node in the architecture and pipeline diagrams. */
export function Node({ icon, label, tone = 'default', className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs backdrop-blur-[2px]',
        'btn-motion hover:-translate-y-px hover:border-brass-400/55 hover:text-brass-400',
        'hover:shadow-[0_0_22px_-6px_rgba(201,162,39,0.55)]',
        tone === 'accent'
          ? 'border-brass-500/45 bg-brass-500/[0.07] text-brass-400'
          : 'border-bone-500/35 bg-white/[0.04] text-bone-200',
        className,
      )}
    >
      {icon ? <Icon name={icon} size={14} className="shrink-0 opacity-70" /> : null}
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}

/** Hairline with an optional centred label, used between stacked blocks. */
export function Divider({ label, className = '' }) {
  if (!label) return <div className={cx('rule', className)} />;

  return (
    <div className={cx('flex items-center gap-3', className)}>
      <span className="h-px flex-1 bg-bone-500/25" />
      <span className="eyebrow text-bone-500">{label}</span>
      <span className="h-px flex-1 bg-bone-500/25" />
    </div>
  );
}

/** Text link with the understated underline used throughout the page. */
export function TextLink({ href, children, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={cx(
        'group inline-flex items-center gap-2 text-sm text-bone-200 transition-colors duration-300',
        'hover:text-bone-50',
        className,
      )}
      {...rest}
    >
      <span className="border-b border-bone-500/50 pb-0.5 transition-colors duration-300 group-hover:border-brass-400/70">
        {children}
      </span>
    </a>
  );
}

export default Chip;
