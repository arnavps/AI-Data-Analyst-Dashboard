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
  MessageSquare,
  User
} from "lucide-react";

export default function Home() {
  const [selectedRange, setSelectedRange] = useState("last-30");
  const [activeFile, setActiveFile] = useState<{ id: string; metadata: any } | null>(null);
  const [viewMode, setViewMode] = useState<"chat" | "dashboard" | "vault" | "team" | "settings">("dashboard");
 
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
    <div className="flex h-screen bg-apple-bg dark:bg-apple-bg-dark overflow-hidden font-sans transition-colors duration-500 text-[#1D1D1F] dark:text-zinc-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 flex flex-col bg-white/50 dark:bg-apple-bg-dark z-20">
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
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label="Data Vault" 
            active={viewMode === "vault"}
            onClick={() => setViewMode("vault")}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Team" 
            active={viewMode === "team"}
            onClick={() => setViewMode("team")}
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="Preferences" 
            active={viewMode === "settings"}
            onClick={() => setViewMode("settings")}
          />
        </nav>
 
        <div className="p-4 border-t border-zinc-200 dark:border-white/5">
          <div className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-all cursor-pointer group">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 overflow-hidden shadow-inner flex items-center justify-center">
              <User size={18} className="text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate dark:text-white">Arnav Shirwadkar</p>
              <p className="text-[11px] text-apple-text-secondary truncate font-medium">Pro Analyst</p>
            </div>
          </div>
        </div>
      </aside>
 
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[#FBFBFD] dark:bg-[#161617] transition-colors duration-500">
        {/* Header */}
        <header className="h-16 border-b border-zinc-200/50 flex items-center justify-between px-8 bg-white/70 backdrop-blur-xl z-30 dark:border-white/5 dark:bg-[#161617]/70">
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-apple-text-secondary h-4 w-4 transition-colors group-focus-within:text-apple-blue" />
              <Input
                placeholder="Search analytics, datasets, or ask a question..."
                className="pl-12 bg-zinc-100/50 border-transparent focus-visible:bg-white dark:bg-[#1C1C1E]/50 dark:focus-visible:bg-[#1C1C1E] rounded-2xl transition-all shadow-none focus-visible:shadow-subtle"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 bg-white px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 dark:border-zinc-700 dark:bg-zinc-800">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>
 
          <div className="flex items-center space-x-3 ml-6">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl text-apple-text-secondary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:text-apple-text-primary relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-apple-blue border-2 border-white dark:border-black" />
            </button>
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
            <Button size="sm" className="rounded-xl px-5 py-2.5 bg-apple-blue hover:bg-apple-blue-bright text-white shadow-subtle font-semibold text-sm">
              <Plus size={18} className="mr-2" />
              <span>New Analysis</span>
            </Button>
          </div>
        </header>
 
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {!activeFile && viewMode === "dashboard" ? (
              <motion.div
                key="dashboard-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto p-8 space-y-12 max-w-7xl mx-auto"
              >
                <header className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h1 className="text-[40px] font-bold tracking-tight text-apple-text-primary dark:text-white leading-tight">Dashboard</h1>
                    <p className="text-apple-text-secondary text-lg font-medium">Upload your data to start AI-powered analysis.</p>
                  </div>
                  <div className="w-56">
                    <Select
                      options={ranges}
                      value={selectedRange}
                      onChange={setSelectedRange}
                    />
                  </div>
                </header>
 
                <section className="bg-white p-12 rounded-[40px] border border-zinc-200 shadow-[0_8px_32px_rgba(0,0,0,0.02)] text-center max-w-4xl mx-auto dark:bg-zinc-900/40 dark:border-white/5 backdrop-blur-md">
                  <div className="mb-10">
                    <div className="h-20 w-20 bg-apple-blue/10 rounded-[24px] flex items-center justify-center mx-auto mb-8 text-apple-blue shadow-inner">
                      <Plus size={40} />
                    </div>
                    <h2 className="text-[32px] font-bold mb-4 tracking-tight dark:text-white">Ready to explore?</h2>
                    <p className="text-apple-text-secondary text-lg font-medium max-w-lg mx-auto leading-relaxed">Drag and drop your CSV file below to unlock deep insights with our AI Analyst.</p>
                  </div>
                  <div className="max-w-xl mx-auto">
                    <FileUploader onSuccess={handleFileUploadSuccess} />
                  </div>
                </section>
 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                {activeFile ? (
                  <ChatInterface fileId={activeFile.id} metadata={activeFile.metadata} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <MessageSquare size={48} className="text-apple-blue mb-4 opacity-20" />
                    <h2 className="text-xl font-bold mb-2">No active analysis</h2>
                    <p className="text-apple-text-secondary max-w-md">Please upload a file in the Dashboard view to start chatting with the AI Analyst.</p>
                    <Button onClick={() => setViewMode("dashboard")} variant="outline" className="mt-6">Go to Dashboard</Button>
                  </div>
                )}
              </motion.div>
            ) : viewMode === "vault" ? (
              <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-8">
                <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-zinc-200 rounded-3xl">
                  <BarChart3 size={48} className="text-apple-blue mb-4 opacity-20" />
                  <h2 className="text-2xl font-bold mb-2">Data Vault</h2>
                  <p className="text-apple-text-secondary max-w-sm">Manage your uploaded datasets, export reports, and view historical analysis.</p>
                </div>
              </motion.div>
            ) : viewMode === "team" ? (
              <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-8">
                <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-zinc-200 rounded-3xl">
                  <Users size={48} className="text-apple-blue mb-4 opacity-20" />
                  <h2 className="text-2xl font-bold mb-2">Team Management</h2>
                  <p className="text-apple-text-secondary max-w-sm">Collaborate with your team members and manage access permissions.</p>
                </div>
              </motion.div>
            ) : viewMode === "settings" ? (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-8">
                <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-zinc-200 rounded-3xl">
                  <Settings size={48} className="text-apple-blue mb-4 opacity-20" />
                  <h2 className="text-2xl font-bold mb-2">Preferences</h2>
                  <p className="text-apple-text-secondary max-w-sm">Configure your application settings, theme, and AI model preferences.</p>
                </div>
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
                  metadata={activeFile?.metadata}
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
          : "text-apple-text-secondary hover:bg-zinc-100 hover:text-apple-text-primary dark:hover:bg-white/10 dark:hover:text-white",
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
    <Card className="rounded-[28px] border border-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white dark:bg-zinc-900/40 dark:border-white/5 transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
      <CardContent className="p-8">
        <p className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.12em] opacity-80">{title}</p>
        <div className="flex items-end justify-between mt-4">
          <h2 className="text-[36px] font-bold tracking-tight text-apple-text-primary dark:text-white leading-none">{value}</h2>
          <div className={cn(
            "flex items-center text-[13px] font-bold px-3 py-1.5 rounded-full shadow-sm",
            trendUp ? "text-success bg-success/10" : "text-error bg-error/10"
          )}>
            <TrendingUp size={14} className={cn("mr-1.5", !trendUp && "rotate-180")} />
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
