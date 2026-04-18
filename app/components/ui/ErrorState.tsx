"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/app/lib/utils";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title = "Something went wrong", message, onRetry, className }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: [-10, 10, -10, 10, 0] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn("flex flex-col items-center justify-center p-8 text-center", className)}
    >
      <div className="w-12 h-12 mb-4 rounded-full bg-apple-error/10 flex items-center justify-center text-apple-error">
        <AlertCircle size={24} />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
