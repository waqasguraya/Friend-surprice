"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Flower2,
  ZoomIn,
} from "lucide-react";

// ─── CONFIG ───────────────────────────────────
const TITLE = "Beautiful Moments";
const SUBTITLE = "Some smiles never fade...";
const NEXT_ROUTE = "/room3";
const IMAGE_IDS = [5, 6, 7, 8];
const getImageSrc = (id) => `/images/${id}.jpeg`;
// ──────────────────────────────────────────────

export default function Room2() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loaded, setLoaded] = useState({});

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % IMAGE_IDS.length);
  }, []);
  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + IMAGE_IDS.length) % IMAGE_IDS.length);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, showNext, showPrev]);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 3,
    }));

    setParticles(generatedParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Bento grid sizing per index
  const getGridClass = (index) => {
    if (index === 0) return "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto";
    if (index === 3) return "md:col-span-2 aspect-[21/9] md:aspect-[21/9]";
    return "aspect-[4/3]";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* ═══ Background ═══ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#02040a] via-[#0f0a1a] to-[#1a0f1f]" />
        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-1/4 h-[600px] w-[600px] rounded-full bg-pink-900/10 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full bg-rose-900/10 blur-[100px]"
        />
      </div>

      {/* Floating Petals/Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-pink-200/15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 10, -10, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ═══ Content ═══ */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Flower2 className="h-4 w-4 text-pink-300" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-pink-200">
              Collection
            </span>
          </motion.div>

          <h1
            className="text-5xl font-bold tracking-tight md:text-7xl"
            style={{ textShadow: "0 0 60px rgba(244,114,182,0.15)" }}
          >
            <span className="bg-gradient-to-r from-pink-200 via-rose-300 to-pink-400 bg-clip-text text-transparent">
              {TITLE}
            </span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-lg font-light text-white/50 md:text-xl"
          >
            {SUBTITLE}
          </motion.p>
        </motion.div>

        {/* Bento Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5"
        >
          {IMAGE_IDS.map((id, index) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-sm ${getGridClass(index)}`}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={getImageSrc(id)}
                alt={`Moment ${id}`}
                loading="lazy"
                onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
                className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  loaded[id] ? "opacity-100" : "opacity-0"
                }`}
              />

              {!loaded[id] && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-white/[0.02]" />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                  <ZoomIn className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Bottom Label */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div>
                  <p className="text-sm font-medium text-white/90">Moment #{id}</p>
                  <div className="mt-1 h-px w-10 bg-pink-400/60" />
                </div>
                <Heart className="h-4 w-4 text-pink-300/70" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(NEXT_ROUTE)}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-rose-500 px-10 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(244,114,182,0.25)] transition-shadow hover:shadow-[0_0_60px_rgba(244,114,182,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Continue to Next Room
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </motion.div>
      </div>

      {/* ═══ Lightbox ═══ */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageSrc(IMAGE_IDS[selectedIndex])}
                alt={`Moment ${IMAGE_IDS[selectedIndex]}`}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-center text-lg font-medium text-white/90">
                  Moment #{IMAGE_IDS[selectedIndex]}
                </p>
                <p className="mt-1 text-center text-sm text-white/50">
                  {selectedIndex + 1} / {IMAGE_IDS.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}