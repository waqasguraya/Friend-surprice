"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Gallery({
  title,
  subtitle,
  images,
  next,
}) {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#050816] to-black px-8 py-12 pb-20 text-white">

      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-5xl font-bold text-yellow-300"
      >
        {title}
      </motion.h1>

      <p className="mt-4 text-center text-gray-300">
        {subtitle}
      </p>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

        {images.map((img, index) => (

          <motion.div
            key={index}
            whileHover={{
              scale: 1.04,
              rotate: 1,
            }}
            whileTap={{
              scale: .97,
            }}
            onClick={() => setSelected(img)}
            className="cursor-pointer overflow-hidden rounded-2xl border-4 border-yellow-500 shadow-[0_0_25px_rgba(255,215,0,.2)]"
          >

            <Image
              src={`/images/${img}.jpeg`}
              alt={`Memory ${img}`}
              width={700}
              height={500}
              className="h-[320px] w-full object-cover transition duration-500 hover:scale-110"
            />

          </motion.div>

        ))}

      </div>

      <div className="relative z-20 mt-12 flex justify-center pb-16">

        <button
          onClick={() => router.push(next)}
          className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black shadow-[0_0_25px_rgba(255,215,0,0.6)] transition hover:scale-105 hover:shadow-[0_0_35px_rgba(255,215,0,0.9)]"
        >
          Continue to Next Room →
        </button>

      </div>

      <AnimatePresence>

        {selected && (

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >

            <motion.div
              initial={{ scale: .8 }}
              animate={{ scale: 1 }}
              exit={{ scale: .8 }}
              onClick={(e) => e.stopPropagation()}
            >

              <Image
                src={`/images/${selected}.jpeg`}
                alt="Memory"
                width={1000}
                height={700}
                className="max-h-[80vh] rounded-2xl object-contain"
              />

              <p className="mt-5 text-center text-gray-300">
                ❤️ A beautiful memory
              </p>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}