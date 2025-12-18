"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Message } from "@/types";

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI Ergonomic Coach. I'm here to help you maintain proper posture and prevent strain injuries. Start your camera feed and I'll analyze your positioning in real-time. Feel free to ask me any questions about ergonomics!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock AI response (placeholder for OpenAI/Anthropic integration)
  const generateMockResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Mock responses based on keywords
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("posture") || lowerMessage.includes("position")) {
      return "Based on my analysis, I can see you're sitting fairly well! Here are a few tips: Keep your shoulders relaxed and pulled back slightly. Your elbows should be at roughly 90 degrees when typing. Make sure your screen is at eye level to reduce neck strain.";
    }

    if (lowerMessage.includes("back") || lowerMessage.includes("spine")) {
      return "Maintaining proper spinal alignment is crucial! I recommend: Keep your lower back supported by your chair. Avoid slouching forward. Take short breaks every 30 minutes to stand and stretch. Your current spine alignment score is 87% - that's good!";
    }

    if (lowerMessage.includes("break") || lowerMessage.includes("rest")) {
      return "Great question! The 20-20-20 rule is excellent: Every 20 minutes, look at something 20 feet away for 20 seconds. I also recommend standing up every hour for at least 2-3 minutes. Would you like me to set up break reminders for you?";
    }

    if (lowerMessage.includes("desk") || lowerMessage.includes("setup")) {
      return "For an optimal desk setup: Monitor should be arm's length away and top of screen at eye level. Keyboard and mouse at elbow height. Feet flat on the floor or on a footrest. Consider a document holder if you reference papers frequently.";
    }

    if (lowerMessage.includes("exercise") || lowerMessage.includes("stretch")) {
      return "Here are some quick desk exercises: 1) Neck rolls - gently rotate your head in circles. 2) Shoulder shrugs - raise shoulders to ears, hold, release. 3) Seated spinal twist - great for lower back. 4) Wrist circles - important for computer users. Want me to guide you through any of these?";
    }

    return "I understand your concern about ergonomics. Based on the video feed, your current positioning looks reasonable, but there's always room for improvement. Would you like specific advice about your posture, desk setup, or exercises you can do at your workstation?";
  };

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Placeholder for actual AI API call
      const response = await generateMockResponse(userMessage.content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle textarea auto-resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  // Handle Enter key (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-dark-800 rounded-xl border border-gray-700/50 ${className}`}>
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700/50 bg-dark-700/50 rounded-t-xl">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center border border-neon-green/30">
            <Bot className="w-5 h-5 text-neon-green" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-700 pulse-neon" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            AI Ergonomic Coach
            <Sparkles className="w-4 h-4 text-neon-cyan" />
          </h2>
          <p className="text-xs text-gray-400">Online • Analyzing posture</p>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar for assistant */}
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 flex items-center justify-center border border-neon-cyan/30">
                <Bot className="w-4 h-4 text-neon-cyan" />
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.role === "user"
                  ? "chat-bubble-user rounded-br-md"
                  : "chat-bubble-ai rounded-bl-md"
              }`}
            >
              <p className="text-sm text-gray-100 whitespace-pre-wrap">
                {message.content}
              </p>
              <span className="text-[10px] text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Avatar for user */}
            {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <User className="w-4 h-4 text-purple-400" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 flex items-center justify-center border border-neon-cyan/30">
              <Bot className="w-4 h-4 text-neon-cyan" />
            </div>
            <div className="px-4 py-3 rounded-2xl chat-bubble-ai rounded-bl-md">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-neon-cyan animate-spin" />
                <span className="text-sm text-gray-400">Analyzing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-700/50 bg-dark-700/30 rounded-b-xl"
      >
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about posture, ergonomics, or exercises..."
              className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 resize-none min-h-[44px] max-h-[120px] focus:border-neon-green focus:ring-1 focus:ring-neon-green/30 transition-all"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-neon-green/50 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:from-neon-green/30 hover:to-neon-cyan/30 transition-all btn-neon"
          >
            <Send className="w-5 h-5 text-neon-green" />
          </button>
        </div>
        <p className="text-[10px] text-gray-500 mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
