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
  Pie,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Line,
  Brush,
  ReferenceLine,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { 
  MoreHorizontal, 
  Info, 
  Maximize2, 
  Download, 
  Share2, 
  Settings2,
  Table as TableIcon
} from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  type: "area" | "bar" | "pie" | "scatter" | "composed" | "funnel" | "gauge";
  dataKey: string;
  categoryKey: string;
  className?: string;
  color?: string;
  showBrush?: boolean;
}

export function ChartCard({
  title,
  subtitle,
  data,
  type,
  dataKey = "value",
  categoryKey = "name",
  className,
  color: initialColor = "#0071E3",
  showBrush: initialShowBrush = false
}: ChartCardProps) {
  const [activeTab, setActiveTab] = React.useState<"chart" | "table">("chart");
  const [color, setColor] = React.useState(initialColor);
  const [showBrush, setShowBrush] = React.useState(initialShowBrush);
  const [showLabels, setShowLabels] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const exportCSV = () => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => headers.map(h => `"${row[h]}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-elevated z-50">
          <p className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.12em] mb-2 opacity-80">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xl font-bold dark:text-white" style={{ color: entry.color || color }}>
              {entry.value.toLocaleString()}
            </p>
          ))}
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
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E5E7" className="dark:stroke-zinc-800" />
            <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#A1A1A6" }} dy={10} />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fillOpacity={1} fill={`url(#gradient-${title})`} animationDuration={1500}>
              {showLabels && <LabelList dataKey={dataKey} position="top" offset={10} style={{ fontSize: 10, fill: color }} />}
            </Area>
            {showBrush && <Brush dataKey={categoryKey} height={30} stroke={color} fill="#FBFBFD" />}
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E5E7" className="dark:stroke-white/5" />
            <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#A1A1A6" }} dy={10} className="dark:fill-apple-text-secondary" />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} animationDuration={1500}>
              {showLabels && <LabelList dataKey={dataKey} position="top" style={{ fontSize: 10, fill: color }} />}
            </Bar>
          </BarChart>
        );
      case "scatter":
        return (
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E7" />
            <XAxis dataKey={categoryKey} type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis dataKey={dataKey} type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <ZAxis range={[60, 400]} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name={title} data={data} fill={color} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fillOpacity={0.6} strokeWidth={2} stroke={color} />
              ))}
            </Scatter>
          </ScatterChart>
        );
      case "composed":
        return (
          <ComposedChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E5E7" />
            <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} barSize={20} />
            <Line type="monotone" dataKey={dataKey} stroke="#FF2D55" strokeWidth={3} dot={{ r: 4, fill: "#FF2D55" }} />
          </ComposedChart>
        );
      case "funnel":
        return (
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel dataKey={dataKey} data={data} isAnimationActive>
              <LabelList position="right" fill="#A1A1A6" stroke="none" dataKey={categoryKey} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={[color, "#34C759", "#5856D6", "#FF9500", "#FF2D55"][index % 5]} />
              ))}
            </Funnel>
          </FunnelChart>
        );
      case "gauge":
        const total = 100;
        const value = data[0]?.[dataKey] || 0;
        const gaugeData = [
          { name: "Value", value: value, fill: color },
          { name: "Remaining", value: total - value, fill: "#F5F5F7" }
        ];
        return (
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={100}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#F5F5F7" className="dark:fill-zinc-800" />
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey={dataKey} animationDuration={1500}>
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

  const renderTable = () => {
    if (!data || data.length === 0) return null;
    const keys = Object.keys(data[0]);
    return (
      <div className="overflow-auto max-h-[250px] scrollbar-hide">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-white dark:bg-apple-surface z-10">
            <tr>
              {keys.map(key => (
                <th key={key} className="p-3 border-b border-zinc-100 dark:border-white/5 font-bold text-apple-text-secondary uppercase tracking-[0.1em]">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                {keys.map(key => (
                  <td key={key} className="p-3 border-b border-zinc-50 dark:border-white/5 text-apple-text-primary dark:text-zinc-200">
                    {String(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn("glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col h-full group transition-all", className)}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.12em] opacity-80">{title}</h3>
          {subtitle && <p className="text-3xl font-bold mt-2 tracking-tight dark:text-white">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setActiveTab(activeTab === "chart" ? "table" : "chart")}
            className={cn("p-1.5 rounded-lg transition-colors", activeTab === "table" ? "bg-apple-blue/10 text-apple-blue" : "hover:bg-zinc-100 dark:hover:bg-zinc-900")}
          >
            <TableIcon size={16} />
          </button>
          <button 
            onClick={exportCSV}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors text-zinc-500"
          >
            <Download size={16} />
          </button>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={cn("p-1.5 rounded-lg transition-colors", isSettingsOpen ? "bg-apple-blue/10 text-apple-blue" : "hover:bg-zinc-100 dark:hover:bg-zinc-900")}
          >
            <Settings2 size={16} />
          </button>
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors text-zinc-500">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {isSettingsOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px]"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-text-secondary uppercase">Color:</span>
              <div className="flex space-x-1">
                {["#0071E3", "#34C759", "#FF2D55", "#5856D6", "#FF9500"].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setColor(c)}
                    className={cn("w-3 h-3 rounded-full transition-transform", color === c ? "scale-125 ring-2 ring-white" : "hover:scale-110")}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={showBrush} onChange={e => setShowBrush(e.target.checked)} className="accent-apple-blue" />
              <span className="text-text-secondary uppercase">Range Brush</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)} className="accent-apple-blue" />
              <span className="text-text-secondary uppercase">Labels</span>
            </label>
          </div>
          <button onClick={() => setIsSettingsOpen(false)} className="text-apple-blue font-semibold uppercase">Done</button>
        </motion.div>
      )}

      <div className="flex-1 w-full min-h-[220px]">
        {activeTab === "chart" ? (
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        ) : (
          renderTable()
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-[10px] text-apple-text-secondary font-medium">
        <div className="flex items-center space-x-2 opacity-80">
          <Settings2 size={12} className="text-apple-blue" />
          <span>Auto-configured visualization</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            <span className="dark:text-zinc-300">{dataKey}</span>
          </span>
          {type === "composed" && (
            <span className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D55] shadow-sm" />
              <span className="dark:text-zinc-300">Trend</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const MemoizedChartCard = React.memo(ChartCard);
export default MemoizedChartCard;
