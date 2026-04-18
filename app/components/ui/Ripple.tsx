"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface RippleProps {
  color?: string;
  duration?: number;
}

export function Ripple({ color = "rgba(255, 255, 255, 0.3)", duration = 600 }: RippleProps) {
  const [ripples, setRipples] = useState<React.CSSProperties[]>([]);

  const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timeout = setTimeout(() => {
        setRipples([]);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [ripples, duration]);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-inherit"
      onMouseDown={addRipple}
      style={{ borderRadius: "inherit" }}
    >
      <AnimatePresence>
        {ripples.map((ripple, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
