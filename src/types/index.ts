export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface BiometricData {
  spineAlignment: number; // 0-100 percentage
  elbowAngle: number; // degrees
  neckTilt: number; // degrees
  status: "good" | "warning" | "poor";
}

export interface SkeletonPoint {
  x: number;
  y: number;
  confidence: number;
}

export interface SkeletonData {
  leftShoulder: SkeletonPoint;
  rightShoulder: SkeletonPoint;
  neck: SkeletonPoint;
  spine: SkeletonPoint[];
  leftElbow: SkeletonPoint;
  rightElbow: SkeletonPoint;
}
