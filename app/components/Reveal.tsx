"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // expecting milliseconds to be compatible with existing code
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number; // in seconds
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
  direction = "up",
  duration = 0.76,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px", amount: 0.16 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else if (!once) {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, once]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
