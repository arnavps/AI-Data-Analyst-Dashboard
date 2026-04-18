"use client";

import React from "react";
import { Search, Clock, ArrowUpRight, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface Query {
  text: string;
  time: string;
}

const queries: Query[] = [
  { text: "Show revenue by region for Q3", time: "10m ago" },
  { text: "Top 5 products by growth rate", time: "1h ago" },
  { text: "Correlation between spend and age", time: "3h ago" },
  { text: "Monthly active users trend", time: "Yesterday" }
];

export function RecentQueries() {
  return (
    <div className="glass p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock size={18} className="text-apple-text-secondary" />
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
            Recent Queries
          </h3>
        </div>
        <button className="text-xs text-apple-blue font-medium hover:underline">
          Clear History
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {queries.map((query, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-apple-blue transition-colors">
                <Search size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{query.text}</p>
                <p className="text-[10px] text-apple-text-secondary">{query.time}</p>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <RotateCcw size={14} className="text-apple-blue" />
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-6 w-full py-3 px-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-xs font-semibold text-apple-text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center justify-center space-x-2">
        <Search size={14} className="text-apple-blue" />
        <span>Ask a new question</span>
      </button>
    </div>
  );
}
