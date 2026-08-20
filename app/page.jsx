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

  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Parallax motion mappings
  const cardX = useTransform(x, [-0.5, 0.5], [-12, 12]);
  const cardY = useTransform(y, [-0.5, 0.5], [-12, 12]);
  const moonX = useTransform(x, [-0.5, 0.5], [20, -20]);
  const moonY = useTransform(y, [-0.5, 0.5], [20, -20]);
  const glowX = useTransform(x, [-0.5, 0.5], [40, -40]);
  const glowY = useTransform(y, [-0.5, 0.5], [40, -40]);
  
  // Adjusted direction to move smoothly with natural perspective depth
  const kingdomX = useTransform(x, [-0.5, 0.5], [15, -15]);

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
      router.push("/ready");
    }, 1200);
  };

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }));

    setStars(generatedStars);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#02040a]">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#02040a] via-[#090d26] to-[#160d33]" />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/2 h-[850px] w-[850px] rounded-full bg-[#4c1d95]/20 blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -left-1/2 h-[650px] w-[650px] rounded-full bg-[#1e3a5f]/30 blur-[110px]"
        />
      </div>

      {/* Fantasy Kingdom Background Image - Updated to animate bottom-to-top */}
      <motion.div
        style={{ x: kingdomX }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 h-[60vh] pointer-events-none z-[2]"
      >
        <div
          className="h-full w-full bg-cover bg-bottom bg-no-repeat mix-blend-screen filter contrast-125 brightness-125"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop")`,
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
      </motion.div>

      {/* SVG Noise Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-amber-100/90 z-[2]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: star.size > 2 ? "0 0 8px rgba(253, 230, 138, 0.8)" : "none",
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.2, 0.8],
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

      {/* Organic Moon with Parallax & Soft Glow */}
      <motion.div
        style={{ x: moonX, y: moonY }}
        className="absolute right-8 top-10 sm:right-16 sm:top-14 md:right-24 md:top-16 pointer-events-none z-[2]"
      >
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-[#fef7d6] via-[#fde68a] to-[#f59e0b] shadow-[0_0_90px_25px_rgba(253,230,138,0.25)]"
        >
          {/* Moon Radial Halo */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_120px_40px_rgba(251,191,36,0.2)]" />
          {/* Surface Craters */}
          <div className="absolute left-5 top-5 h-3.5 w-3.5 rounded-full bg-[#d97706]/15 blur-[0.5px]" />
          <div className="absolute left-10 top-9 h-6 w-6 rounded-full bg-[#d97706]/10 blur-[0.5px]" />
          <div className="absolute bottom-6 right-5 h-4.5 w-4.5 rounded-full bg-[#d97706]/15 blur-[0.5px]" />
        </motion.div>
      </motion.div>

      {/* Ambient Parallax Glow Orbs */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/3 h-[450px] w-[450px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none z-[2]"
      />

      {/* Glassmorphism Content Card */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <motion.div
          style={{ x: cardX, y: cardY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl"
        >
          {/* Enhanced Glass Card Frame */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 sm:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl">
            {/* Ambient Corner Glows */}
            <div className="absolute -left-20 -top-20 h-44 w-44 rounded-full bg-amber-400/15 blur-[70px]" />
            <div className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-purple-500/15 blur-[70px]" />

            <div className="relative flex flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.15)]"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-200">
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
                className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
                style={{
                  textShadow: "0 0 60px rgba(251,191,36,0.2)",
                }}
              >
                A{" "}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
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
                className="mt-3 text-3xl font-light tracking-tight text-white/90 sm:text-4xl md:text-5xl"
              >
                Created Just For You
              </motion.h2>

              {/* Glowing Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 sm:mt-8 h-px w-28 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent shadow-[0_0_8px_rgba(251,191,36,0.5)]"
              />

              {/* Responsive Type Animation Frame */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-6 sm:mt-8 min-h-[3rem] text-base sm:text-lg font-light text-white/60 flex items-center justify-center px-2"
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

              {/* Pulsing CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleStart}
                className="group relative mt-8 sm:mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-9 py-4 text-base font-bold text-slate-950 shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="h-4 w-4 fill-slate-950 text-slate-950" />
                  Begin Journey
                </span>
                <motion.span
                  animate={{
                    x: isHovered ? 0 : -8,
                    opacity: isHovered ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                {/* Button Shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.button>
            </div>
          </div>

          {/* Floating Micro-Particles around Card */}
          <motion.div
            animate={{ y: [-8, 8, -8], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 -top-3 h-2.5 w-2.5 rounded-full bg-amber-300 blur-[1px]"
          />
          <motion.div
            animate={{ y: [8, -8, 8], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-4 -left-4 h-3 w-3 rounded-full bg-purple-400 blur-[1px]"
          />
        </motion.div>
      </div>

      {/* Bottom Ambient Fog Layer */}
      <motion.div
        animate={{ x: [-80, 80, -80] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 h-56 w-[200%] bg-gradient-to-t from-amber-500/[0.03] via-purple-500/[0.02] to-transparent blur-3xl pointer-events-none z-[1]"
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
    const stars = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: Math.random() * 30, // Confine spawn to upper portion of screen
      left: Math.random() * 50, // Confine spawn to top-left region
      delay: Math.random() * 6 + i * 3,
    }));
    setShootingStars(stars);
  }, []);

  return (
    <>
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="pointer-events-none absolute h-[2px] w-32 bg-gradient-to-r from-transparent via-amber-200 to-transparent z-[2]"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          initial={{
            rotate: 45,
            x: 0,
            y: 0,
            opacity: 0,
            scaleX: 0.5,
          }}
          animate={{
            rotate: 45,
            x: [0, 250], // Moves right in global space
            y: [0, 250], // Moves down in global space
            opacity: [0, 1, 0],
            scaleX: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}