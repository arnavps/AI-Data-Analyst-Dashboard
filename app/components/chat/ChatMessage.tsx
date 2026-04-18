"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, User, AlertCircle, Table, Check } from "lucide-react";
import ChartCard from "../ui/ChartCard";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  type: "text" | "chart" | "table" | "error";
  data?: any;
  chartType?: string;
  timestamp: string;
  status?: "sending" | "sent" | "error";
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-apple-blue" : "bg-system-gray-6"
        }`}>
          {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-apple-text-secondary" />}
        </div>

        {/* Bubble */}
        <div className="flex flex-col gap-1">
          <div
            className={`px-4 py-2 rounded-[20px] text-[15px] leading-relaxed shadow-sm ${
              isUser
                ? "bg-gradient-to-r from-apple-blue to-[#0077ED] text-white rounded-br-none"
                : "bg-[#F5F5F7] text-apple-text-primary rounded-bl-none"
            }`}
          >
            {message.type === "text" && <p>{message.content}</p>}
            
            {message.type === "error" && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle size={16} />
                <p>{message.content}</p>
              </div>
            )}

            {message.type === "chart" && (
              <div className="mt-2 min-w-[300px]">
                <p className="mb-2">{message.content}</p>
                <div className="bg-white rounded-xl p-2 shadow-inner">
                   {/* Simplified chart for bubble view */}
                   <p className="text-xs text-apple-text-secondary mb-1">Visualization Preview</p>
                   <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                      <p className="text-[10px] text-gray-400">Chart rendering in sidebar...</p>
                   </div>
                </div>
              </div>
            )}

            {message.type === "table" && (
              <div className="mt-2 min-w-[300px]">
                <p className="mb-2">{message.content}</p>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                  <table className="w-full text-[11px]">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {Object.keys(message.data?.[0] || {}).slice(0, 3).map(k => (
                          <th key={k} className="px-2 py-1 text-left font-medium">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {message.data?.slice(0, 3).map((row: any, i: number) => (
                        <tr key={i} className="border-b border-gray-50">
                          {Object.values(row).slice(0, 3).map((v: any, j) => (
                            <td key={j} className="px-2 py-1">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-1 text-center bg-gray-50 text-[10px] text-apple-blue font-medium cursor-pointer">
                    View Full Table
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className={`flex items-center gap-1 px-2 ${isUser ? "justify-end" : "justify-start"}`}>
            <span className="text-[10px] text-apple-text-secondary">{message.timestamp}</span>
            {isUser && message.status === "sent" && <Check size={10} className="text-apple-blue" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
