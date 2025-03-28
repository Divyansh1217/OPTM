import React, { useEffect, useRef } from 'react';

interface MotionRendererProps {
  pose: any;
  angles: {
    kneeAngle: number | null;
    hipAngle: number | null;
    shoulderAngle: number | null;
    elbowAngle: number | null;
    ankleAngle: number | null;
    neckAngle: number | null;
  };
}

const MotionRenderer: React.FC<MotionRendererProps> = ({ pose, angles }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !pose) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw skeleton if pose data is available
    if (pose.keypoints && pose.keypoints.length > 0) {
      drawSkeleton(ctx, pose.keypoints, canvas.width, canvas.height);
    }
    
    // Draw angle indicators if angles are available
    if (angles.kneeAngle !== null || angles.hipAngle !== null) {
      drawAngleIndicators(ctx, angles, canvas.width, canvas.height);
    }
  }, [pose, angles]);
  
  // Helper function to draw connections between keypoints
  const drawSkeleton = (
    ctx: CanvasRenderingContext2D,
    keypoints: any[],
    width: number,
    height: number
  ) => {
    if (!keypoints || keypoints.length === 0) return;
    
    // Create a map of keypoints for easier lookup
    const keypointMap = keypoints.reduce((map, kp) => {
      map[kp.name] = kp;
      return map;
    }, {} as Record<string, any>);
    
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
    
    // Draw each connection
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    
    connections.forEach(([start, end]) => {
      const startPoint = keypointMap[start];
      const endPoint = keypointMap[end];
      
      if (startPoint && endPoint && startPoint.score > 0.5 && endPoint.score > 0.5) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
      }
    });
    
    // Draw each keypoint
    keypoints.forEach(keypoint => {
      if (keypoint.score > 0.5) {
        ctx.fillStyle = '#FF5722';
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };
  
  // Helper function to draw angle indicators
  const drawAngleIndicators = (
    ctx: CanvasRenderingContext2D,
    angles: {
      kneeAngle: number | null;
      hipAngle: number | null;
      shoulderAngle: number | null;
      elbowAngle: number | null;
      ankleAngle: number | null;
      neckAngle: number | null;
    },
    width: number,
    height: number
  ) => {
    ctx.font = '14px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    let y = 10;
    const x = 10;
    
    if (angles.kneeAngle !== null) {
      ctx.fillText(`Knee: ${angles.kneeAngle.toFixed(1)}°`, x, y);
      y += 20;
    }
    
    if (angles.hipAngle !== null) {
      ctx.fillText(`Hip: ${angles.hipAngle.toFixed(1)}°`, x, y);
      y += 20;
    }
    
    if (angles.shoulderAngle !== null) {
      ctx.fillText(`Shoulder: ${angles.shoulderAngle.toFixed(1)}°`, x, y);
      y += 20;
    }
    
    if (angles.elbowAngle !== null) {
      ctx.fillText(`Elbow: ${angles.elbowAngle.toFixed(1)}°`, x, y);
      y += 20;
    }
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default MotionRenderer;
