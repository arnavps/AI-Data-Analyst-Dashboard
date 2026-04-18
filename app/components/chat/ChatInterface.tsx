"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Maximize2,
  Trash2
} from "lucide-react";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChartCard from "../ui/ChartCard";
import { InsightSection } from "../insights/InsightSection";

interface ChatInterfaceProps {
  fileId: string;
  metadata: any;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ fileId, metadata }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: `Hello! I've analyzed "${metadata?.filename || "your file"}". You can ask me to visualize trends, aggregate data, or find top performers. What would you like to see?`,
      type: "text",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeViz, setActiveViz] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [vizPanelOpen, setVizPanelOpen] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      type: "text",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending"
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, question: content }),
      });

      const result = await response.json();

      if (result.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: typeof result.data.insights?.[0] === 'object' 
            ? result.data.insights[0].description 
            : (result.data.insights?.[0] || "Here are the results of your query:"),
          type: result.data.queryPlan?.operation === "stats" ? "text" : (result.data.queryPlan?.chartType ? "chart" : "table"),
          data: result.data.data,
          chartType: result.data.queryPlan?.chartType,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.id === userMessage.id) last.status = "sent";
          return [...updated, aiMessage];
        });

        if (result.data.queryPlan?.chartType) {
          setActiveViz({
            title: content,
            data: result.data.data,
            type: result.data.queryPlan.chartType,
            insights: result.data.insights,
            dataKey: result.data.queryPlan.visualization?.yAxis || result.data.queryPlan.column,
            categoryKey: result.data.queryPlan.visualization?.xAxis || result.data.queryPlan.groupBy
          });
          setVizPanelOpen(true);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: error.message || "Something went wrong. Please try again.",
        type: "error",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100">
      {/* Left Sidebar: File Info */}
      <motion.div 
        animate={{ width: sidebarOpen ? 280 : 0 }}
        className="bg-system-gray-6 border-r border-gray-100 overflow-hidden flex flex-col"
      >
        <div className="p-6 flex flex-col gap-6">
          <div>
             <h3 className="text-[13px] font-semibold text-apple-text-secondary uppercase tracking-wider mb-4">File Details</h3>
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 bg-apple-blue/10 rounded-xl flex items-center justify-center">
                      <FileText className="text-apple-blue" size={20} />
                   </div>
                   <div className="overflow-hidden">
                      <p className="text-[14px] font-semibold text-apple-text-primary truncate">{metadata?.filename}</p>
                      <p className="text-[12px] text-apple-text-secondary">{metadata?.rowCount} rows</p>
                   </div>
                </div>
                <div className="space-y-2">
                   {metadata?.columns?.slice(0, 5).map((col: string) => (
                      <div key={col} className="flex items-center justify-between text-[12px]">
                         <span className="text-apple-text-secondary">{col}</span>
                         <span className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] text-gray-500">
                            {metadata?.columnTypes?.[col] || "text"}
                         </span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div>
             <h3 className="text-[13px] font-semibold text-apple-text-secondary uppercase tracking-wider mb-4">Quick Actions</h3>
             <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-left text-[14px] text-apple-text-primary">
                   <BarChart3 size={18} className="text-apple-blue" />
                   Analyze Trends
                </button>
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-left text-[14px] text-apple-text-primary">
                   <Info size={18} className="text-purple-500" />
                   Get Summary
                </button>
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-left text-[14px] text-apple-text-primary">
                   <Trash2 size={18} className="text-red-500" />
                   Clear Chat
                </button>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Center: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 backdrop-blur-md bg-white/80 sticky top-0 z-10">
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-apple-text-secondary"
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
              <div>
                 <h2 className="text-[16px] font-semibold text-apple-text-primary">Data Assistant</h2>
                 <p className="text-[11px] text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Always active
                 </p>
              </div>
           </div>
           
           <button 
             onClick={() => setVizPanelOpen(!vizPanelOpen)}
             className={`p-2 rounded-lg transition-colors ${vizPanelOpen ? "bg-apple-blue/10 text-apple-blue" : "text-apple-text-secondary hover:bg-gray-100"}`}
           >
              <BarChart3 size={20} />
           </button>
        </div>

        {/* Messages List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-[#F5F5F7] px-4 py-3 rounded-[20px] rounded-bl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-100 bg-white/80 backdrop-blur-xl p-4">
           <ChatInput 
             onSendMessage={handleSendMessage} 
             isLoading={isLoading}
             suggestions={[
               "Show sales trend",
               "Top 5 products by revenue",
               "Average customer spend",
               "Distribution of categories"
             ]}
           />
        </div>
      </div>

      {/* Right: Visualization Results Panel */}
      <motion.div 
        animate={{ width: vizPanelOpen ? 400 : 0 }}
        className="bg-system-gray-6 border-l border-gray-100 overflow-hidden"
      >
        <div className="w-[400px] h-full flex flex-col">
           <div className="p-6 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-[13px] font-semibold text-apple-text-secondary uppercase tracking-wider">Analysis Result</h3>
                 <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-apple-text-secondary">
                    <Maximize2 size={16} />
                 </button>
              </div>
              <h4 className="text-[18px] font-bold text-apple-text-primary leading-tight">
                 {activeViz ? activeViz.title : "No active analysis"}
              </h4>
           </div>

           <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {activeViz ? (
                <>
                  <ChartCard 
                    title="Visualization" 
                    type={activeViz.type} 
                    data={activeViz.data} 
                    dataKey={activeViz.dataKey}
                    categoryKey={activeViz.categoryKey}
                  />
                  
                  <InsightSection insights={activeViz.insights} />
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
                   <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <BarChart3 size={32} className="text-gray-400" />
                   </div>
                   <p className="text-[14px] font-medium text-gray-500">
                      Ask a question to see <br /> visualizations here
                   </p>
                </div>
              )}
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
