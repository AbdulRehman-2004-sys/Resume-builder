"use client";

import { motion } from "framer-motion";

export function AnimatedHeroText() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.h1
      className="w-full min-w-0 text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 max-w-4xl text-balance"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={child} className="inline-block mr-3 md:mr-4 mb-2">
        Create a
      </motion.span>
      <motion.span variants={child} className="inline-block mr-3 md:mr-4 mb-2">
        Professional
      </motion.span>
      <motion.span variants={child} className="inline-block mr-3 md:mr-4 mb-2">
        Resume That
      </motion.span>
      <motion.span variants={child} className="inline-block">
        <span className="italic font-serif text-gray-700 hero-title-highlight">
          Gets You Hired
        </span>
      </motion.span>
    </motion.h1>
  );
}
