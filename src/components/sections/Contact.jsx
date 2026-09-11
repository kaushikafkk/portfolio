import { useState } from 'react';
import { CONTACT_CONTENT, GMAIL_COMPOSE_URL, PROFILE, SOCIALS } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/lib/cx';
import { ContactForm } from './ContactForm';

/** Matches the grid-row transition duration below — keep the two in sync. */
const COLLAPSE_MS = 650;

/** 12 — Contact. The form grows open in place; nothing navigates away. */
export function Contact({ className = '' }) {
  const [open, setOpen] = useState(false);
  const [formMounted, setFormMounted] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  const openForm = () => {
    setSessionId((n) => n + 1); // fresh ContactForm instance every time it opens
    setFormMounted(true);
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
    window.setTimeout(() => setFormMounted(false), COLLAPSE_MS);
  };

  const details = [
    ...PROFILE.emails.map((email) => ({
      icon: 'mail',
      label: email,
      href: GMAIL_COMPOSE_URL,
    })),
    { icon: 'phone', label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
    { icon: 'pin', label: PROFILE.location, href: null },
  ];

  return (
    <Section
      className={className}
      id="contact"
      number="12"
      title="Contact"
      caption={CONTACT_CONTENT.eyebrow}
      bodyClassName="relative"
    >
      <div aria-hidden="true" className="light-shaft pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h3 className="font-display text-title uppercase leading-[0.98] text-bone-50">
            {CONTACT_CONTENT.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="mt-5 text-sm text-bone-300">{CONTACT_CONTENT.invitation}</p>
        </div>

        <GlassCard variant="inset" className="p-5 sm:p-6">
          <ul className="space-y-3">
            {details.map((detail) => (
              <li key={detail.label} className="flex items-center gap-3.5">
                <Icon name={detail.icon} size={16} className="shrink-0 text-bone-500" />
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="break-all text-sm text-bone-200 transition-colors duration-300 hover:text-brass-400"
                  >
                    {detail.label}
                  </a>
                ) : (
                  <span className="text-sm text-bone-300">{detail.label}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="rule my-5" />

          <ul className="flex flex-wrap gap-2.5">
            {SOCIALS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="btn-motion flex h-10 w-10 items-center justify-center rounded-lg border border-bone-500/35 bg-white/[0.03] text-bone-300 hover:border-brass-400/50 hover:text-brass-400"
                >
                  <Icon name={social.id} size={17} title={social.label} />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative mt-6">
            {/* the trigger sits at its normal in-flow position, then drops out
                of flow (static position, unchanged) and fades as the form
                takes over — it never affects the grid row's height below */}
            <button
              type="button"
              onClick={openForm}
              className={cx(
                'btn-motion group flex w-full items-center justify-center gap-3 rounded-full border border-bone-500/45 px-5 py-3 text-sm text-bone-100',
                'hover:border-brass-400/60 hover:bg-brass-500/[0.06] hover:text-brass-400',
                'transition-[opacity,transform] duration-300 ease-museum',
                open
                  ? 'pointer-events-none absolute -translate-y-1 opacity-0'
                  : 'relative translate-y-0 opacity-100',
              )}
            >
              {CONTACT_CONTENT.cta}
              <Icon
                name="arrow"
                size={15}
                className="transition-transform duration-500 ease-museum group-hover:translate-x-1"
              />
            </button>

            {/* the card's real growth: a grid row tweened 0fr -> 1fr, so the
                box genuinely expands to the form's height instead of the form
                just appearing at full size. `overflow-hidden` on the row's one
                item is what lets a 0fr track collapse past its content's
                intrinsic minimum height. */}
            <div
              className="grid transition-[grid-template-rows] duration-[650ms] ease-museum"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                {formMounted ? (
                  <div
                    key={sessionId}
                    className={cx(
                      'animate-formReveal transition-opacity duration-300 ease-museum',
                      !open && 'opacity-0',
                    )}
                  >
                    <ContactForm onClose={closeForm} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

export default Contact;
