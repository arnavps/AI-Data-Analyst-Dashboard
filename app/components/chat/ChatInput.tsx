"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  suggestions: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, suggestions }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto p-4">
      {/* Suggestions */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <AnimatePresence>
          {suggestions.map((suggestion, i) => (
            <motion.button
              key={suggestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setInput(suggestion)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[13px] text-apple-text-secondary hover:border-apple-blue hover:text-apple-blue transition-all shadow-sm"
            >
              {suggestion}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <div className="relative flex items-end gap-2 bg-[#F2F2F7] rounded-[24px] p-1.5 border border-gray-200 focus-within:border-apple-blue transition-colors">
        <button className="p-2 text-apple-text-secondary hover:text-apple-blue transition-colors">
          <Plus size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your data..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-2 resize-none max-h-[120px] scrollbar-hide leading-snug"
          rows={1}
        />

        <div className="flex items-center gap-1">
          <button className="p-2 text-apple-text-secondary hover:text-apple-blue transition-colors">
            <Mic size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-all ${
              input.trim() && !isLoading
                ? "bg-apple-blue text-white shadow-md scale-100"
                : "bg-gray-300 text-gray-500 scale-90"
            }`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
