import { useEffect, useMemo, useState } from 'react';
import { NAV_GROUPS, PROFILE, SECTIONS } from '@/data/content';
import { usePageProgress } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { getLenis } from '@/hooks/useSmoothScroll';
import { cx } from '@/lib/cx';

const SECTION_IDS = SECTIONS.map((s) => s.id);

/** First section belonging to a nav group, so the group links go somewhere. */
const groupTarget = (group) => SECTIONS.find((s) => s.group === group)?.id ?? 'hero';

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const progress = usePageProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeSection = useMemo(
    () => SECTIONS.find((s) => s.id === active) ?? SECTIONS[0],
    [active],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lenis scrolls the window itself, so `overflow: hidden` alone would not stop
  // the page moving behind the open drawer.
  useEffect(() => {
    const lenis = getLenis();
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) lenis?.stop();
    else lenis?.start();

    return () => {
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink-700 focus:px-4 focus:py-2 focus:text-sm focus:text-bone-50"
      >
        Skip to content
      </a>

      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-museum',
          scrolled
            ? 'bg-ink-900/72 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]'
            : 'bg-transparent',
        )}
      >
        {/* reading rule — the only always-on motion in the chrome */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-brass-500/70 via-brass-400 to-transparent transition-transform duration-150 ease-linear"
          style={{ transform: `scaleX(${progress})` }}
        />

        <nav className="shell flex items-start justify-between gap-4 py-4 sm:py-5" aria-label="Sections">
          <a
            href="#hero"
            className="group flex items-center gap-3 pt-1"
            aria-label={`${PROFILE.name} — back to top`}
          >
            <span className="border-l border-bone-500/50 pl-3 font-display text-lg tracking-tight text-bone-50 transition-colors duration-300 group-hover:text-brass-400 sm:text-xl">
              [{PROFILE.initials}]
            </span>
          </a>

          {/* desktop: full 01–12 counter */}
          <div className="hidden flex-col items-end gap-2.5 lg:flex">
            <ol className="flex items-center gap-1 rounded-full border border-bone-500/30 bg-ink-800/60 px-3 py-1.5 backdrop-blur-md">
              <li aria-hidden="true" className="pr-1.5">
                <span className="block h-1.5 w-1.5 rounded-full bg-brass-400 animate-pulseDot" />
              </li>
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={section.id === active ? 'true' : undefined}
                    title={section.label}
                    className={cx(
                      'btn-motion relative block rounded px-1.5 py-0.5 font-mono text-[0.7rem] tracking-widest',
                      section.id === active
                        ? 'text-bone-50'
                        : 'text-bone-500 hover:text-bone-200',
                    )}
                  >
                    {section.number}
                    {/* marker grows out from the centre as the section takes over */}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute inset-x-1 -bottom-0.5 h-px origin-center bg-brass-400',
                        'transition-transform duration-500 ease-museum',
                        section.id === active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </a>
                </li>
              ))}
            </ol>

            <ul className="flex items-center gap-3 pr-2 font-mono text-[0.7rem] text-bone-400">
              {NAV_GROUPS.map((group, i) => (
                <li key={group} className="flex items-center gap-3">
                  <a
                    href={`#${groupTarget(group)}`}
                    className={cx(
                      'transition-colors duration-300 hover:text-bone-50',
                      activeSection.group === group && 'text-bone-100',
                    )}
                  >
                    {group}
                  </a>
                  {i < NAV_GROUPS.length - 1 ? (
                    <span aria-hidden="true" className="text-bone-500/60">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* mobile: current section + menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <span className="font-mono text-[0.7rem] tracking-widest text-bone-400">
              {activeSection.number}
              <span className="px-1 text-bone-500/60">/</span>
              12
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="btn-motion flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md border border-bone-500/35 bg-ink-800/70 hover:border-brass-400/50"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span
                aria-hidden="true"
                className={cx(
                  'h-px w-4 bg-bone-200 transition-transform duration-300',
                  menuOpen && 'translate-y-[3px] rotate-45',
                )}
              />
              <span
                aria-hidden="true"
                className={cx(
                  'h-px w-4 bg-bone-200 transition-transform duration-300',
                  menuOpen && '-translate-y-[3px] -rotate-45',
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <div
        id="mobile-nav"
        className={cx(
          'fixed inset-0 z-40 bg-ink-900/96 backdrop-blur-xl transition-opacity duration-400 lg:hidden',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ol className="shell no-scrollbar h-full overflow-y-auto pb-16 pt-24">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 border-b border-bone-500/15 py-3.5"
              >
                <span className="font-mono text-[0.7rem] text-bone-500">{section.number}</span>
                <span
                  className={cx(
                    'font-display text-xl',
                    section.id === active ? 'text-bone-50' : 'text-bone-300',
                  )}
                >
                  {section.label}
                </span>
                <span className="ml-auto font-mono text-2xs uppercase tracking-widest2 text-bone-500">
                  {section.group}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default Navbar;
