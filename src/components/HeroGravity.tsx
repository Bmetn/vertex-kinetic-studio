import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

/* ─── Types ────────────────────────────────────────── */
interface FloatingBlock {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  vr: number;
  label: string;
  hue: number;
}

interface CableConnection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

/* ─── Constants ────────────────────────────────────── */
const BLOCK_LABELS = [
  'VOL-A1', 'STR-B2', 'MOD-C3', 'KIN-D4',
  'TEN-E5', 'AXS-F6', 'NOD-G7', 'VEX-H8',
];

const CABLE_MAX_DIST = 280;
const DAMPING = 0.995;
const BOUNCE = 0.6;

function createBlocks(width: number, height: number): FloatingBlock[] {
  return BLOCK_LABELS.map((label, i) => ({
    id: i,
    x: Math.random() * (width - 120) + 60,
    y: Math.random() * (height - 100) + 50,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    width: 60 + Math.random() * 80,
    height: 40 + Math.random() * 60,
    rotation: Math.random() * 20 - 10,
    vr: (Math.random() - 0.5) * 0.3,
    label,
    hue: 140 + i * 5,
  }));
}

export default function HeroGravity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<FloatingBlock[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number>(0);
  const [gravity, setGravity] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  /* ─── Resize ──────────────────────────────────── */
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      setDimensions({ w, h });

      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = w * dpr;
        canvasRef.current.height = h * dpr;
        canvasRef.current.style.width = `${w}px`;
        canvasRef.current.style.height = `${h}px`;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
      }

      if (blocksRef.current.length === 0) {
        blocksRef.current = createBlocks(w, h);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  /* ─── Mouse tracking ─────────────────────────── */
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };
    
    const handleGlobalMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseout', handleGlobalMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseout', handleGlobalMouseLeave);
    };
  }, []);

  /* ─── Animation loop ─────────────────────────── */
  useEffect(() => {
    const { w, h } = dimensions;
    if (w === 0 || h === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const blocks = blocksRef.current;
      const mouse = mouseRef.current;
      const grav = gravity * 0.15;

      /* Update physics */
      for (const b of blocks) {
        b.vy += grav;

        /* Mouse repulsion */
        if (mouse.active) {
          const dx = b.x + b.width / 2 - mouse.x;
          const dy = b.y + b.height / 2 - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const force = (180 - dist) / 180 * 0.8;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
            b.vr += (Math.random() - 0.5) * 0.15;
          }
        }

        b.vx *= DAMPING;
        b.vy *= DAMPING;
        b.vr *= DAMPING;

        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.vr;

        /* Boundary bounce */
        if (b.x < 0) { b.x = 0; b.vx *= -BOUNCE; }
        if (b.x + b.width > w) { b.x = w - b.width; b.vx *= -BOUNCE; }
        if (b.y < 0) { b.y = 0; b.vy *= -BOUNCE; }
        if (b.y + b.height > h) { b.y = h - b.height; b.vy *= -BOUNCE; }
      }

      /* Compute cables */
      const cables: CableConnection[] = [];
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const a = blocks[i];
          const b = blocks[j];
          const cx1 = a.x + a.width / 2;
          const cy1 = a.y + a.height / 2;
          const cx2 = b.x + b.width / 2;
          const cy2 = b.y + b.height / 2;
          const dist = Math.sqrt((cx1 - cx2) ** 2 + (cy1 - cy2) ** 2);
          if (dist < CABLE_MAX_DIST) {
            cables.push({
              x1: cx1, y1: cy1,
              x2: cx2, y2: cy2,
              opacity: 1 - dist / CABLE_MAX_DIST,
            });
          }
        }
      }

      /* Draw */
      ctx.clearRect(0, 0, w, h);

      /* Draw cables */
      for (const c of cables) {
        ctx.beginPath();
        ctx.moveTo(c.x1, c.y1);
        ctx.lineTo(c.x2, c.y2);
        ctx.strokeStyle = `rgba(0, 255, 102, ${c.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        /* Glow */
        ctx.beginPath();
        ctx.moveTo(c.x1, c.y1);
        ctx.lineTo(c.x2, c.y2);
        ctx.strokeStyle = `rgba(0, 255, 102, ${c.opacity * 0.15})`;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      /* Draw blocks */
      for (const b of blocks) {
        ctx.save();
        ctx.translate(b.x + b.width / 2, b.y + b.height / 2);
        ctx.rotate((b.rotation * Math.PI) / 180);

        /* Block body */
        ctx.fillStyle = 'rgba(24, 27, 34, 0.8)';
        ctx.fillRect(-b.width / 2, -b.height / 2, b.width, b.height);

        /* Border */
        const isNearMouse =
          mouse.active &&
          Math.abs(b.x + b.width / 2 - mouse.x) < 150 &&
          Math.abs(b.y + b.height / 2 - mouse.y) < 150;

        ctx.strokeStyle = isNearMouse
          ? 'rgba(0, 255, 102, 0.8)'
          : 'rgba(0, 255, 102, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-b.width / 2, -b.height / 2, b.width, b.height);

        /* Corner accents */
        const cornerLen = 6;
        ctx.strokeStyle = isNearMouse
          ? 'rgba(0, 255, 102, 1)'
          : 'rgba(0, 255, 102, 0.5)';
        ctx.lineWidth = 1.5;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(-b.width / 2, -b.height / 2 + cornerLen);
        ctx.lineTo(-b.width / 2, -b.height / 2);
        ctx.lineTo(-b.width / 2 + cornerLen, -b.height / 2);
        ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(b.width / 2 - cornerLen, -b.height / 2);
        ctx.lineTo(b.width / 2, -b.height / 2);
        ctx.lineTo(b.width / 2, -b.height / 2 + cornerLen);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(b.width / 2, b.height / 2 - cornerLen);
        ctx.lineTo(b.width / 2, b.height / 2);
        ctx.lineTo(b.width / 2 - cornerLen, b.height / 2);
        ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(-b.width / 2 + cornerLen, b.height / 2);
        ctx.lineTo(-b.width / 2, b.height / 2);
        ctx.lineTo(-b.width / 2, b.height / 2 - cornerLen);
        ctx.stroke();

        /* Label */
        ctx.fillStyle = isNearMouse
          ? 'rgba(0, 255, 102, 0.9)'
          : 'rgba(0, 255, 102, 0.4)';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, 0, 0);

        /* Glow effect when near mouse */
        if (isNearMouse) {
          ctx.shadowColor = 'rgba(0, 255, 102, 0.3)';
          ctx.shadowBlur = 20;
          ctx.strokeStyle = 'rgba(0, 255, 102, 0.1)';
          ctx.strokeRect(-b.width / 2 - 4, -b.height / 2 - 4, b.width + 8, b.height + 8);
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dimensions, gravity]);

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Title Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs lg:text-sm font-mono text-[var(--color-accent)] tracking-[0.4em] mb-6 opacity-70">
            APEX KINETIC ARCHITECTURE
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[120px] xl:text-[150px] font-black tracking-tight leading-[0.85] text-white">
            WE SHAPE
            <br />
            <span className="text-[var(--color-accent)] text-glow">VACUUM</span>
          </h1>
          <p className="mt-8 text-sm lg:text-base text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed font-light">
            Defying convention through kinetic structures, anti-gravity
            engineering, and brutalist material honesty.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.3em]">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[var(--color-accent)] to-transparent"
          />
        </motion.div>
      </div>

      {/* Background Canvas Layer */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* Gravity Controller */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 right-0 z-20 glass border border-[var(--color-border)] p-4 w-56"
      >
        <div className="flex items-center gap-2 mb-3">
          <Gauge size={14} className="text-[var(--color-accent)]" />
          <span className="text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.2em]">
            GRAVITY CONTROL
          </span>
        </div>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.5"
          value={gravity}
          onChange={(e) => setGravity(parseFloat(e.target.value))}
          className="w-full h-1 appearance-none bg-[var(--color-border)] rounded-none outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:bg-[var(--color-accent)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,102,0.5)]
            [&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:h-3
            [&::-moz-range-thumb]:bg-[var(--color-accent)]
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-2">
          <span className="text-[9px] font-mono text-[var(--color-text-secondary)]">
            \u2191 ANTI
          </span>
          <span className="text-[10px] font-mono text-[var(--color-accent)]">
            {gravity.toFixed(1)}g
          </span>
          <span className="text-[9px] font-mono text-[var(--color-text-secondary)]">
            PULL \u2193
          </span>
        </div>
      </motion.div>

      {/* Corner coordinates */}
      <div className="absolute top-24 left-8 lg:left-16 z-10 coord-mark">
        X: 0.000 &nbsp; Y: 0.000
      </div>
      <div className="absolute top-24 right-8 lg:right-16 z-10 coord-mark">
        W: {dimensions.w} &nbsp; H: {dimensions.h}
      </div>
    </section>
  );
}
