"use client";

import React from "react";
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

export function DashboardView({ metadata, onNewAnalysis, onSwitchToChat }: DashboardViewProps) {
  // Mock charts for demonstration
  const charts = [
    {
      title: "Revenue by Region",
      type: "bar" as const,
      data: [
        { name: "North", value: 45000 },
        { name: "South", value: 32000 },
        { name: "East", value: 28000 },
        { name: "West", value: 39000 }
      ],
      dataKey: "value",
      categoryKey: "name"
    },
    {
      title: "User Acquisition Trend",
      type: "area" as const,
      data: [
        { month: "Jan", users: 1200 },
        { month: "Feb", users: 1900 },
        { month: "Mar", users: 1500 },
        { month: "Apr", users: 2400 },
        { month: "May", users: 2100 },
        { month: "Jun", users: 3000 }
      ],
      dataKey: "users",
      categoryKey: "month"
    }
  ];

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
                  type={chart.type}
                  data={chart.data}
                  dataKey={chart.dataKey}
                  categoryKey={chart.categoryKey}
                  className="h-[350px]"
                />
              </motion.div>
            ))}
          </div>

          {/* Large Insight Section */}
          <div className="glass p-8 rounded-[28px] border border-zinc-100 dark:border-zinc-900 shadow-sm bg-white">
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
          
          <div className="glass p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm bg-white">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={16} className="text-apple-blue" />
              File Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-apple-text-secondary">Total Rows</span>
                <span className="font-bold">{metadata?.rowCount || 0}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-apple-text-secondary">Columns</span>
                <span className="font-bold">{metadata?.columns?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-apple-text-secondary">File Size</span>
                <span className="font-bold">2.4 MB</span>
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <button className="w-full py-2 text-xs font-semibold text-apple-blue hover:bg-apple-blue/5 rounded-lg transition-colors">
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
        className="fixed bottom-10 right-10 bg-apple-blue text-white p-4 rounded-full shadow-elevated z-50 flex items-center space-x-2 cursor-pointer"
        onClick={onSwitchToChat}
      >
        <BarChart3 size={24} />
        <span className="font-semibold pr-2">Ask AI Analyst</span>
      </motion.button>
    </div>
  );
}
