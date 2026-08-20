"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Images,
  ZoomIn,
} from "lucide-react";

// ─── CONFIG ───────────────────────────────────
const TITLE = "Hall of Memories";
const SUBTITLE = "Every picture tells a beautiful story...";
const NEXT_ROUTE = "/room2";
const IMAGE_IDS = [1, 2, 3, 4];
const getImageSrc = (id) => `/images/${id}.jpeg`;

// Custom messages for each photo
const OVERLAY_MESSAGES = {
  1: "The day we couldn't stop laughing until our stomachs hurt! 😂",
  2: "Unplanned adventures always lead to the absolute best memories. ✨",
  3: "Just a reminder of how lucky I am to have a friend like you. 💛",
  4: "Here's to a thousand more moments as special as this one. 🥂",
};

const FLOWER_SVGS = [
  "/flower1.svg",
  "/flower2.svg",
  "/flower3.svg",
  "/flower4.svg",
  "/flower5.svg",
];

// CSS Filter classes to colorize monochrome SVGs into vibrant hues
const FLOWER_COLORS = [
  "invert-[.75] sepia-[1] saturate-[50] hue-rotate-[0deg]",    // Bright Yellow
  "invert-[.5] sepia-[1] saturate-[50] hue-rotate-[315deg]",  // Vivid Red
  "invert-[.6] sepia-[1] saturate-[40] hue-rotate-[290deg]",  // Warm Pink
  "invert-[.5] sepia-[1] saturate-[40] hue-rotate-[230deg]",  // Neon Purple
  "invert-[.7] sepia-[1] saturate-[40] hue-rotate-[140deg]",  // Bright Cyan
];
// ──────────────────────────────────────────────

export default function Hallway() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loaded, setLoaded] = useState({});

  // Lightbox navigation
  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % IMAGE_IDS.length);
  }, []);
  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + IMAGE_IDS.length) % IMAGE_IDS.length);
  }, []);

  // Keyboard support for lightbox
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

  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    // Generate 70 tiny vibrant flowers across the background
    const generatedFlowers = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      svgPath: FLOWER_SVGS[i % FLOWER_SVGS.length],
      colorClass: FLOWER_COLORS[i % FLOWER_COLORS.length],
      x: Math.random() * 95 + 2.5,
      y: Math.random() * 90 + 5,
      size: Math.floor(Math.random() * 10) + 12, // 12px to 22px
      rotate: Math.random() * 360,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
    }));

    setFlowers(generatedFlowers);
  }, []);

  // Staggered gallery entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* ═══ Background Ambience ═══ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#0a0e27] to-[#1a103c]" />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-900/15 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-900/10 blur-[100px]"
        />
      </div>

      {/* ═══ Tiny Floating Colorful Flowers ═══ */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {flowers.map((flower) => (
          <motion.div
            key={`flower-${flower.id}`}
            className="absolute flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{
              top: `${flower.y}%`,
              left: `${flower.x}%`,
              width: `${flower.size}px`,
              height: `${flower.size}px`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 8, 0],
              rotate: [flower.rotate, flower.rotate + 180, flower.rotate + 360],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: flower.duration,
              repeat: Infinity,
              delay: flower.delay,
              ease: "easeInOut",
            }}
          >
            <Image
              src={flower.svgPath}
              alt="Flower"
              width={flower.size}
              height={flower.size}
              style={{ width: `${flower.size}px`, height: `${flower.size}px` }}
              className={`object-contain ${flower.colorClass}`}
              unoptimized
            />
          </motion.div>
        ))}
      </div>

      {/* ═══ Content ═══ */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Images className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-200">
              Gallery
            </span>
          </motion.div>

          <h1
            className="text-5xl font-bold tracking-tight md:text-7xl"
            style={{ textShadow: "0 0 60px rgba(251,191,36,0.15)" }}
          >
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {TITLE}
            </span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
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

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6"
        >
          {IMAGE_IDS.map((id, index) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-sm ${
                index === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]"
              }`}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image */}
              <img
                src={getImageSrc(id)}
                alt={`Memory ${id}`}
                loading="lazy"
                onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
                className={`h-full w-full object-cover transition-all duration-700 ${
                  loaded[id] ? "opacity-80 group-hover:opacity-100" : "opacity-0"
                } group-hover:scale-110`}
              />

              {/* Shimmer placeholder */}
              {!loaded[id] && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-white/[0.02]" />
              )}

              {/* Hover Dark Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Hover Text Message */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                <p className="translate-y-4 text-base font-medium text-amber-100 tracking-wide transition-transform duration-500 group-hover:translate-y-0 md:text-lg">
                  {OVERLAY_MESSAGES[id] || `Memory #${id}`}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
                  <ZoomIn className="h-3.5 w-3.5 text-amber-300" />
                  <span>Click to view photo</span>
                </div>
              </div>

              {/* Bottom Label */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-xs uppercase tracking-widest text-amber-400/80">Memory #{id}</p>
                <div className="mt-1 h-px w-12 bg-amber-400/60" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(NEXT_ROUTE)}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(251,191,36,0.25)] transition-shadow hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]"
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
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
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
                alt={`Memory ${IMAGE_IDS[selectedIndex]}`}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-center text-lg font-medium text-white/90">
                  {OVERLAY_MESSAGES[IMAGE_IDS[selectedIndex]] || `Memory #${IMAGE_IDS[selectedIndex]}`}
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