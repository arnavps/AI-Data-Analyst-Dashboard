"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  BarChart3,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

export interface Insight {
  title: string;
  description: string;
  metric: string;
  type: "trend" | "comparison" | "anomaly" | "predictive";
  sentiment: "positive" | "negative" | "neutral";
  recommendation?: string;
}

interface InsightCardProps {
  insight: Insight;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const getIcon = () => {
    switch (insight.type) {
      case "trend":
        return insight.sentiment === "positive" ? <TrendingUp className="text-[#34C759]" /> : <TrendingDown className="text-[#FF3B30]" />;
      case "anomaly":
        return <AlertCircle className="text-[#FF3B30]" />;
      case "predictive":
        return <BarChart3 className="text-[#0071E3]" />;
      default:
        return <Lightbulb className="text-[#0071E3]" />;
    }
  };

  const getSentimentStyles = () => {
    switch (insight.sentiment) {
      case "positive": return "bg-[#34C759]/5 border-[#34C759]/20 group-hover:border-[#34C759]/40";
      case "negative": return "bg-[#FF3B30]/5 border-[#FF3B30]/20 group-hover:border-[#FF3B30]/40";
      default: return "bg-[#0071E3]/5 border-[#0071E3]/20 group-hover:border-[#0071E3]/40";
    }
  };

  const getMetricStyles = () => {
    switch (insight.sentiment) {
      case "positive": return "text-[#34C759] bg-[#34C759]/10 border-[#34C759]/20";
      case "negative": return "text-[#FF3B30] bg-[#FF3B30]/10 border-[#FF3B30]/20";
      default: return "text-[#0071E3] bg-[#0071E3]/10 border-[#0071E3]/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "p-5 rounded-2xl border transition-all duration-300 bg-white/80 backdrop-blur-md",
        getSentimentStyles()
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900">
            {getIcon()}
          </div>
          <h4 className="font-semibold text-[#1D1D1F] text-sm leading-tight">
            {insight.title}
          </h4>
        </div>
        <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#1D1D1F]">
          <Share2 size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-xs text-[#86868B] leading-relaxed flex-1 mr-4">
          {insight.description}
        </p>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap border",
          getMetricStyles()
        )}>
          {insight.metric}
        </span>
      </div>

      {insight.recommendation && (
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center space-x-2 text-xs font-medium text-[#0071E3]">
            <ArrowRight size={14} />
            <span>{insight.recommendation}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
