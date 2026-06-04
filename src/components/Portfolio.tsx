import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Ruler, Layers, Calendar, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const statusColors: Record<Project['status'], string> = {
  completed: 'bg-[var(--color-accent)]',
  'in-progress': 'bg-yellow-400',
  concept: 'bg-blue-400',
};

const statusLabels: Record<Project['status'], string> = {
  completed: 'COMPLETE',
  'in-progress': 'IN PROGRESS',
  concept: 'CONCEPT',
};

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', ...new Set(projects.map((p) => p.category))];

  const filtered =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative py-24 lg:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6" style={{ marginTop: "50px" }}>
          <div>
            <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.3em] mb-4">
              002 — SELECTED WORK
            </p>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
              PROJECT{' '}
              <span className="text-[var(--color-accent)] text-glow">
                ARCHIVE
              </span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-[10px] font-mono tracking-[0.15em] border transition-all duration-300 ${
                  filter === cat
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-dim)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[var(--color-border)]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.05,
                  layout: { type: 'spring', stiffness: 300, damping: 30 },
                }}
                className="relative bg-[var(--color-bg)] group cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === project.id ? 1.08 : 1,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`}
                    />
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/70">
                      {statusLabels[project.status]}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-mono text-white/50 tracking-wider">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
                    />
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] font-mono tracking-wider mb-4">
                    {project.category.toUpperCase()}
                  </p>

                  {/* Technical Specs — slides out on hover */}
                  <AnimatePresence>
                    {hoveredId === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--color-border)] pt-4 space-y-2">
                          <SpecRow
                            icon={<MapPin size={12} />}
                            label="LOCATION"
                            value={project.location}
                          />
                          <SpecRow
                            icon={<Ruler size={12} />}
                            label="DIMENSIONS"
                            value={project.dimensions}
                          />
                          <SpecRow
                            icon={<Layers size={12} />}
                            label="MATERIAL"
                            value={project.material}
                          />
                          <SpecRow
                            icon={<Calendar size={12} />}
                            label="YEAR"
                            value={String(project.year)}
                          />
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-3">
                            {project.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-[var(--color-accent)]"
                  initial={{ width: '0%' }}
                  animate={{
                    width: hoveredId === project.id ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SpecRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[var(--color-accent)] opacity-60">{icon}</span>
      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] tracking-[0.15em] w-20 flex-shrink-0">
        {label}
      </span>
      <span className="text-xs text-white/80 font-mono">{value}</span>
    </div>
  );
}
