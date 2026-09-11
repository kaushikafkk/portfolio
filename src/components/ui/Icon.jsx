/**
 * Line icons drawn inline so the architecture and pipeline diagrams stay crisp
 * at any size and inherit text colour. Raster icons from the asset pack are
 * used where the pack provides a real logo (AWS, Kubernetes, Terraform, GCP).
 */

const paths = {
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c.9-3.6 3.6-5.4 7-5.4s6.1 1.8 7 5.4" />
    </>
  ),
  cloud: <path d="M7 18h10a3.6 3.6 0 0 0 .5-7.16 5.2 5.2 0 0 0-10-1.2A3.9 3.9 0 0 0 7 18Z" />,
  shuffle: (
    <>
      <path d="M4 7h3.5l9 10H20" />
      <path d="M4 17h3.5l9-10H20" />
      <path d="m17 4 3 3-3 3" />
      <path d="m17 14 3 3-3 3" />
    </>
  ),
  gateway: (
    <>
      <rect x="3.5" y="4.5" width="7" height="6" rx="1.4" />
      <rect x="13.5" y="4.5" width="7" height="6" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="6" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="6" rx="1.4" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  grid: (
    <>
      <circle cx="7" cy="7" r="2.4" />
      <circle cx="17" cy="7" r="2.4" />
      <circle cx="7" cy="17" r="2.4" />
      <circle cx="17" cy="17" r="2.4" />
      <path d="M9.4 7h5.2M7 9.4v5.2M17 9.4v5.2M9.4 17h5.2" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6.4" rx="7" ry="2.8" />
      <path d="M5 6.4v11.2c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V6.4" />
      <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m3.8 7.2 8.2 6 8.2-6" />
    </>
  ),
  phone: (
    <path d="M7.2 3.8h3l1.4 3.6-2 1.4a11.4 11.4 0 0 0 5.6 5.6l1.4-2 3.6 1.4v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 5.2 6a2 2 0 0 1 2-2.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s6.6-6 6.6-10.6a6.6 6.6 0 1 0-13.2 0C5.4 15 12 21 12 21Z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.6V17M8 7.4v.1M12 17v-3.6a2 2 0 0 1 4 0V17" />
    </>
  ),
  github: (
    <path d="M9.2 20v-2.4c-3 .6-3.7-1.4-3.7-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-5-1.2-5-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.1-2.6 5-5.1 5.3.4.4.8 1.1.8 2.2V20" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  arrow: <path d="M5 12h13m-5.5-5.5L19 12l-6.5 5.5" />,
  spark: (
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  download: (
    <>
      <path d="M12 4v10.5" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </>
  ),
};

export function Icon({ name, size = 18, strokeWidth = 1.4, className = '', title }) {
  const shape = paths[name];
  if (!shape) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {shape}
    </svg>
  );
}

export default Icon;
