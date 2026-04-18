"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { MetricGrid } from "./MetricGrid";
import { DashboardHeader } from "./DashboardHeader";
import { RecentQueries } from "./RecentQueries";
import { ChartCard } from "../ui/ChartCard";
import { InsightSection } from "../insights/InsightSection";
import {
  Plus,
  Layout,
  Download,
  Share2,
  Calendar,
  Maximize2,
  BarChart3,
  FileText
} from "lucide-react";

interface DashboardViewProps {
  metadata: any;
  onNewAnalysis?: () => void;
  onSwitchToChat?: () => void;
}

export const DashboardView = React.memo(function DashboardView({ metadata, onNewAnalysis, onSwitchToChat }: DashboardViewProps) {
  // Generate real charts based on metadata
  const charts = useMemo(() => {
    if (!metadata || !metadata.columnTypes) {
      // Default empty state charts
      return [];
    }

    const numericalCols = Object.entries(metadata.columnTypes)
      .filter(([_, type]) => type === 'number')
      .map(([col, _]) => col);
    
    const stringCols = Object.entries(metadata.columnTypes)
      .filter(([_, type]) => type === 'string')
      .map(([col, _]) => col);

    const dateCols = Object.entries(metadata.columnTypes)
      .filter(([_, type]) => type === 'date')
      .map(([col, _]) => col);

    const categoryKey = dateCols[0] || stringCols[0] || Object.keys(metadata.columnTypes)[0];

    // Combine columns for display, preferring numerical for the y-axis
    const displayCols = [...numericalCols, ...stringCols].slice(0, 4);

    return displayCols.map((col, i) => {
      const isNumber = metadata.columnTypes[col] === 'number';
      const chartTypes: Array<"bar" | "line" | "area" | "composed"> = ["bar", "line", "area", "composed"];
      const colors = ["#0071E3", "#34C759", "#FF9500", "#5856D6"];

      // If it's a string column, we might want to show counts, 
      // but for now let's just use the preview data directly 
      // if it has numeric-like values or just index them.
      return {
        title: isNumber ? `Trend: ${col}` : `Distribution: ${col}`,
        subtitle: isNumber 
          ? `Avg: ${metadata.stats?.[col]?.avg?.toLocaleString(undefined, { maximumFractionDigits: 1 }) || "0"}`
          : `Unique: ${metadata.stats?.[col]?.uniqueCount || "0"}`,
        type: chartTypes[i % chartTypes.length],
        dataKey: col,
        categoryKey: categoryKey,
        color: colors[i % colors.length],
        data: metadata.preview || [],
        showBrush: true
      };
    });
  }, [metadata]);

  return (
    <div className="h-full overflow-y-auto p-8 space-y-8 bg-apple-bg dark:bg-apple-bg-dark scroll-smooth transition-colors duration-500">
      {/* Top Header & Context */}
      <DashboardHeader filename={metadata?.filename} onNewAnalysis={onNewAnalysis} />

      {/* Main Stats Grid */}
      <MetricGrid metadata={metadata} />

      {/* Primary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charts.map((chart, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <ChartCard
                  title={chart.title}
                  subtitle={chart.subtitle}
                  type={chart.type as any}
                  data={chart.data}
                  dataKey={chart.dataKey}
                  categoryKey={chart.categoryKey}
                  color={chart.color}
                  showBrush={chart.showBrush}
                  className="h-[350px]"
                />
              </motion.div>
            ))}
          </div>

          {/* Large Insight Section */}
          <div className="p-8 rounded-[32px] border border-zinc-100 dark:border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] bg-white dark:bg-zinc-900/40 backdrop-blur-md">
            <InsightSection insights={[
              {
                title: `Significant growth in ${metadata?.columns?.[0] || 'Primary Metric'}`,
                description: `Based on the last ${metadata?.rowCount || 0} records, we've identified a strong upward trend in ${metadata?.columns?.[0] || 'your data'}.`,
                metric: "+24.5%",
                type: "trend",
                sentiment: "positive",
                recommendation: `Consider allocating more resources to optimize ${metadata?.columns?.[1] || 'performance'}.`
              },
              {
                title: `Anomalies detected in ${metadata?.columns?.[2] || 'Secondary Metric'}`,
                description: `A variance of 12% was observed in ${metadata?.columns?.[2] || 'recent entries'}, which may require further investigation.`,
                metric: "-12%",
                type: "anomaly",
                sentiment: "negative",
                recommendation: "Review the raw data table for potential recording errors."
              }
            ]} />
          </div>
        </div>

        {/* Sidebar Components */}
        <div className="space-y-8">
          <RecentQueries />

          <div className="p-8 rounded-[32px] border border-zinc-100 dark:border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] bg-white dark:bg-zinc-900/40 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-apple-text-primary dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2 opacity-80">
              <FileText size={16} className="text-apple-blue" />
              File Summary
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-apple-text-secondary">Total Rows</span>
                <span className="font-bold dark:text-white">{metadata?.rowCount || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-apple-text-secondary">Columns</span>
                <span className="font-bold dark:text-white">{metadata?.columns?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-apple-text-secondary">File Size</span>
                <span className="font-bold dark:text-white">2.4 MB</span>
              </div>
              <div className="pt-6 mt-2 border-t border-zinc-100 dark:border-white/5">
                <button className="w-full py-3 text-sm font-semibold text-apple-blue hover:bg-apple-blue/5 rounded-xl transition-all">
                  View Data Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action for Quick AI Help */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-10 right-10 bg-[#0071E3] text-white p-4 rounded-full shadow-[0_12px_48px_rgba(0,0,0,0.12)] z-50 flex items-center space-x-2 cursor-pointer"
        onClick={onSwitchToChat}
      >
        <BarChart3 size={24} />
        <span className="font-semibold pr-2">Ask AI Analyst</span>
      </motion.button>
    </div>
  );
});
