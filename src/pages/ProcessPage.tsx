import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'PARAMETRIC ANALYSIS',
    description:
      'We begin by mapping environmental forces — wind loads, seismic profiles, solar vectors — using proprietary computational models that inform every structural decision.',
    detail: 'DURATION: 4–6 WEEKS',
  },
  {
    number: '02',
    title: 'MATERIAL RESEARCH',
    description:
      'Each project demands its own material language. We test composites, aggregates, and alloys in our material lab, pushing boundaries beyond standard structural catalogs.',
    detail: 'DURATION: 3–8 WEEKS',
  },
  {
    number: '03',
    title: 'KINETIC PROTOTYPING',
    description:
      'Moving parts require physical proof. We build 1:20 scale kinetic models with embedded sensors to validate movement systems before committing to full production.',
    detail: 'DURATION: 6–12 WEEKS',
  },
  {
    number: '04',
    title: 'STRUCTURAL ENGINEERING',
    description:
      'Our structural engineers work hand-in-hand with designers, using FEA simulations and topology optimization to achieve maximum efficiency with minimum material.',
    detail: 'DURATION: 8–16 WEEKS',
  },
  {
    number: '05',
    title: 'FABRICATION & ASSEMBLY',
    description:
      'We partner with specialized fabricators worldwide. CNC-milled formwork, robotic welding, and precision casting ensure every element meets sub-millimeter tolerances.',
    detail: 'DURATION: 12–52 WEEKS',
  },
];

export default function ProcessPage() {
  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="relative py-24 lg:py-40 border-b border-[var(--color-border)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.3em] mb-6">
              OUR METHODOLOGY
            </p>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10">
              FROM{' '}
              <span className="text-[var(--color-accent)] text-glow">
                CONCEPT
              </span>
              <br />
              TO MONOLITH
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              Our five-phase process transforms abstract structural visions into
              physical reality. Every project follows this rigorous methodology,
              ensuring precision at every scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-[var(--color-border)] py-12 lg:py-16 group hover:bg-[var(--color-bg-elevated)] transition-colors duration-500 px-4 lg:px-8 -mx-4 lg:-mx-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16">
                  <span className="text-5xl lg:text-7xl font-black text-[var(--color-accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-500 leading-none lg:w-40 flex-shrink-0">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold tracking-[0.15em] text-white mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-4">
                      {step.description}
                    </p>
                    <span className="text-[10px] font-mono text-[var(--color-accent)] tracking-[0.2em] opacity-60">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
