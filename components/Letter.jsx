"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

export default function Letter({ onContinue }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0a09] px-4 py-12">
      {/* Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1917] via-[#0c0a09] to-[#1a1510]" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-amber-900/10 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-yellow-900/10 blur-[100px]"
        />
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-amber-200/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 3D Tilt Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        initial={{ scale: 0.6, opacity: 0, rotateZ: -4 }}
        animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[680px]"
      >
        {/* Glow behind card */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-4 rounded-2xl bg-amber-500/10 blur-2xl"
        />

        {/* Main Parchment Card */}
        <div
          className="relative overflow-hidden rounded-xl border border-[#d4c4a8]/40 bg-[#faf6f1] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")
            `,
          }}
        >
          {/* Top Decorative Bar */}
          <div className="relative h-3 w-full bg-gradient-to-r from-[#8b6914] via-[#b8941f] to-[#8b6914]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 6 Q5 0 10 6 T20 6\' stroke=\'rgba(255,255,255,0.2)\' fill=\'none\'/%3E%3C/svg%3E')] opacity-50" />
          </div>

          {/* Wax Seal - Top Right */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -right-3 -top-2 z-20"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#b91c1c] to-[#7f1d1d] shadow-lg ring-4 ring-[#b91c1c]/30">
              <div className="absolute inset-1 rounded-full border border-white/20" />
              <Heart className="h-6 w-6 text-red-100 fill-red-100" />
              {/* Seal shine */}
              <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-white/40 blur-[1px]" />
            </div>
            {/* Ribbon tail */}
            <div className="absolute -bottom-4 left-1/2 h-8 w-3 -translate-x-1/2 bg-gradient-to-b from-[#b91c1c] to-[#7f1d1d] shadow-md" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          </motion.div>

          {/* Content Padding */}
          <div className="relative px-10 pb-10 pt-12 md:px-16 md:pb-14 md:pt-16">
            {/* Corner Ornaments */}
            <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#8b6914]/30" />
            <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-[#8b6914]/30" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[#8b6914]/30" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#8b6914]/30" />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-10 text-center"
            >
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8b6914]/40" />
                <Sparkles className="h-4 w-4 text-[#8b6914]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8b6914]/40" />
              </div>
              <h2
                className="text-4xl font-bold tracking-tight text-[#3d2b1f] md:text-5xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                A Letter For You
              </h2>
              <div className="mt-2 text-sm tracking-[0.3em] text-[#8b6914]/70 uppercase">
                Handcrafted with care
              </div>
            </motion.div>

            {/* Letter Body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-6 text-lg leading-relaxed text-[#4a3728] md:text-xl md:leading-loose"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl font-semibold text-[#3d2b1f] md:text-3xl"
              >
                Dear Shahzaib,
              </motion.p>

              {[
                "Before this little journey begins...",
                "I wanted to create something different.",
                "Every page ahead holds a small surprise.",
                "Some memories...",
                "Some smiles...",
                "And one special ending.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                  className={text.includes("...") ? "italic text-[#5c4033]/80" : ""}
                >
                  {text}
                </motion.p>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="pt-2 text-xl font-semibold text-[#3d2b1f] md:text-2xl"
              >
                I hope you enjoy every moment of it.{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  ❤️
                </motion.span>
              </motion.p>
            </motion.div>

            {/* Signature Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent"
            />

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-10 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#b8941f] to-[#8b6914] px-10 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(139,105,20,0.3)] transition-shadow duration-500 hover:shadow-[0_10px_40px_rgba(139,105,20,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Continue
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom Decorative Bar */}
          <div className="h-3 w-full bg-gradient-to-r from-[#8b6914] via-[#b8941f] to-[#8b6914]" />
        </div>

        {/* Paper shadow layers for depth */}
        <div className="absolute -bottom-2 left-4 right-4 -z-10 h-4 rounded-b-xl bg-black/20 blur-md" />
        <div className="absolute -bottom-4 left-8 right-8 -z-20 h-4 rounded-b-xl bg-black/10 blur-lg" />
      </motion.div>
    </div>
  );
}