import { useCallback, useState } from 'react';

import { cx } from '@/lib/cx';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Ambient } from '@/components/layout/Ambient';
import { Navbar } from '@/components/layout/Navbar';
import { Preloader } from '@/components/layout/Preloader';
import { Footer } from '@/components/layout/Footer';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { AIMLSection } from '@/components/sections/AIMLSection';
import { Stack } from '@/components/sections/Stack';
import { Architecture } from '@/components/sections/Architecture';
import { CloudDevOps } from '@/components/sections/CloudDevOps';
import { Achievements } from '@/components/sections/Achievements';
import { Learning } from '@/components/sections/Learning';
import { Philosophy } from '@/components/sections/Philosophy';
import { Contact } from '@/components/sections/Contact';

/**
 * Sections 02–12 stack in a single column, one full-width glass card each,
 * in strict 02 → 12 order at every breakpoint.
 */
export function App() {
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);

  useSmoothScroll();

  return (
    <>
      {/* The curtain unmounts itself once it has finished lifting. */}
      <Preloader onDone={onLoaded} />

      {/* Opacity only — a transform or filter here would turn the fixed navbar
          and ambient layer into absolutely positioned ones. */}
      <div
        className={cx(
          'transition-opacity duration-1000 ease-museum',
          ready ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Ambient />
        <Navbar />

        <main
          className={cx(
            'relative z-10 transition-[opacity,transform] duration-1000 ease-museum',
            ready ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          <Hero />

          <div className="shell flex flex-col gap-5 py-5">
            <About />
            <Experience />
            <Projects />
            <AIMLSection />
            <Stack />
            <Architecture />
            <CloudDevOps />
            <Achievements />
            <Learning />
            <Philosophy />
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
