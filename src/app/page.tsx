"use client";

import React, { useState } from "react";
import { Camera, MessageSquare, Settings, Activity, Zap } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import VideoCanvas from "@/components/VideoCanvas";
import BiometricsPanel from "@/components/BiometricsPanel";

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-dark-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center border border-neon-green/30 neon-border">
                <Zap className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white flex items-center gap-2">
                  AI Ergonomic Coach
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                    BETA
                  </span>
                </h1>
                <p className="text-xs text-gray-400">Real-time posture analysis</p>
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-all">
                <Camera className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-all">
                <Activity className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content - Split view dashboard */}
      <main className="max-w-screen-2xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-100px)]">
          {/* Left side - Chat Interface */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-neon-cyan" />
              <h2 className="text-sm font-semibold text-gray-300">AI Coach Chat</h2>
            </div>
            <ChatInterface className="flex-1 min-h-0" />
          </div>

          {/* Right side - Video Feed and Biometrics */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
            {/* Video Feed Container */}
            <div className="flex-1 min-h-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-neon-green" />
                  <h2 className="text-sm font-semibold text-gray-300">Video Feed</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-neon-green pulse-neon' : 'bg-gray-500'}`} />
                  <span className="text-xs text-gray-400">
                    {isCameraActive ? 'Camera Active' : 'Camera Inactive'}
                  </span>
                </div>
              </div>
              <div className="h-[calc(100%-32px)] bg-dark-800 rounded-xl border border-gray-700/50 p-2">
                <VideoCanvas
                  isActive={isCameraActive}
                  onToggle={() => setIsCameraActive(!isCameraActive)}
                />
              </div>
            </div>

            {/* Biometrics Panel */}
            <div className="h-auto lg:h-[200px]">
              <BiometricsPanel isActive={isCameraActive} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-2 text-center bg-dark-900/80 backdrop-blur-sm border-t border-gray-800/50">
        <p className="text-xs text-gray-500">
          AI Ergonomic Coach SDK • Powered by Advanced Computer Vision
        </p>
      </footer>
    </div>
  );
}
