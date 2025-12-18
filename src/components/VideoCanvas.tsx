"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Video, VideoOff, RefreshCw } from "lucide-react";

interface VideoCanvasProps {
  isActive: boolean;
  onToggle: () => void;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({ isActive, onToggle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock skeleton drawing function
  // This draws a simple skeleton overlay to demonstrate the ergonomic tracking concept
  const drawMockSkeleton = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Center point calculations
    const centerX = width / 2;
    const centerY = height / 2;

    // Skeleton proportions (mock positions)
    const headY = centerY - 120;
    const neckY = centerY - 80;
    const shoulderY = centerY - 60;
    const leftShoulderX = centerX - 80;
    const rightShoulderX = centerX + 80;
    const spineTopY = shoulderY;
    const spineBottomY = centerY + 80;
    const elbowY = shoulderY + 60;
    const leftElbowX = centerX - 120;
    const rightElbowX = centerX + 120;

    // Set neon green glow style
    ctx.strokeStyle = "#00FF00";
    ctx.fillStyle = "#00FF00";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Apply glow effect
    ctx.shadowColor = "#00FF00";
    ctx.shadowBlur = 15;

    // Draw head (circle)
    ctx.beginPath();
    ctx.arc(centerX, headY, 25, 0, Math.PI * 2);
    ctx.stroke();

    // Draw neck line
    ctx.beginPath();
    ctx.moveTo(centerX, headY + 25);
    ctx.lineTo(centerX, neckY);
    ctx.stroke();

    // Draw shoulder line
    ctx.beginPath();
    ctx.moveTo(leftShoulderX, shoulderY);
    ctx.lineTo(rightShoulderX, shoulderY);
    ctx.stroke();

    // Draw spine (vertical line from shoulders down)
    ctx.beginPath();
    ctx.moveTo(centerX, spineTopY);
    ctx.lineTo(centerX, spineBottomY);
    ctx.stroke();

    // Draw left arm (shoulder to elbow)
    ctx.beginPath();
    ctx.moveTo(leftShoulderX, shoulderY);
    ctx.lineTo(leftElbowX, elbowY);
    ctx.stroke();

    // Draw right arm (shoulder to elbow)
    ctx.beginPath();
    ctx.moveTo(rightShoulderX, shoulderY);
    ctx.lineTo(rightElbowX, elbowY);
    ctx.stroke();

    // Draw joint dots
    const drawJoint = (x: number, y: number, radius: number = 8) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Shoulder joints
    drawJoint(leftShoulderX, shoulderY);
    drawJoint(rightShoulderX, shoulderY);

    // Elbow joints
    drawJoint(leftElbowX, elbowY);
    drawJoint(rightElbowX, elbowY);

    // Neck joint
    drawJoint(centerX, neckY, 6);

    // Spine midpoint indicator
    drawJoint(centerX, (spineTopY + spineBottomY) / 2, 6);

    // Draw angle indicators (decorative arcs)
    ctx.strokeStyle = "#00FFFF";
    ctx.shadowColor = "#00FFFF";
    ctx.lineWidth = 2;

    // Left elbow angle arc
    ctx.beginPath();
    ctx.arc(leftElbowX, elbowY, 20, -Math.PI * 0.3, Math.PI * 0.5);
    ctx.stroke();

    // Right elbow angle arc
    ctx.beginPath();
    ctx.arc(rightElbowX, elbowY, 20, Math.PI * 0.5, Math.PI * 1.3);
    ctx.stroke();

    // Neck tilt indicator
    ctx.beginPath();
    ctx.arc(centerX, neckY - 10, 15, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();

    // Draw measurement labels
    ctx.shadowBlur = 0;
    ctx.font = "12px monospace";
    ctx.fillStyle = "#00FFFF";
    ctx.fillText("87°", leftElbowX - 35, elbowY - 5);
    ctx.fillText("92°", rightElbowX + 10, elbowY - 5);
    ctx.fillText("SPINE", centerX - 18, spineBottomY + 20);
  }, []);

  // Animation loop for skeleton overlay
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video && isActive) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Match canvas size to video display size
        const rect = video.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Draw the mock skeleton overlay
        drawMockSkeleton(ctx, canvas.width, canvas.height);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, drawMockSkeleton]);

  // Start webcam
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to access camera. Please check permissions."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stop webcam
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, []);

  // Handle camera toggle
  useEffect(() => {
    if (isActive) {
      startCamera();
      animationRef.current = requestAnimationFrame(animate);
    } else {
      stopCamera();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      stopCamera();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, startCamera, stopCamera, animate]);

  return (
    <div className="relative w-full h-full">
      {/* Video container with border effects */}
      <div className="video-container w-full h-full relative rounded-xl overflow-hidden">
        {/* Layer 1: Raw webcam feed */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          style={{ transform: "scaleX(-1)" }} // Mirror the video
        />

        {/* Layer 2: Transparent canvas overlay for skeleton */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "scaleX(-1)" }} // Match video mirroring
        />

        {/* Inactive state overlay */}
        {!isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-800/90">
            <div className="w-24 h-24 rounded-full border-2 border-neon-green/30 flex items-center justify-center mb-4">
              <VideoOff className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm mb-4">Camera is off</p>
            <button
              onClick={onToggle}
              className="px-6 py-2 bg-neon-green/20 border border-neon-green rounded-lg text-neon-green hover:bg-neon-green/30 transition-all btn-neon"
            >
              Start Camera
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-800/80">
            <RefreshCw className="w-10 h-10 text-neon-green animate-spin" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-800/90 p-4">
            <VideoOff className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                startCamera();
              }}
              className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Camera control button (when active) */}
        {isActive && !isLoading && !error && (
          <button
            onClick={onToggle}
            className="absolute bottom-4 right-4 p-3 bg-dark-800/80 border border-gray-600 rounded-full hover:border-neon-green hover:bg-dark-700 transition-all"
            title="Stop Camera"
          >
            <Video className="w-5 h-5 text-neon-green" />
          </button>
        )}

        {/* Scanning line effect */}
        {isActive && !isLoading && !error && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50 animate-pulse"
                 style={{ top: "30%", animationDuration: "3s" }} />
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-neon-green/50 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-neon-green/50 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-neon-green/50 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-neon-green/50 rounded-br-lg" />
    </div>
  );
};

export default VideoCanvas;
