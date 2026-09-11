/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#050505', // page base
          800: '#0a0a0b', // section base
          700: '#0f0f11', // raised panel
          600: '#151517', // card base
          500: '#1d1d20', // hairline fill
        },
        bone: {
          50: '#f7f5f1', // brightest display text
          100: '#e8e5df',
          200: '#c9c5bd', // body text
          300: '#9c988f', // muted body
          400: '#6e6a63', // captions / eyebrow
          500: '#45423d', // hairline borders
        },
        brass: {
          400: '#e3c288', // highlight (dome light)
          500: '#c9a227', // primary accent
          600: '#8a6f22',
        },
        signal: {
          ok: '#63d29a',
          warn: '#e0b341',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.18em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.22em' }],
        display: ['clamp(2.6rem, 6.2vw, 5.25rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        title: ['clamp(1.9rem, 3.6vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        heading: ['clamp(1.35rem, 2.2vw, 2rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        shell: '1480px',
      },
      borderRadius: {
        glass: '20px',
      },
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        glass:
          '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0px 0px rgba(255, 255, 255, 0)',
        'glass-dark':
          '0 18px 48px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(255, 255, 255, 0.03)',
        lift: '0 24px 60px -24px rgba(0, 0, 0, 0.9)',
      },
      transitionTimingFunction: {
        museum: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        dust: {
          '0%': { transform: 'translate3d(0,0,0)', opacity: '0' },
          '12%': { opacity: '0.5' },
          '88%': { opacity: '0.4' },
          '100%': { transform: 'translate3d(14px,-120px,0)', opacity: '0' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        flow: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-28' },
        },
        /* A request travelling down one connector of the architecture diagram. */
        trace: {
          '0%': { transform: 'translateY(-120%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(420%)', opacity: '0' },
        },
        /* The contact form's fields dropping into place as its card grows. */
        formReveal: {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        dust: 'dust 14s linear infinite',
        sweep: 'sweep 2.8s ease-in-out infinite',
        pulseDot: 'pulseDot 2.4s ease-in-out infinite',
        flow: 'flow 1.4s linear infinite',
        trace: 'trace 2.6s ease-in-out infinite',
        formReveal: 'formReveal 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s both',
      },
    },
  },
  plugins: [],
};
