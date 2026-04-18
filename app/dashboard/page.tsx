"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { FileUploader } from "@/app/components/ui/FileUploader";
import { DataTable } from "@/app/components/ui/DataTable";
import { ChartCard } from "@/app/components/ui/ChartCard";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedRange, setSelectedRange] = React.useState("last-30");

  const ranges = [
    { label: "Last 7 Days", value: "last-7" },
    { label: "Last 30 Days", value: "last-30" },
    { label: "Last 3 Months", value: "last-90" },
    { label: "Year to Date", value: "ytd" },
  ];

  const dummyColumns = [
    { key: "id", label: "ID", type: "number" as const },
    { key: "customer", label: "Customer", type: "string" as const },
    { key: "status", label: "Status", type: "string" as const },
    { key: "amount", label: "Amount", type: "number" as const },
    { key: "date", label: "Date", type: "date" as const },
  ];

  const dummyData = Array.from({ length: 50 }).map((_, i) => ({
    id: 1000 + i,
    customer: ["Apple Inc.", "Microsoft", "Google", "Amazon", "Tesla", "Netflix", "Meta"][i % 7],
    status: ["Completed", "Pending", "Processing", "Cancelled"][i % 4],
    amount: Math.floor(Math.random() * 10000) + 100,
    date: new Date(2024, 0, 1 + i).toISOString(),
  }));

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
    { month: "Jul", revenue: 72000 },
  ];

  const categoryData = [
    { name: "SaaS", value: 400 },
    { name: "Hardware", value: 300 },
    { name: "Services", value: 300 },
    { name: "Consulting", value: 200 },
  ];

  const userActivityData = [
    { day: "Mon", users: 1200 },
    { day: "Tue", users: 1500 },
    { day: "Wed", users: 1100 },
    { day: "Thu", users: 1800 },
    { day: "Fri", users: 2100 },
    { day: "Sat", users: 1600 },
    { day: "Sun", users: 1300 },
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
            <ChartCard 
              title="Revenue Growth" 
              subtitle="$124,592" 
              type="area" 
              data={revenueData} 
              dataKey="revenue" 
              categoryKey="month" 
            />
            <ChartCard 
              title="Daily Active Users" 
              subtitle="2,482" 
              type="bar" 
              data={userActivityData} 
              dataKey="users" 
              categoryKey="day" 
              color="#34C759"
            />
            <ChartCard 
              title="Market Share" 
              subtitle="24.5%" 
              type="pie" 
              data={categoryData} 
              dataKey="value" 
              categoryKey="name" 
              color="#5856D6"
            />
            <StatCard 
              title="Session Duration" 
              value="4m 32s" 
              trend="+1.2%" 
              trendUp={true} 
            />
          </div>

          {/* Data Table Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <p className="text-sm text-text-secondary">Detailed view of your analyzed datasets.</p>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <DataTable 
              columns={dummyColumns} 
              data={dummyData} 
              onExport={() => alert("Exporting data...")}
            />
          </section>

          {/* Main Analytics Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>AI Activity Log</CardTitle>
                  <CardDescription>Real-time processing updates from your AI agents.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <ActivityItem 
                  user="AI Agent Alpha" 
                  action="completed anomaly detection on Q1 dataset" 
                  time="2m ago" 
                />
                <ActivityItem 
                  user="AI Agent Beta" 
                  action="optimized query latency for production" 
                  time="15m ago" 
                />
                <ActivityItem 
                  user="System" 
                  action="detected a storage limit warning" 
                  time="1h ago" 
                  isAlert
                />
                <ActivityItem 
                  user="AI Agent Gamma" 
                  action="generated 5 new predictive models" 
                  time="3h ago" 
                />
                <Button variant="ghost" size="sm" className="w-full text-apple-blue">
                  View full audit log <ChevronRight size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Current operational state.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="text-4xl font-bold text-success">99.9%</div>
                  <p className="text-sm text-text-secondary mt-1 uppercase tracking-wider font-semibold">Uptime Status</p>
                  <div className="mt-4 flex items-center justify-center space-x-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="h-4 w-1 bg-success rounded-full opacity-50" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
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
