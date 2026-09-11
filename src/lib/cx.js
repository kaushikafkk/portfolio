/** Tiny classname joiner — drops false, null and undefined. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default cx;
