"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Package } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface Metric {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  data: any[];
}

const mockData = [
  { val: 10 }, { val: 20 }, { val: 15 }, { val: 30 }, { val: 25 }, { val: 40 }
];

const metrics: Metric[] = [
  {
    title: "Total Revenue",
    value: "$128,430",
    trend: "+12.5%",
    trendUp: true,
    icon: <DollarSign className="text-apple-blue" size={20} />,
    data: mockData
  },
  {
    title: "Active Users",
    value: "2,842",
    trend: "+5.2%",
    trendUp: true,
    icon: <Users className="text-apple-success" size={20} />,
    data: mockData.map(d => ({ val: d.val * 0.8 }))
  },
  {
    title: "Avg. Order Value",
    value: "$45.20",
    trend: "-2.1%",
    trendUp: false,
    icon: <Package className="text-orange-500" size={20} />,
    data: mockData.map(d => ({ val: 50 - d.val }))
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "+0.4%",
    trendUp: true,
    icon: <Activity className="text-purple-500" size={20} />,
    data: mockData.map(d => ({ val: d.val * 1.2 }))
  }
];

export function MetricGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform">
              {metric.icon}
            </div>
            <div className={cn(
              "flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full",
              metric.trendUp ? "text-apple-success bg-apple-success/10" : "text-apple-error bg-apple-error/10"
            )}>
              {metric.trendUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {metric.trend}
            </div>
          </div>
          
          <div>
            <p className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-widest">{metric.title}</p>
            <h2 className="text-3xl font-bold mt-1 tracking-tight">{metric.value}</h2>
          </div>

          <div className="h-10 mt-4 -mx-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metric.data}>
                <defs>
                  <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metric.trendUp ? "#34C759" : "#FF3B30"} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={metric.trendUp ? "#34C759" : "#FF3B30"} stopOpacity={0}/>
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
}
