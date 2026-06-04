import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/projects';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState(getFormattedTime());
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(getFormattedTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-[0_1px_0_rgba(0,255,102,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-[5rem] lg:px-[5rem]">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" style={{ marginLeft: '120px' }}>
              <div className="relative">
                <div className="w-8 h-8 border border-[var(--color-accent)] rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
                <div className="absolute inset-1 border border-[var(--color-accent)] opacity-40 rotate-45 transition-transform duration-700 group-hover:rotate-[135deg]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.3em] text-white leading-none">
                  VERTEX
                </span>
                <span className="text-[9px] tracking-[0.2em] text-[var(--color-text-secondary)] font-mono leading-none mt-0.5">
                  APEX KINETIC
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative px-5 py-2 group"
                  >
                    <span
                      className={`text-xs font-medium tracking-[0.2em] transition-colors duration-300 ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-text-secondary)] group-hover:text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-px bg-[var(--color-accent)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="absolute bottom-0 left-2 right-2 h-px bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Right Side: Clock + Coords */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-[var(--color-text-secondary)] tracking-wider">
                    LOCAL TIME
                  </span>
                  <span className="text-xs font-mono text-[var(--color-accent)] tracking-widest">
                    {time}
                  </span>
                </div>
                <div className="w-px h-8 bg-[var(--color-border)]" />
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-[var(--color-text-secondary)] tracking-wider">
                    COORDINATES
                  </span>
                  <span className="text-xs font-mono text-white/60 tracking-wider">
                    41.0082°N 28.9784°E
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} className="text-[var(--color-accent)]" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={link.href}
                  className="text-3xl font-bold tracking-[0.3em] text-white hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-xs font-mono text-[var(--color-text-secondary)] tracking-wider"
            >
              {time} — 41.0082°N 28.9784°E
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getFormattedTime(): string {
  const now = new Date();
  return [
    now.getHours().toString().padStart(2, '0'),
    now.getMinutes().toString().padStart(2, '0'),
    now.getSeconds().toString().padStart(2, '0'),
  ].join(':');
}
