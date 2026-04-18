"use client";

import React, { useState } from "react";
import { Insight, InsightCard } from "./InsightCard";
import { ChevronDown, ChevronUp, Sparkles, Download, Bell, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InsightSectionProps {
  insights: Insight[];
}

export function InsightSection({ insights }: InsightSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!insights || insights.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles size={18} className="text-apple-blue" />
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
            Intelligent Insights
          </h3>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden space-y-4"
          >
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} index={index} />
            ))}

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <Download size={14} />
                <span>Export Chart</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <Bell size={14} />
                <span>Set Alert</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <Plus size={14} />
                <span>Drill Down</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-apple-blue">
                <Sparkles size={14} />
                <span>Compare</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
