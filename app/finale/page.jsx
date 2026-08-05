"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "canvas-confetti";
import { X, Play, RotateCcw, Heart, Sparkles, Film } from "lucide-react";

// ─── CONFIG ───────────────────────────────────
const IMAGES = [15, 16, 17];
const VIDEO_SRC = "/video.mp4";
const getImageSrc = (id) => `/images/${id}.jpeg`;
// ──────────────────────────────────────────────

export default function Finale() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Video Play Fix ─────────────────────────
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playVideo = async () => {
        try {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
        } catch (err) {
          console.log("Autoplay blocked or failed:", err);
          // If autoplay is blocked, user can click the native controls
        }
      };
      // Small delay to ensure DOM is ready
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, [showVideo]);

  // Keyboard support for lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handlePlay = () => {
    setShowVideo(true);
  };

  const handleEnded = () => {
    setShowMessage(true);

    // Multi-burst cinematic confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      Confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ["#fbbf24", "#f59e0b", "#fcd34d", "#f472b6", "#ffffff"],
      });
      Confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ["#fbbf24", "#f59e0b", "#fcd34d", "#f472b6", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big center burst
    setTimeout(() => {
      Confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#fbbf24", "#f59e0b", "#fcd34d", "#f472b6", "#ffffff"],
      });
    }, 300);
  };

  const router = useRouter();

  const handleReplay = () => {
    router.push("/");
  };

  // Ambient particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
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
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* ═══ Background ═══ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#0a0e27] to-[#0a0612]" />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-900/15 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-900/10 blur-[100px]"
        />
      </div>

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particles */}
      {mounted &&
  particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-amber-200/15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
          }}
            
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ═══ GALLERY VIEW ═══ */}
      <AnimatePresence mode="wait">
        {!showVideo && !showMessage && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24"
          >
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
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md"
              >
                <Film className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-200">
                  Finale
                </span>
              </motion.div>

              <h1
                className="text-5xl font-bold tracking-tight md:text-7xl"
                style={{ textShadow: "0 0 60px rgba(251,191,36,0.15)" }}
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  One Last Surprise
                </span>
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-lg font-light text-white/50 md:text-xl"
              >
                The last memories before the ending...
              </motion.p>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6"
            >
              {IMAGES.map((img, index) => (
                <motion.div
                  key={img}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(img)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-sm aspect-[4/3]"
                >
                  <Image
                    src={getImageSrc(img)}
                    alt={`Memory ${img}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
                    <p className="text-sm font-medium text-white/90">
                      Memory #{img}
                    </p>
                    <div className="mt-1 h-px w-10 bg-amber-400/60" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Play Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlay}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(251,191,36,0.25)] transition-shadow hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="h-5 w-5 fill-black" />
                  Watch Final Surprise
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ═══ VIDEO VIEW ═══ */}
        {showVideo && !showMessage && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl"
            >
              {/* Video glow */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-amber-500/10 blur-2xl" />

              <video
                ref={videoRef}
                controls
                playsInline
                autoPlay
                onEnded={handleEnded}
                onCanPlay={() => setVideoReady(true)}
                className="w-full rounded-2xl"
                style={{ aspectRatio: "16/9" }}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!videoReady && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-8 w-8 rounded-full border-2 border-amber-400 border-t-transparent"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ═══ THANK YOU VIEW ═══ */}
        {showMessage && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 shadow-2xl backdrop-blur-xl md:p-16"
            >
              {/* Inner glow */}
              <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-amber-400/10 blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-pink-500/10 blur-[80px]" />

              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-400 shadow-[0_0_40px_rgba(251,191,36,0.3)]"
                >
                  <Heart className="h-8 w-8 text-white fill-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl font-bold tracking-tight text-white md:text-6xl"
                  style={{ textShadow: "0 0 60px rgba(251,191,36,0.15)" }}
                >
                  <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400 bg-clip-text text-transparent">
                    Thank You
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mt-8 space-y-4 text-lg font-light leading-relaxed text-white/60 md:text-xl"
                >
                  <p>I hope this little journey made you smile.</p>
                  <p>
                    Every picture... Every memory... Every little surprise...
                  </p>
                  <p>was made especially for you.</p>
                  <p className="pt-2 text-amber-200/80">
                    Thank you for being you.{" "}
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block"
                    >
                      🌸
                    </motion.span>
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReplay}
                  className="group relative mt-10 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(251,191,36,0.25)] transition-shadow hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
                    Replay Journey
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageSrc(selected)}
                alt={`Memory ${selected}`}
                width={1200}
                height={800}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}