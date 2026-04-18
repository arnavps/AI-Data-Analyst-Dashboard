"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface CountUpProps {
  value: number;
  duration?: number;
  format?: (value: number) => string;
  className?: string;
}

export function CountUp({ value, duration = 1.5, format, className }: CountUpProps) {
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const [formattedValue, setFormattedValue] = useState("");

  const displayValue = useTransform(springValue, (current) => {
    return format ? format(current) : Math.round(current).toString();
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      setFormattedValue(latest);
    });
  }, [displayValue]);

  return <motion.span className={className}>{formattedValue || "0"}</motion.span>;
}
