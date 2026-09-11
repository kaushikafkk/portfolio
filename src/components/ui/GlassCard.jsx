import { forwardRef } from 'react';
import { cx } from '@/lib/cx';

/**
 * The single glass surface used across the page.
 *
 * `.glass-card` in `styles/index.css` is the supplied recipe, untouched. Tailwind
 * utilities sit in a later cascade layer, so `w-full`/`h-auto` from
 * `.glass-card--fluid` and any className passed in still override its fixed
 * 240x360 default.
 *
 * variant:
 *   'dark'  — the page default: same structure, tints dialled down for a
 *             near-black background so the glass reads as polished stone.
 *   'inset' — quieter still, for panels nested inside another glass card.
 *   'light' — the recipe exactly as supplied, for use over bright imagery.
 */
export const GlassCard = forwardRef(function GlassCard(
  { as: Tag = 'div', variant = 'dark', fluid = true, className = '', children, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cx(
        'glass-card',
        fluid && 'glass-card--fluid',
        variant === 'dark' && 'glass-card--dark',
        variant === 'inset' && 'glass-card--inset',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default GlassCard;
