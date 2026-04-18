"use client";

import React, { useState } from "react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { FileUploader } from "@/app/components/ui/FileUploader";
import ChatInterface from "@/app/components/chat/ChatInterface";
import { DashboardView } from "@/app/components/dashboard/DashboardView";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  TrendingUp,
  MessageSquare
} from "lucide-react";

export default function Home() {
  const [selectedRange, setSelectedRange] = useState("last-30");
  const [activeFile, setActiveFile] = useState<{ id: string; metadata: any } | null>(null);
  const [viewMode, setViewMode] = useState<"chat" | "dashboard">("dashboard");

  const ranges = [
    { label: "Last 7 Days", value: "last-7" },
    { label: "Last 30 Days", value: "last-30" },
    { label: "Last 3 Months", value: "last-90" },
    { label: "Year to Date", value: "ytd" },
  ];

  const handleFileUploadSuccess = (result: any) => {
    setActiveFile({
      id: result.fileId,
      metadata: result
    });
  };

  return (
    <div className="flex h-screen bg-[#FBFBFD] overflow-hidden text-apple-text-primary">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 flex flex-col glass z-20">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-apple-blue to-[#0077ED] flex items-center justify-center shadow-subtle">
              <Activity className="text-white h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">AI Analyst</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            active={viewMode === "dashboard"} 
            onClick={() => setViewMode("dashboard")} 
          />
          <NavItem 
            icon={<MessageSquare size={18} />} 
            label="AI Assistant" 
            active={viewMode === "chat"} 
            onClick={() => setViewMode("chat")}
            disabled={!activeFile}
          />
          <NavItem icon={<BarChart3 size={18} />} label="Data Vault" />
          <NavItem icon={<Users size={18} />} label="Team" />
          <NavItem icon={<Settings size={18} />} label="Preferences" />
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 overflow-hidden shadow-inner" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Arnav Shirwadkar</p>
              <p className="text-[11px] text-apple-text-secondary truncate">Pro Analyst</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-apple-text-secondary h-4 w-4" />
              <Input 
                placeholder="Search analytics, reports..." 
                className="pl-10 bg-zinc-100/50 border-transparent focus-visible:bg-white rounded-full transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-apple-text-secondary hover:text-apple-text-primary transition-colors">
              <Bell size={20} />
            </button>
            <Button size="sm" className="rounded-full px-4 bg-apple-blue hover:bg-[#0077ED] shadow-subtle">
              <Plus size={16} className="mr-1" />
              <span>New Analysis</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {!activeFile ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto p-8 space-y-10"
              >
                <header className="flex items-end justify-between">
                  <div>
                    <h1 className="text-[32px] font-bold tracking-tight text-apple-text-primary">Dashboard</h1>
                    <p className="text-apple-text-secondary text-lg">Upload your data to start AI-powered analysis.</p>
                  </div>
                  <div className="w-48">
                    <Select 
                      options={ranges} 
                      value={selectedRange} 
                      onChange={setSelectedRange} 
                    />
                  </div>
                </header>

                <section className="bg-white p-10 rounded-[28px] shadow-card border border-gray-100 text-center max-w-4xl mx-auto">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Ready to explore?</h2>
                    <p className="text-apple-text-secondary">Drag and drop your CSV file below to begin the magic.</p>
                  </div>
                  <FileUploader onSuccess={handleFileUploadSuccess} />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <StatCard title="Total Files" value="12" trend="+2" trendUp={true} />
                   <StatCard title="AI Queries" value="1,482" trend="+12%" trendUp={true} />
                   <StatCard title="System Load" value="12%" trend="-5%" trendUp={false} />
                </div>
              </motion.div>
            ) : viewMode === "chat" ? (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full p-4"
              >
                <ChatInterface fileId={activeFile.id} metadata={activeFile.metadata} />
              </motion.div>
            ) : (
              <motion.div 
                key="dashboard-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <DashboardView 
                  metadata={activeFile.metadata} 
                  onNewAnalysis={() => setActiveFile(null)} 
                  onSwitchToChat={() => setViewMode("chat")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  active = false, 
  disabled = false,
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  disabled?: boolean;
  onClick?: () => void 
}) {
  return (
    <div 
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer group",
        active 
          ? "bg-apple-blue text-white shadow-subtle" 
          : "text-apple-text-secondary hover:bg-zinc-100 hover:text-apple-text-primary",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
    >
      <span className={cn("transition-colors", active ? "text-white" : "group-hover:text-apple-blue")}>
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp }: { title: string; value: string; trend: string; trendUp: boolean }) {
  return (
    <Card className="rounded-2xl border-none shadow-sm bg-white">
      <CardContent className="p-6">
        <p className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-widest">{title}</p>
        <div className="flex items-end justify-between mt-2">
          <h2 className="text-3xl font-bold">{value}</h2>
          <div className={cn(
            "flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full",
            trendUp ? "text-success bg-success/10" : "text-error bg-error/10"
          )}>
            <TrendingUp size={12} className={cn("mr-1", !trendUp && "rotate-180")} />
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
