"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children?: React.ReactNode;
}

import { Ripple } from "./Ripple";
import { Spinner } from "./Spinner";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-b from-apple-blue to-apple-blue-bright text-white shadow-subtle hover:brightness-110",
      secondary: "bg-white dark:bg-zinc-800 text-text-primary dark:text-white shadow-subtle hover:bg-zinc-50 dark:hover:bg-zinc-700",
      outline: "bg-transparent border border-zinc-200 dark:border-zinc-700 text-text-primary dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800",
      ghost: "bg-transparent text-text-primary dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
      danger: "bg-error text-white shadow-subtle hover:brightness-110",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-sm",
      md: "px-4 py-2 text-sm rounded-md font-medium",
      lg: "px-6 py-3 text-base rounded-lg font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "relative inline-flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <Ripple color={variant === "primary" || variant === "danger" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)"} />
        {isLoading ? (
          <Spinner size="sm" className="mr-2" />
        ) : null}
        {props.children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
