"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { cn } from "@/app/lib/utils";
import { MoreHorizontal, Info } from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  type: "area" | "bar" | "pie";
  dataKey: string;
  categoryKey: string;
  className?: string;
  color?: string;
}

export function ChartCard({
  title,
  subtitle,
  data,
  type,
  dataKey = "value",
  categoryKey = "name",
  className,
  color = "#0071E3"
}: ChartCardProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{label}</p>
          <p className="text-lg font-bold text-text-primary">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E5E7" className="dark:stroke-zinc-800" />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: "#86868B" }} 
              dy={10}
            />
            <YAxis 
              hide 
              domain={["auto", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E5E7" className="dark:stroke-zinc-800" />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: "#86868B" }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[6, 6, 0, 0]} 
              animationDuration={1500}
            />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={dataKey}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={[color, "#34C759", "#5856D6", "#FF9500", "#FF2D55"][index % 5]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-2xl font-bold mt-1 tracking-tight">{subtitle}</p>}
        </div>
        <button className="text-zinc-400 hover:text-text-primary transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Info size={12} />
          <span>Updated 5m ago</span>
        </div>
        <button className="hover:text-apple-blue transition-colors">View Report</button>
      </div>
    </div>
  );
}
