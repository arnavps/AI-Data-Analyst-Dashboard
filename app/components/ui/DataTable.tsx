"use client";

import React, { useState, useMemo, useCallback } from "react";

import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  ChevronUp, 
  ChevronDown, 
  ArrowUpDown, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  LayoutList,
  LayoutGrid,
  Calendar,
  Type,
  Hash,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

interface Column {
  key: string;
  label: string;
  type: "string" | "number" | "date";
  width?: number;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  onExport?: () => void;
}

export function DataTable({ data, columns, title, onExport }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null }>({
    key: "",
    direction: null,
  });
  const [filterQuery, setFilterQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Sorting logic
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.values(item).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          val.toString().toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [sortedData, filterQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "number": return <Hash size={14} className="text-zinc-400" />;
      case "date": return <Calendar size={14} className="text-zinc-400" />;
      default: return <Type size={14} className="text-zinc-400" />;
    }
  };

  const formatCellValue = (value: any, type: string) => {
    if (value === null || value === undefined) return <span className="text-zinc-300">-</span>;
    
    if (type === "number") {
      return value.toLocaleString();
    }
    
    if (type === "date") {
      try {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      } catch (e) {
        return value.toString();
      }
    }
    
    return value.toString();
  };

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
          <Input
            placeholder="Search data..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="pl-10 bg-zinc-50 dark:bg-zinc-900 border-transparent focus-visible:bg-white dark:focus-visible:bg-zinc-950"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="space-x-2 flex-1 md:flex-none">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="space-x-2 flex-1 md:flex-none" onClick={onExport}>
            <Download size={16} />
            <span>Export</span>
          </Button>
          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "list" ? "bg-white dark:bg-zinc-700 shadow-sm text-apple-blue" : "text-zinc-500"
              )}
            >
              <LayoutList size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "grid" ? "bg-white dark:bg-zinc-700 shadow-sm text-apple-blue" : "text-zinc-500"
              )}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => requestSort(col.key)}
                    className="px-6 py-4 cursor-pointer group transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  >
                    <div className={cn(
                      "flex items-center space-x-2 text-xs font-semibold tracking-wider text-text-secondary uppercase",
                      col.type === "number" && "justify-end"
                    )}>
                      {getTypeIcon(col.type)}
                      <span>{col.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {sortConfig.key === col.key ? (
                          sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="text-zinc-300" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              <AnimatePresence initial={false}>
                {paginatedData.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-6 py-4 text-sm whitespace-nowrap",
                          col.type === "number" ? "text-right font-medium" : "text-text-primary",
                          idx % 2 === 1 && "bg-zinc-50/30 dark:bg-zinc-900/20"
                        )}
                      >
                        {formatCellValue(row[col.key], col.type)}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded">
                        <MoreHorizontal size={16} className="text-zinc-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-text-secondary">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <span>
              Showing <span className="font-medium text-text-primary">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-medium text-text-primary">{Math.min(currentPage * pageSize, filteredData.length)}</span> of{" "}
              <span className="font-medium text-text-primary">{filteredData.length}</span> results
            </span>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex items-center space-x-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium text-text-primary"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-2 space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={cn(
                      "h-8 w-8 rounded-lg text-sm font-medium transition-all",
                      currentPage === pageNum
                        ? "bg-apple-blue text-white shadow-sm"
                        : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="text-zinc-400 mx-1">...</span>}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
