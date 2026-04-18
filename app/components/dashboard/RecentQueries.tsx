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
    <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock size={18} className="text-[#86868B]" />
          <h3 className="text-sm font-semibold text-[#1D1D1F] uppercase tracking-wider">
            Recent Queries
          </h3>
        </div>
        <button className="text-xs text-[#0071E3] font-medium hover:underline">
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
              <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-[#0071E3] transition-colors">
                <Search size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#1D1D1F] truncate">{query.text}</p>
                <p className="text-[10px] text-[#86868B]">{query.time}</p>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <RotateCcw size={14} className="text-[#0071E3]" />
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-6 w-full py-3 px-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-xs font-semibold text-[#1D1D1F] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center justify-center space-x-2">
        <Search size={14} className="text-[#0071E3]" />
        <span>Ask a new question</span>
      </button>
    </div>
  );
}
