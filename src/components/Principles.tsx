import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { principles } from '../data/projects';

export default function Principles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['10%', '-40%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-40 overflow-hidden border-t border-[var(--color-border)]"
    >
      {/* Section label */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16 mb-16">
        <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.3em] mb-4">
          003 — STUDIO PRINCIPLES
        </p>
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
          OUR{' '}
          <span className="text-[var(--color-accent)] text-glow">
            AXIOMS
          </span>
        </h2>
      </div>

      {/* Kinetic scrolling text band 1 */}
      <motion.div style={{ x: x1 }} className="mb-20">
        <div className="flex items-center gap-8 whitespace-nowrap px-6">
          {[...principles, ...principles].map((p, i) => (
            <div
              key={`band1-${i}`}
              className="flex items-center gap-6 flex-shrink-0"
            >
              <span className="text-[120px] lg:text-[180px] font-black text-white/[0.03] leading-none select-none">
                {p.number}
              </span>
              <span className="text-sm lg:text-base font-bold tracking-[0.3em] text-white/20">
                {p.title}
              </span>
              <span className="text-[var(--color-accent)] opacity-30">
                ◆
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Principle cards */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[var(--color-bg)] p-8 lg:p-12 group hover:bg-[var(--color-bg-elevated)] transition-colors duration-500"
            >
              <div className="flex items-start gap-6">
                <span className="text-5xl lg:text-7xl font-black text-[var(--color-accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-500 leading-none select-none">
                  {principle.number}
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-base lg:text-lg font-bold tracking-[0.2em] text-white mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Kinetic scrolling text band 2 */}
      <motion.div style={{ x: x2 }} className="mt-20">
        <div className="flex items-center gap-12 whitespace-nowrap px-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={`band2-${i}`}
              className="text-[80px] lg:text-[140px] font-black text-white/[0.02] leading-none select-none flex-shrink-0 tracking-tight"
            >
              ZERO—GRAVITY
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
