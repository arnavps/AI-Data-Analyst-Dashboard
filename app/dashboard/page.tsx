"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { FileUploader } from "@/app/components/ui/FileUploader";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  LayoutDashboard, 
  Settings, 
  Users, 
  Search, 
  Bell, 
  Plus, 
  TrendingUp, 
  Activity,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [selectedRange, setSelectedRange] = React.useState("last-30");

  const ranges = [
    { label: "Last 7 Days", value: "last-7" },
    { label: "Last 30 Days", value: "last-30" },
    { label: "Last 3 Months", value: "last-90" },
    { label: "Year to Date", value: "ytd" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 flex flex-col glass z-10">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-apple-blue to-apple-blue-bright flex items-center justify-center">
              <Activity className="text-white h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">AI Analyst</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          <NavItem icon={<Users size={18} />} label="Customers" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Arnav Shirwadkar</p>
              <p className="text-xs text-text-secondary truncate">arnav@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 glass z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary h-4 w-4" />
              <Input 
                placeholder="Search analytics, reports..." 
                className="pl-10 bg-zinc-100/50 dark:bg-zinc-800/50 border-transparent focus-visible:bg-white dark:focus-visible:bg-zinc-900"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Bell size={20} />
            </button>
            <Button size="sm" className="space-x-1">
              <Plus size={16} />
              <span>New Project</span>
            </Button>
          </div>
        </header>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <header className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-text-secondary">Welcome back. Here's what's happening today.</p>
            </div>
            <div className="w-48">
              <Select 
                options={ranges} 
                value={selectedRange} 
                onChange={setSelectedRange} 
              />
            </div>
          </header>

          {/* Upload Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Analyze New Data</h2>
              <p className="text-sm text-text-secondary">Upload a CSV file to generate AI-powered insights.</p>
            </div>
            <FileUploader />
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Revenue" 
              value="$124,592" 
              trend="+12.5%" 
              trendUp={true} 
            />
            <StatCard 
              title="Active Users" 
              value="12,482" 
              trend="+3.2%" 
              trendUp={true} 
            />
            <StatCard 
              title="Conversion Rate" 
              value="3.42%" 
              trend="-0.5%" 
              trendUp={false} 
            />
            <StatCard 
              title="Session Duration" 
              value="4m 32s" 
              trend="+1.2%" 
              trendUp={true} 
            />
          </div>

          {/* Main Analytics Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Growth Analysis</CardTitle>
                  <CardDescription>Monthly growth over the last year.</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-apple-blue" />
                    <span className="text-xs text-text-secondary">Direct</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-zinc-300" />
                    <span className="text-xs text-text-secondary">Referral</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-64 flex items-end justify-between space-x-2 pt-4">
                {/* Mock Chart */}
                {[40, 60, 45, 80, 55, 90, 75, 100, 85, 95, 110, 130].map((val, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-apple-blue to-apple-blue-bright rounded-t-sm relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${val}k
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events from your team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ActivityItem 
                  user="Sarah K." 
                  action="published a new report" 
                  time="2m ago" 
                />
                <ActivityItem 
                  user="John D." 
                  action="updated the data schema" 
                  time="15m ago" 
                />
                <ActivityItem 
                  user="AI Agent" 
                  action="detected a performance anomaly" 
                  time="1h ago" 
                  isAlert
                />
                <ActivityItem 
                  user="Emma W." 
                  action="shared project with team" 
                  time="3h ago" 
                />
                <Button variant="ghost" size="sm" className="w-full text-apple-blue">
                  View all activity <ChevronRight size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div 
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all cursor-pointer group",
        active 
          ? "bg-apple-blue text-white shadow-subtle" 
          : "text-text-secondary hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-text-primary"
      )}
    >
      <span className={cn("transition-colors", active ? "text-white" : "group-hover:text-apple-blue")}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp }: { title: string; value: string; trend: string; trendUp: boolean }) {
  return (
    <Card isGlass>
      <CardContent className="p-6">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{title}</p>
        <div className="flex items-end justify-between mt-2">
          <h2 className="text-2xl font-bold">{value}</h2>
          <div className={cn(
            "flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full",
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

function ActivityItem({ user, action, time, isAlert = false }: { user: string; action: string; time: string; isAlert?: boolean }) {
  return (
    <div className="flex items-start space-x-3">
      <div className={cn(
        "h-2 w-2 rounded-full mt-1.5",
        isAlert ? "bg-error animate-pulse" : "bg-zinc-300 dark:bg-zinc-700"
      )} />
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold text-text-primary dark:text-white">{user}</span>
          {" "}{action}
        </p>
        <p className="text-xs text-text-secondary mt-0.5">{time}</p>
      </div>
    </div>
  );
}
