"use client";

import { motion } from "framer-motion";

export default function Particles() {
  const particles = [
    { left: "15%", delay: 0 },
    { left: "30%", delay: 1 },
    { left: "45%", delay: 2 },
    { left: "60%", delay: 3 },
    { left: "75%", delay: 4 },
    { left: "90%", delay: 5 },
  ];

  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0 h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_10px_gold]"
          style={{ left: particle.left }}
          animate={{
            y: [-20, -700],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}