import { COPYRIGHT, FOOTER_LINKS, FOOTER_PILLARS, PROFILE } from '@/data/content';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-bone-500/20 bg-ink-900/80 backdrop-blur-md">
      <div className="shell grid gap-8 py-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12">
        <a href="#hero" className="flex items-center gap-4">
          <span className="font-display text-lg tracking-tight text-bone-50">
            [{PROFILE.initials}]
          </span>
          <span className="hidden h-8 w-px bg-bone-500/35 sm:block" />
          <span className="hidden sm:block">
            <span className="block text-sm text-bone-100">{PROFILE.name}</span>
            <span className="mt-0.5 block font-mono text-2xs uppercase tracking-widest2 text-bone-500">
              {PROFILE.role}
            </span>
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-bone-400 transition-colors duration-300 hover:text-bone-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:gap-3">
          <p className="font-mono text-2xs tracking-widest2 text-bone-500">{COPYRIGHT}</p>
          <ul className="flex gap-x-4 font-mono text-2xs uppercase tracking-widest2 text-bone-500">
            {FOOTER_PILLARS.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
