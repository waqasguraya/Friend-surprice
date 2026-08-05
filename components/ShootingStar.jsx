"use client";

import { motion } from "framer-motion";

export default function ShootingStar() {
  return (
    <motion.div
      className="absolute top-20 -left-40 h-[2px] w-28 bg-white rotate-[-25deg]"
     initial={{
  x: 1500,
  y: 0,
  opacity: 0,
}}

animate={{
  x: -300,
  y: 600,
  opacity: [0, 1, 1, 0],
}}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 8,
        ease: "linear",
      }}
    />
  );
}