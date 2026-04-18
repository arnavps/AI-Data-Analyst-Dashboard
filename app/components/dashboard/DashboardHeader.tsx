"use client";

import React from "react";
import { 
  ChevronDown, 
  Bell, 
  Settings, 
  Moon, 
  Sun, 
  FileText,
  Plus,
  Share2,
  Download,
  Calendar
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/app/lib/utils";

interface DashboardHeaderProps {
  filename?: string;
  onNewAnalysis?: () => void;
}

export function DashboardHeader({ filename, onNewAnalysis }: DashboardHeaderProps) {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="glass px-4 py-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center space-x-3 shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-apple-blue/10 flex items-center justify-center">
              <FileText className="text-apple-blue" size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest">Active File</p>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold text-text-primary truncate max-w-[150px]">
                  {filename || "Select a file..."}
                </span>
                <ChevronDown size={14} className="text-apple-text-secondary" />
              </div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex items-center space-x-2 text-apple-text-secondary">
            <Calendar size={16} />
            <span className="text-xs font-medium">Last updated 5m ago</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="rounded-full border-zinc-200 dark:border-zinc-800">
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-zinc-200 dark:border-zinc-800">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={onNewAnalysis} className="rounded-full bg-apple-blue hover:bg-[#0077ED] shadow-subtle">
            <Plus size={16} className="mr-2" />
            New Analysis
          </Button>

          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2" />

          <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full">
            <button 
              onClick={() => setIsDark(false)}
              className={cn("p-1.5 rounded-full transition-all", !isDark ? "bg-white shadow-sm text-apple-blue" : "text-zinc-500")}
            >
              <Sun size={16} />
            </button>
            <button 
              onClick={() => setIsDark(true)}
              className={cn("p-1.5 rounded-full transition-all", isDark ? "bg-zinc-800 shadow-sm text-apple-blue" : "text-zinc-500")}
            >
              <Moon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
