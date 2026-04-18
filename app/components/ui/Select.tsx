"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SelectProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Select({ options, value, onChange, placeholder = "Select...", className }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-zinc-200/50 bg-zinc-100/30 px-4 py-2 text-sm transition-all duration-300 hover:bg-zinc-100/50 focus:outline-none focus:ring-2 focus:ring-apple-blue/20",
          "dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50",
          isOpen && "border-apple-blue ring-2 ring-apple-blue/20"
        )}
      >
        <span className={cn("truncate font-medium", !selectedOption && "text-zinc-400")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute z-50 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-elevated overflow-hidden"
          >
            <div className="p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={cn(
                    "flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                    option.value === value
                      ? "bg-[#0071E3] text-white"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#1D1D1F] dark:text-white"
                  )}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
