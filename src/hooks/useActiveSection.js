import { useEffect, useState } from 'react';

/**
 * Scroll spy. Returns the id of the section closest to a point one third down
 * the viewport, which reads more naturally than a pure intersection ratio when
 * sections differ a lot in height.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.34;
      let best = ids[0];
      let bestDistance = Infinity;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        const distance = top <= anchor && bottom >= anchor ? 0 : Math.abs(top - anchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = id;
        }
      });

      setActive((current) => (current === best ? current : best));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
