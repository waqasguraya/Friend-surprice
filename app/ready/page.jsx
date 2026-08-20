"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { ShieldCheck, Compass, ArrowRight, Radio } from "lucide-react";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--font-display",
});

export default function ReadyPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [embers, setEmbers] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  // Client-side execution to avoid SSR hydration mismatches
  useEffect(() => {
    if (prefersReducedMotion) return;
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 9 + Math.random() * 10,
      size: 2 + Math.random() * 3,
      drift: Math.random() * 40 - 20,
    }));
    setEmbers(generated);
  }, [prefersReducedMotion]);

  const handleProceed = () => {
    router.push("/gate");
  };

  const majorTicks = useMemo(() => Array.from({ length: 12 }), []);
  const minorTicks = useMemo(() => Array.from({ length: 48 }), []);

  return (
    <main
      className={`${display.variable} relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050308] px-4 py-12`}
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#150f2e_0%,#0a0714_45%,#050308_100%)]" />
        <motion.div
          animate={
            prefersReducedMotion ? {} : { opacity: [0.25, 0.45, 0.25] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[18%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]"
        />
        <motion.div
          animate={
            prefersReducedMotion ? {} : { opacity: [0.15, 0.35, 0.15] }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-[-15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[#7c5cff]/15 blur-[140px]"
        />
      </div>

      {/* Rotating Astrolabe */}
      <motion.svg
        viewBox="0 0 800 800"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] sm:h-[820px] sm:w-[820px]"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="400"
          cy="400"
          r="360"
          stroke="#e8b84b"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="400"
          cy="400"
          r="300"
          stroke="#e8b84b"
          strokeWidth="0.75"
          fill="none"
        />
        <circle
          cx="400"
          cy="400"
          r="240"
          stroke="#a87c3f"
          strokeWidth="0.5"
          fill="none"
        />
        {majorTicks.map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = (400 + Math.cos(angle) * 360).toFixed(2);
          const y1 = (400 + Math.sin(angle) * 360).toFixed(2);
          const x2 = (400 + Math.cos(angle) * 335).toFixed(2);
          const y2 = (400 + Math.sin(angle) * 335).toFixed(2);
          return (
            <line
              key={`maj-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e8b84b"
              strokeWidth="1.5"
            />
          );
        })}
        {minorTicks.map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const x1 = (400 + Math.cos(angle) * 360).toFixed(2);
          const y1 = (400 + Math.sin(angle) * 360).toFixed(2);
          const x2 = (400 + Math.cos(angle) * 348).toFixed(2);
          const y2 = (400 + Math.sin(angle) * 348).toFixed(2);
          return (
            <line
              key={`min-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e8b84b"
              strokeWidth="0.5"
            />
          );
        })}
      </motion.svg>

      {/* Floating Embers */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {embers.map((e) => (
            <motion.span
              key={e.id}
              initial={{ y: "100vh", x: 0, opacity: 0 }}
              animate={{ y: "-10vh", x: [0, e.drift, 0], opacity: [0, 0.8, 0] }}
              transition={{
                duration: e.duration,
                delay: e.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${e.left}%`,
                width: e.size,
                height: e.size,
              }}
              className="absolute rounded-full bg-amber-300 shadow-[0_0_6px_2px_rgba(251,191,36,0.5)]"
            />
          ))}
        </div>
      )}

      {/* Fine Grain Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Central Interactive Glass Card */}
      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] px-8 py-11 text-center shadow-[0_30px_80px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:px-12 sm:py-14"
        >
          {/* Corner Accents */}
          <span className="pointer-events-none absolute left-5 top-5 h-4 w-4 border-l border-t border-amber-300/40" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-4 w-4 border-b border-r border-amber-300/40" />

          {/* Compass Header Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/[0.06]"
          >
            <Compass className="h-6 w-6 text-amber-200" strokeWidth={1.25} />
          </motion.div>

          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-5 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-amber-200/70"
          >
            <span className="h-px w-6 bg-amber-200/40" />
            The Threshold Awaits
            <span className="h-px w-6 bg-amber-200/40" />
          </motion.div>

          {/* Page Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-5xl italic tracking-tight text-white sm:text-6xl"
          >
            Are you{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              ready
            </span>
            ?
          </motion.h1>

          {/* Explanatory Text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mx-auto mt-5 max-w-sm text-[15px] font-light leading-relaxed text-white/60"
          >
            Everything on the other side has been shaped specifically for you.
            Take a breath and step forward when you are prepared.
          </motion.p>

          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-white/50"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-emerald-400"
                strokeWidth={1.5}
              />
              <span>World Loaded</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
              <Radio
                className="h-3.5 w-3.5 text-amber-300"
                strokeWidth={1.5}
              />
              <span>Signal Synchronized</span>
            </div>
          </motion.div>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-9"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={handleProceed}
              aria-label="Cross the threshold into the gate"
              className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-9 py-4 text-[15px] font-semibold tracking-wide text-slate-950 shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Are you ready!
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>

              {/* Hover Radial Wave */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isHovered ? { opacity: [0.5, 0], scale: [0.8, 1.6] } : {}
                }
                transition={{
                  duration: 0.9,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute inset-0 rounded-full border border-white/60"
              />

              {/* Shimmer Sweep */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}