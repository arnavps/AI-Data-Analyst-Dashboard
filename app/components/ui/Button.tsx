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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-b from-apple-blue to-apple-blue-bright text-white shadow-subtle hover:brightness-110 active:brightness-95",
      secondary: "bg-white dark:bg-zinc-800 text-text-primary dark:text-white shadow-subtle hover:bg-zinc-50 dark:hover:bg-zinc-700",
      outline: "bg-transparent border border-zinc-200 dark:border-zinc-700 text-text-primary dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800",
      ghost: "bg-transparent text-text-primary dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
      danger: "bg-error text-white shadow-subtle hover:brightness-110 active:brightness-95",
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
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-apple-blue/50 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {props.children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
