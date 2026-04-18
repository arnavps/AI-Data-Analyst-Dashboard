"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Upload, CheckCircle2, AlertCircle, FileSpreadsheet } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";

interface FileMetadata {
  name: string;
  size: number;
  rows: number;
  cols: number;
  headers: string[];
}

interface FileUploaderProps {
  onSuccess?: (result: any) => void;
}

export function FileUploader({ onSuccess }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [data, setData] = useState<any[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    
    if (!selectedFile) return;

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("File size too large", {
        description: "Please upload a CSV file smaller than 50MB.",
      });
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Parse CSV
    Papa.parse(selectedFile, {
      header: true,
      complete: (results) => {
        setTimeout(() => {
          setIsUploading(false);
          setMetadata({
            name: selectedFile.name,
            size: selectedFile.size,
            rows: results.data.length,
            cols: results.meta.fields?.length || 0,
            headers: results.meta.fields || [],
          });
          setData(results.data);
          toast.success("File uploaded successfully");
        }, 1200); // Small delay for UX
      },
      error: (error) => {
        setIsUploading(false);
        toast.error("Error parsing CSV", {
          description: error.message,
        });
      },
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setMetadata(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {!file ? (
          <div
            key="dropzone-container"
            {...getRootProps()}
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={cn(
                "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center",
                isDragActive
                  ? "border-apple-blue bg-apple-blue/5 scale-[1.02]"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-apple-blue/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:-translate-y-1"
              )}
            >
              <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                isDragActive ? "bg-apple-blue text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-apple-blue"
              )}>
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag CSV file here</h3>
              <p className="text-text-secondary">or click to browse from your computer</p>
              <div className="mt-8 flex items-center space-x-2 text-xs text-text-secondary">
                <FileText size={14} />
                <span>Max size: 50MB</span>
                <span className="mx-2">•</span>
                <span>Only .csv files supported</span>
              </div>
            </div>
          </motion.div>
        </div>
        ) : (
          <motion.div
            key="file-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-card relative overflow-hidden"
          >
            {isUploading && (
              <div className="absolute top-0 left-0 h-1 bg-apple-blue transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            )}

            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg truncate max-w-[250px]">{file.name}</h4>
                  <p className="text-sm text-text-secondary">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <button
                onClick={removeFile}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-error"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-text-secondary mb-1">Total Rows</p>
                <p className="font-bold">{isUploading ? "..." : metadata?.rows.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-text-secondary mb-1">Total Columns</p>
                <p className="font-bold">{isUploading ? "..." : metadata?.cols}</p>
              </div>
            </div>

            {metadata && (
              <div className="mt-6">
                <p className="text-xs text-text-secondary mb-3">Header Preview</p>
                <div className="flex flex-wrap gap-2">
                  {metadata.headers.slice(0, 5).map((header) => (
                    <span key={header} className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium">
                      {header}
                    </span>
                  ))}
                  {metadata.headers.length > 5 && (
                    <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium">
                      +{metadata.headers.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isUploading ? (
                  <div className="flex items-center space-x-2 text-sm text-apple-blue">
                    <div className="h-2 w-2 rounded-full bg-apple-blue animate-pulse" />
                    <span>Analyzing data...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <CheckCircle2 size={16} />
                    <span>Ready for analysis</span>
                  </div>
                )}
              </div>
              <Button 
                disabled={isUploading} 
                size="sm"
                onClick={() => {
                  if (onSuccess && metadata && data) {
                    onSuccess({
                      fileId: Math.random().toString(36).substr(2, 9),
                      name: metadata.name,
                      size: metadata.size,
                      rows: metadata.rows,
                      cols: metadata.cols,
                      headers: metadata.headers,
                      data: data
                    });
                  }
                }}
              >
                Analyze Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
