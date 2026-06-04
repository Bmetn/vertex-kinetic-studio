import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Archdaily', href: '#' },
];

export default function Footer() {
  return (
    <>
      {/* Global CTA */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <p className="text-xs font-mono text-[var(--color-text-secondary)] tracking-[0.2em] mb-4">
                READY TO BUILD THE IMPOSSIBLE?
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-none">
                LET'S{' '}
                <span className="text-[var(--color-accent)] text-glow">
                  COLLABORATE
                </span>
              </h2>
            </div>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 border border-[var(--color-accent)] px-8 py-4 hover:bg-[var(--color-accent)] transition-colors duration-300"
              >
                <span className="text-sm font-bold tracking-[0.2em] text-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-colors duration-300">
                  START A PROJECT
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-colors duration-300"
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      <footer className="relative border-t border-[var(--color-border)]">


      {/* Bottom Bar */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 lg:gap-6">
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-[var(--color-text-secondary)] tracking-wider">
              © 2025 VERTEX — APEX KINETIC ARCHITECTURE
            </span>
          </div>

          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--color-text-secondary)] tracking-wider hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-[var(--color-text-secondary)] tracking-wider opacity-50">
              SYS.STATUS: ONLINE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
