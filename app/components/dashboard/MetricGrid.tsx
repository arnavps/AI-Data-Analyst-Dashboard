"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Package } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { CountUp } from "../ui/CountUp";

interface Metric {
  title: string;
  value: number;
  format: (val: number) => string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  data: any[];
}

interface MetricGridProps {
  metadata?: any;
}

export const MetricGrid = React.memo(function MetricGrid({ metadata }: MetricGridProps) {
  const metrics: Metric[] = useMemo(() => {
    if (!metadata || !metadata.stats) {
      return [
        {
          title: "Total Records",
          value: metadata?.rowCount || 0,
          format: (val) => val.toLocaleString(),
          trend: "Ready",
          trendUp: true,
          icon: <Activity className="text-apple-blue" size={20} />,
          data: [{ val: 10 }, { val: 20 }, { val: 30 }]
        }
      ];
    }

    const numericalCols = Object.entries(metadata.columnTypes)
      .filter(([_, type]) => type === 'number')
      .map(([col, _]) => col);

    const otherCols = Object.entries(metadata.columnTypes)
      .filter(([_, type]) => type !== 'number')
      .map(([col, _]) => col);

    // Combine them, preferring numerical
    const displayCols = [...numericalCols, ...otherCols].slice(0, 4);

    return displayCols.map((col, i) => {
      const stats = metadata.stats[col];
      const isNumber = metadata.columnTypes[col] === 'number';
      const colors = ["#0071E3", "#34C759", "#FF9500", "#5856D6"];
      const icons = [
        <DollarSign className="text-[#0071E3]" size={20} />,
        <Users className="text-[#34C759]" size={20} />,
        <Package className="text-orange-500" size={20} />,
        <Activity className="text-purple-500" size={20} />
      ];

      return {
        title: isNumber ? `Avg ${col}` : `Unique ${col}`,
        value: isNumber ? (stats?.avg || 0) : (stats?.uniqueCount || 0),
        format: (val) => typeof val === 'number' ? val.toLocaleString(undefined, { 
          maximumFractionDigits: isNumber ? 2 : 0 
        }) : val,
        trend: isNumber ? "Live Stats" : "Distribution",
        trendUp: true,
        icon: icons[i % icons.length],
        data: isNumber 
          ? metadata.preview.map((row: any) => ({ val: row[col] || 0 }))
          : metadata.preview.map((row: any, idx: number) => ({ val: idx % 5 + 2 })) // Simple mock trend for strings
      };
    });
  }, [metadata]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          className="p-8 rounded-[28px] border border-zinc-100 dark:border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all group bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform">
              {metric.icon}
            </div>
            <div className={cn(
              "flex items-center text-[11px] font-bold px-3 py-1 rounded-full",
              metric.trendUp ? "text-[#34C759] bg-[#34C759]/10" : "text-[#FF3B30] bg-[#FF3B30]/10"
            )}>
              {metric.trendUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {metric.trend}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.12em] truncate opacity-80">{metric.title}</p>
            <h2 className="text-[36px] font-bold mt-2 tracking-tight dark:text-white leading-tight">
              <CountUp value={metric.value} format={metric.format} />
            </h2>
          </div>

          <div className="h-10 mt-4 -mx-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metric.data}>
                <defs>
                  <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metric.trendUp ? "#34C759" : "#FF3B30"} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={metric.trendUp ? "#34C759" : "#FF3B30"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke={metric.trendUp ? "#34C759" : "#FF3B30"}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${i})`}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
});
