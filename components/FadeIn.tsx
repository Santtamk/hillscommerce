"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  fullWidth = false,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <div ref={ref} className={`${className} ${fullWidth ? "w-full" : ""}`}>
      <motion.div
        initial={{
          opacity: 0,
          ...directionOffset[direction],
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
              }
            : {
                opacity: 0,
                ...directionOffset[direction],
              }
        }
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.21, 0.47, 0.32, 0.98], // Custom ease for "luxury" feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
