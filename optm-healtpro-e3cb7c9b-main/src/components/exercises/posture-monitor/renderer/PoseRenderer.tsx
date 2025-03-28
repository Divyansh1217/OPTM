
import React, { useEffect, useRef } from 'react';

interface PoseRendererProps {
  pose: any;
  videoWidth: number;
  videoHeight: number;
}

const PoseRenderer: React.FC<PoseRendererProps> = ({ 
  pose, 
  videoWidth, 
  videoHeight 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !pose) {
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw skeleton connections
    if (pose.keypoints) {
      drawSkeleton(ctx, pose.keypoints, videoWidth, videoHeight);
    }
    
  }, [pose, videoWidth, videoHeight]);
  
  // Helper function to draw connections between keypoints
  const drawSkeleton = (
    ctx: CanvasRenderingContext2D,
    keypoints: any[],
    videoWidth: number,
    videoHeight: number
  ) => {
    if (!keypoints || keypoints.length === 0) return;
    
    // Define connections between keypoints
    const connections = [
      // Torso
      ["left_shoulder", "right_shoulder"],
      ["left_shoulder", "left_hip"],
      ["right_shoulder", "right_hip"],
      ["left_hip", "right_hip"],
      
      // Arms
      ["left_shoulder", "left_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_shoulder", "right_elbow"],
      ["right_elbow", "right_wrist"],
      
      // Legs
      ["left_hip", "left_knee"],
      ["left_knee", "left_ankle"],
      ["right_hip", "right_knee"],
      ["right_knee", "right_ankle"],
    ];
    
    // Create a map of keypoints for easier lookup
    const keypointMap = keypoints.reduce((map, kp) => {
      map[kp.name] = kp;
      return map;
    }, {} as Record<string, any>);
    
    // Draw each connection
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    
    connections.forEach(([start, end]) => {
      const startPoint = keypointMap[start];
      const endPoint = keypointMap[end];
      
      if (startPoint && endPoint && startPoint.score > 0.5 && endPoint.score > 0.5) {
        ctx.beginPath();
        ctx.moveTo(
          startPoint.x * canvasRef.current!.width / videoWidth, 
          startPoint.y * canvasRef.current!.height / videoHeight
        );
        ctx.lineTo(
          endPoint.x * canvasRef.current!.width / videoWidth, 
          endPoint.y * canvasRef.current!.height / videoHeight
        );
        ctx.stroke();
      }
    });
    
    // Draw each keypoint
    keypoints.forEach(keypoint => {
      if (keypoint.score > 0.5) {
        ctx.fillStyle = '#FF5722';
        ctx.beginPath();
        ctx.arc(
          keypoint.x * canvasRef.current!.width / videoWidth,
          keypoint.y * canvasRef.current!.height / videoHeight,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    });
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={videoWidth}
      height={videoHeight}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default PoseRenderer;
