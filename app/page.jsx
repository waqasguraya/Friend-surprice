"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Play } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const audioRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax for depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const moonX = useTransform(x, [-0.5, 0.5], [-20, 20]);
  const moonY = useTransform(y, [-0.5, 0.5], [-20, 20]);
  const glowX = useTransform(x, [-0.5, 0.5], [30, -30]);
  const glowY = useTransform(y, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      router.push("/gate");
    }, 1200);
  };

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));

    setStars(generatedStars);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#02040a]">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#02040a] via-[#0a0e27] to-[#1a103c]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/2 h-[800px] w-[800px] rounded-full bg-[#4c1d95]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -left-1/2 h-[600px] w-[600px] rounded-full bg-[#1e3a5f]/30 blur-[100px]"
        />
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      <ShootingStars />

      {/* Moon with Parallax */}
      <motion.div
        style={{ x: moonX, y: moonY }}
        className="absolute right-24 top-16"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-28 w-28 rounded-full bg-gradient-to-br from-[#fef3c7] to-[#fde68a] shadow-[0_0_100px_30px_rgba(253,230,138,0.4)]"
        >
          <div className="absolute left-5 top-6 h-3 w-3 rounded-full bg-[#fcd34d]/30" />
          <div className="absolute left-10 top-10 h-5 w-5 rounded-full bg-[#fcd34d]/20" />
          <div className="absolute bottom-7 right-6 h-4 w-4 rounded-full bg-[#fcd34d]/25" />
        </motion.div>
      </motion.div>

      {/* Ambient Glow Orbs */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px]"
      />

      {/* Glassmorphism Content Card */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl"
        >
          {/* Glass Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            {/* Inner glow */}
            <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-yellow-400/10 blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px]" />

            <div className="relative flex flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                <span className="text-xs font-medium uppercase tracking-widest text-yellow-200">
                  Welcome
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-6xl font-bold tracking-tight text-white md:text-7xl"
                style={{
                  textShadow: "0 0 80px rgba(255,215,0,0.15)",
                }}
              >
                A{" "}
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  World
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3 text-4xl font-light tracking-tight text-white/80 md:text-5xl"
              >
                Created Just For You
              </motion.h2>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
              />

              {/* Type Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 h-8 text-lg font-light text-white/50"
              >
                <TypeAnimation
                  sequence={[
                    "Every click reveals a new surprise...",
                    2500,
                    "A journey crafted especially for you...",
                    2500,
                    "Are you ready? ✨",
                    2500,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleStart}
                className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-10 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="h-4 w-4 fill-black" />
                  Begin Journey
                </span>
                <motion.span
                  animate={{
                    x: isHovered ? 0 : -20,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                {/* Button shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.button>
            </div>
          </div>

          {/* Floating particles around card */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -top-4 h-2 w-2 rounded-full bg-yellow-400/60 blur-[2px]"
          />
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-6 -left-6 h-3 w-3 rounded-full bg-purple-400/40 blur-[2px]"
          />
        </motion.div>
      </div>

      {/* Bottom ambient fog */}
      <motion.div
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 h-64 w-[200%] bg-gradient-to-t from-white/[0.04] to-transparent blur-3xl"
      />

      {/* Audio */}
      <audio ref={audioRef} data-journey="true">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </main>
  );
}

// Shooting Stars Component
function ShootingStars() {
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const stars = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 80,
      delay: Math.random() * 5 + i * 4,
    }));
    setShootingStars(stars);
  }, []);

  return (
    <>
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            transform: "rotate(-45deg)",
          }}
          animate={{
            x: [0, 300],
            y: [0, 300],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}