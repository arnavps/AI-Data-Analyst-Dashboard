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
  // Mock charts for demonstration
  const charts = useMemo(() => [
    {
      title: "Revenue vs Forecast",
      subtitle: "$1.2M",
      type: "composed",
      dataKey: "revenue",
      categoryKey: "month",
      color: "#0071E3",
      data: [
        { month: "Jan", revenue: 4000, forecast: 4200 },
        { month: "Feb", revenue: 3000, forecast: 3100 },
        { month: "Mar", revenue: 5000, forecast: 4800 },
        { month: "Apr", revenue: 2780, forecast: 3000 },
        { month: "May", revenue: 1890, forecast: 2000 },
        { month: "Jun", revenue: 2390, forecast: 2500 },
      ]
    },
    {
      title: "Customer Acquisition",
      subtitle: "12,402",
      type: "area",
      dataKey: "users",
      categoryKey: "month",
      color: "#34C759",
      showBrush: true,
      data: [
        { month: "Jan", users: 1000 },
        { month: "Feb", users: 2000 },
        { month: "Mar", users: 1500 },
        { month: "Apr", users: 3000 },
        { month: "May", users: 2500 },
        { month: "Jun", users: 4000 },
      ]
    },
    {
      title: "Market Correlation",
      subtitle: "Strong",
      type: "scatter",
      dataKey: "sales",
      categoryKey: "ads",
      color: "#5856D6",
      data: [
        { ads: 100, sales: 200 },
        { ads: 200, sales: 400 },
        { ads: 300, sales: 350 },
        { ads: 400, sales: 500 },
        { ads: 500, sales: 650 },
      ]
    },
    {
      title: "Conversion Goal",
      subtitle: "65%",
      type: "gauge",
      dataKey: "value",
      categoryKey: "label",
      color: "#FF9500",
      data: [{ label: "Target", value: 65 }]
    }
  ], []);

  return (
    <div className="h-full overflow-y-auto p-8 space-y-8 bg-[#FBFBFD] scroll-smooth">
      {/* Top Header & Context */}
      <DashboardHeader filename={metadata?.filename} onNewAnalysis={onNewAnalysis} />

      {/* Main Stats Grid */}
      <MetricGrid />

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
