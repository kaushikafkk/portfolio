import { useState } from 'react';
import { GMAIL_COMPOSE_URL, PROFILE } from '@/data/content';
import { Icon } from '@/components/ui/Icon';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

const EMPTY = { name: '', email: '', message: '' };

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Add your name so I know who I am replying to.';
  if (!values.email.trim()) errors.email = 'Add an email address for the reply.';
  else if (!isEmail(values.email)) errors.email = 'That email address looks incomplete.';
  if (values.message.trim().length < 10) errors.message = 'Tell me a little more — 10 characters or so.';
  return errors;
}

const fieldClass =
  'w-full rounded-lg border border-bone-500/35 bg-white/[0.03] px-3.5 py-2.5 text-sm ' +
  'text-bone-100 placeholder:text-bone-500 transition-colors duration-300 ' +
  'focus:border-brass-400/60 focus:outline-none';

/**
 * Posts to VITE_CONTACT_ENDPOINT when one is configured. Without an endpoint it
 * falls back to opening Gmail's composer with the message prefilled,
 * so the form works in a plain static deploy.
 */
export function ContactForm({ onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  const update = (field) => (event) => {
    setValues((v) => ({ ...v, [field]: event.target.value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `${GMAIL_COMPOSE_URL}&su=${subject}&body=${body}`;
      setState('sent');
      return;
    }

    setState('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      setState('sent');
      setValues(EMPTY);
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="rounded-xl border border-bone-500/25 bg-white/[0.03] p-6 text-center">
        <Icon name="check" size={22} className="mx-auto text-signal-ok" />
        <p className="mt-4 text-sm text-bone-100">Message on its way.</p>
        <p className="mt-1.5 text-xs text-bone-400">
          {ENDPOINT
            ? 'I read everything and reply within a couple of days.'
            : 'Your mail client should be open with the message ready to send.'}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn-motion mt-5 rounded-full px-2 py-1 font-mono text-2xs uppercase tracking-widest2 text-bone-400 underline-offset-4 hover:text-bone-100 hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            className={fieldClass}
          />
          {errors.name ? (
            <p id="cf-name-error" className="mt-1.5 text-xs text-signal-warn">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="cf-email" className="sr-only">
            Your email address
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            className={fieldClass}
          />
          {errors.email ? (
            <p id="cf-email-error" className="mt-1.5 text-xs text-signal-warn">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="sr-only">
          What you would like to build
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="What would you like to build?"
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className={`${fieldClass} resize-y`}
        />
        {errors.message ? (
          <p id="cf-message-error" className="mt-1.5 text-xs text-signal-warn">
            {errors.message}
          </p>
        ) : null}
      </div>

      {state === 'error' ? (
        <p role="alert" className="text-xs text-signal-warn">
          The message did not send. Try again, or email {PROFILE.emails[0]} directly.
        </p>
      ) : null}

      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-motion group inline-flex items-center gap-2.5 rounded-full border border-brass-500/50 bg-brass-500/[0.08] px-5 py-2.5 text-sm text-brass-400 hover:border-brass-400/70 hover:bg-brass-500/15 disabled:cursor-wait disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending' : 'Send message'}
          <Icon
            name="arrow"
            size={15}
            className="transition-transform duration-500 ease-museum group-hover:translate-x-1"
          />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="btn-motion rounded-full px-2 py-1 font-mono text-2xs uppercase tracking-widest2 text-bone-500 hover:text-bone-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
