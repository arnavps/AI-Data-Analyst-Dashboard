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
    
    const dateCols = Object.entries(metadata.columnTypes)
      .filter(([_, type]) => type === 'date')
      .map(([col, _]) => col);

    const categoryKey = dateCols[0] || Object.keys(metadata.columnTypes)[0];

    return numericalCols.slice(0, 4).map((col, i) => {
      const chartTypes: Array<"bar" | "line" | "area" | "composed"> = ["bar", "line", "area", "composed"];
      const colors = ["#0071E3", "#34C759", "#FF9500", "#5856D6"];

      return {
        title: col,
        subtitle: metadata.stats?.[col]?.avg?.toLocaleString(undefined, { maximumFractionDigits: 1 }) || "0",
        type: chartTypes[i % chartTypes.length],
        dataKey: col,
        categoryKey: categoryKey,
        color: colors[i % colors.length],
        data: metadata.preview || []
      };
    });
  }, [metadata]);

  return (
    <div className="h-full overflow-y-auto p-8 space-y-8 bg-[#FBFBFD] scroll-smooth">
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
          <div className="p-8 rounded-[28px] border border-zinc-100 dark:border-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.04)] bg-white">
            <InsightSection insights={[
              {
                title: "Significant Revenue Growth in North Region",
                description: "The North region has seen a 45% increase in revenue compared to the previous quarter, driven primarily by new product launches.",
                metric: "+45%",
                type: "trend",
                sentiment: "positive",
                recommendation: "Increase marketing budget for North region to capitalize on momentum."
              },
              {
                title: "User Retention Dipped in March",
                description: "A 12% drop in user retention was observed in March, coinciding with the sunset of the legacy mobile app.",
                metric: "-12%",
                type: "anomaly",
                sentiment: "negative",
                recommendation: "Analyze user feedback from March to identify specific pain points."
              }
            ]} />
          </div>
        </div>

        {/* Sidebar Components */}
        <div className="space-y-8">
          <RecentQueries />

          <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.04)] bg-white">
            <h3 className="text-sm font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={16} className="text-[#0071E3]" />
              File Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#86868B]">Total Rows</span>
                <span className="font-bold">{metadata?.rowCount || 0}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#86868B]">Columns</span>
                <span className="font-bold">{metadata?.columns?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#86868B]">File Size</span>
                <span className="font-bold">2.4 MB</span>
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <button className="w-full py-2 text-xs font-semibold text-[#0071E3] hover:bg-[#0071E3]/5 rounded-lg transition-colors">
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
