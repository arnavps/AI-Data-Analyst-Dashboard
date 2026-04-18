"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#FBFBFD] dark:bg-[#1D1D1F]">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-apple-blue/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-apple-blue-bright/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary dark:text-white mb-6">
            Data Analysis, <br />
            <span className="bg-gradient-to-r from-apple-blue to-apple-blue-bright bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10">
            Upload. Ask. Understand. <br />
            AI-powered insights in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="#how-it-works" className="group flex items-center text-lg font-medium text-apple-blue hover:text-apple-blue-bright transition-colors">
              <div className="h-10 w-10 rounded-full border border-apple-blue/30 flex items-center justify-center mr-3 group-hover:bg-apple-blue/5 transition-all">
                <Play size={16} fill="currentColor" />
              </div>
              See How It Works
            </Link>
          </div>
        </motion.div>

        {/* Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-elevated overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-zinc-50 dark:bg-zinc-950 aspect-[16/9] relative">
               {/* Dashboard Mockup Content */}
               <div className="absolute inset-0 p-4 flex flex-col space-y-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="h-8 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="grid grid-cols-3 gap-4 h-32">
                    <div className="bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
               </div>
               
               {/* Gradient Overlay for Premium Look */}
               <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -z-10 -top-10 -right-10 h-40 w-40 bg-apple-blue/5 rounded-full blur-2xl" />
          <div className="absolute -z-10 -bottom-10 -left-10 h-40 w-40 bg-apple-blue-bright/5 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
