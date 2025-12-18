"use client";

import React from "react";
import { Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface BiometricItemProps {
  label: string;
  value: string;
  status: "good" | "warning" | "poor";
  icon: React.ReactNode;
}

const BiometricItem: React.FC<BiometricItemProps> = ({ label, value, status, icon }) => {
  const statusColors = {
    good: {
      bg: "bg-neon-green/10",
      border: "border-neon-green/30",
      text: "text-neon-green",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-500",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    poor: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-500",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  };

  const colors = statusColors[status];

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${colors.bg} border ${colors.border} transition-all hover:scale-[1.02]`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-dark-700 ${colors.text}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
          <p className={`text-lg font-bold ${colors.text}`}>{value}</p>
        </div>
      </div>
      <div className={colors.text}>{colors.icon}</div>
    </div>
  );
};

interface BiometricsPanelProps {
  isActive: boolean;
}

const BiometricsPanel: React.FC<BiometricsPanelProps> = ({ isActive }) => {
  // Mock biometric data (will be replaced with real AI analysis)
  const mockBiometrics = {
    spineAlignment: { value: "87%", status: "good" as const },
    elbowAngle: { value: "92°", status: "good" as const },
    neckTilt: { value: "12°", status: "warning" as const },
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-gray-700/50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-neon-cyan" />
          <h3 className="text-sm font-semibold text-white">Biometric Insights</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-neon-green pulse-neon' : 'bg-gray-500'}`} />
          <span className="text-xs text-gray-400">
            {isActive ? 'Live' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Biometric items */}
      {isActive ? (
        <div className="space-y-3">
          <BiometricItem
            label="Spine Alignment"
            value={mockBiometrics.spineAlignment.value}
            status={mockBiometrics.spineAlignment.status}
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <BiometricItem
            label="Elbow Angle"
            value={mockBiometrics.elbowAngle.value}
            status={mockBiometrics.elbowAngle.status}
            icon={<Activity className="w-4 h-4" />}
          />
          <BiometricItem
            label="Neck Tilt"
            value={mockBiometrics.neckTilt.value}
            status={mockBiometrics.neckTilt.status}
            icon={<AlertTriangle className="w-4 h-4" />}
          />
        </div>
      ) : (
        <div className="py-8 text-center">
          <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            Start the camera to view<br />real-time biometric analysis
          </p>
        </div>
      )}

      {/* Overall score (when active) */}
      {isActive && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Overall Score</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-neon-green">89</span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </div>
          <div className="mt-2 h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full transition-all duration-500"
              style={{ width: "89%" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Good posture! Consider adjusting your neck position.
          </p>
        </div>
      )}
    </div>
  );
};

export default BiometricsPanel;
