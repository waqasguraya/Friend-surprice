"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Letter from "@/components/Letter";
import { Mail, Sparkles } from "lucide-react";

export default function Gate() {
  const [opened, setOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const audio = document.querySelector("audio[data-journey='true']");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const handleContinue = () => {
    const audio = document.querySelector("audio[data-journey='true']");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    router.push("/hallway");
  };

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02040a]"
    >
      {/* ═══ Background Ambience ═══ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#090d20] to-[#0a0612]" />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-900/10 blur-[100px]"
        />
      </div>

      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-amber-200/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.6, 0.1],
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
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* Glow behind envelope */}
            <motion.div
              animate={{
                scale: isHovered ? 1.3 : [1, 1.2, 1],
                opacity: isHovered ? 0.5 : [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: isHovered ? 0.4 : 3,
                repeat: isHovered ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-48 w-48 rounded-full bg-amber-400/20 blur-[60px]"
            />

            {/* Envelope Container */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Sparkle decorations */}
              <motion.div
                animate={{ rotate: [0, 180, 360], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -left-12 -top-8 text-amber-300/60"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              <motion.div
                animate={{ rotate: [180, 360, 540], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -right-10 -top-4 text-amber-300/50"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0], y: [10, -20, -40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeOut" }}
                className="absolute -right-6 top-0 text-amber-200/60"
              >
                ✦
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0], y: [10, -20, -40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2.5, ease: "easeOut" }}
                className="absolute -left-8 top-4 text-amber-200/50"
              >
                ✦
              </motion.div>

              {/* The Envelope */}
              <motion.div
                whileHover={{ scale: 1.12, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setOpened(true)}
                className="relative cursor-pointer"
              >
                <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 to-amber-600/10 shadow-[0_0_60px_rgba(251,191,36,0.2)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_0_80px_rgba(251,191,36,0.4)]">
                  <Mail className="h-14 w-14 text-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                  
                  {/* Notification dot */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] ring-2 ring-[#02040a]"
                  />
                </div>

                {/* Bottom reflection */}
                <div className="absolute -bottom-4 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-amber-400/10 blur-lg" />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12"
            >
              <h1
                className="text-4xl font-bold tracking-tight text-white md:text-6xl"
                style={{ textShadow: "0 0 40px rgba(251,191,36,0.1)" }}
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  A Letter Has Been
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Waiting...
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5 text-base font-light text-white/40 md:text-lg"
              >
                Tap the envelope to reveal what&apos;s inside
              </motion.p>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 h-px w-20 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
            />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <Letter onContinue={handleContinue} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}