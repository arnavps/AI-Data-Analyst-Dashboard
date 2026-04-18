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
        return insight.sentiment === "positive" ? <TrendingUp className="text-apple-success" /> : <TrendingDown className="text-apple-error" />;
      case "anomaly":
        return <AlertCircle className="text-apple-error" />;
      case "predictive":
        return <BarChart3 className="text-apple-blue" />;
      default:
        return <Lightbulb className="text-apple-blue" />;
    }
  };

  const getSentimentStyles = () => {
    switch (insight.sentiment) {
      case "positive": return "bg-apple-success/5 border-apple-success/20 group-hover:border-apple-success/40";
      case "negative": return "bg-apple-error/5 border-apple-error/20 group-hover:border-apple-error/40";
      default: return "bg-apple-blue/5 border-apple-blue/20 group-hover:border-apple-blue/40";
    }
  };

  const getMetricStyles = () => {
    switch (insight.sentiment) {
      case "positive": return "text-apple-success bg-apple-success/10 border-apple-success/20";
      case "negative": return "text-apple-error bg-apple-error/10 border-apple-error/20";
      default: return "text-apple-blue bg-apple-blue/10 border-apple-blue/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "glass p-5 rounded-2xl border transition-all duration-300",
        getSentimentStyles()
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900">
            {getIcon()}
          </div>
          <h4 className="font-semibold text-text-primary text-sm leading-tight">
            {insight.title}
          </h4>
        </div>
        <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-text-primary">
          <Share2 size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-xs text-text-secondary leading-relaxed flex-1 mr-4">
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
          <div className="flex items-center space-x-2 text-xs font-medium text-apple-blue">
            <ArrowRight size={14} />
            <span>{insight.recommendation}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
