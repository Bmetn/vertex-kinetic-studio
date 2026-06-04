import { motion } from 'framer-motion';
import { team } from '../data/projects';
import { MapPin } from 'lucide-react';

export default function StudioPage() {
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
              ABOUT — VERTEX
            </p>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10">
              WE BUILD
              <br />
              <span className="text-[var(--color-accent)] text-glow">
                IMPOSSIBLE
              </span>
              <br />
              STRUCTURES
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              Founded in 2019, Vertex is a multidisciplinary design studio operating at
              the intersection of brutalist architecture, kinetic engineering, and
              computational design. We don't follow trends — we engineer the future of
              spatial experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
            {[
              { value: '47', label: 'PROJECTS COMPLETED' },
              { value: '12', label: 'COUNTRIES' },
              { value: '6', label: 'DESIGN AWARDS' },
              { value: '∞', label: 'AMBITION LIMIT' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[var(--color-bg)] p-8 lg:p-12 text-center"
              >
                <span className="text-4xl lg:text-6xl font-black text-[var(--color-accent)] text-glow">
                  {stat.value}
                </span>
                <p className="mt-3 text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
          <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.3em] mb-4">
            THE COLLECTIVE
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-16">
            OUR{' '}
            <span className="text-[var(--color-accent)] text-glow">TEAM</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] items-start">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="bg-[var(--color-bg)] p-8 group hover:bg-[var(--color-bg-elevated)] transition-colors duration-500 flex flex-col h-full"
              >
                <div className="w-12 h-12 border border-[var(--color-accent)] opacity-30 group-hover:opacity-80 mb-6 flex items-center justify-center transition-opacity duration-500">
                  <span className="text-xs font-mono text-[var(--color-accent)]">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-wide text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.15em] mb-3">
                  {member.role.toUpperCase()}
                </p>
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mt-auto pt-4">
                  <MapPin size={12} />
                  <span className="text-xs font-mono tracking-wider">
                    {member.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
