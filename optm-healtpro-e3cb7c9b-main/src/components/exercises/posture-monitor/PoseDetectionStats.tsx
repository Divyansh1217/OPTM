
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Camera } from 'lucide-react';
import { DetectionStatus } from '@/lib/human/types';

interface PoseDetectionStatsProps {
  detectionStatus: DetectionStatus;
}

const PoseDetectionStats: React.FC<PoseDetectionStatsProps> = ({ 
  detectionStatus 
}) => {
  const { isDetecting, fps, confidence, detectedKeypoints } = detectionStatus;
  
  return (
    <Card className="border border-border/60">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Detection Status</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`h-2 w-2 rounded-full ${isDetecting ? 'bg-green-500' : 'bg-amber-500'}`}></div>
              <span className="text-xs text-muted-foreground">
                {isDetecting ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          
          {fps !== null && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">FPS</span>
              <span className="text-xs font-medium">{fps}</span>
            </div>
          )}
          
          {confidence !== null && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Confidence</span>
              <span className="text-xs font-medium">{Math.round(confidence * 100)}%</span>
            </div>
          )}
          
          {detectedKeypoints !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Keypoints</span>
              <span className="text-xs font-medium">{detectedKeypoints}</span>
            </div>
          )}
          
          {!isDetecting && (
            <div className="flex items-center mt-2 text-amber-500">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">Not currently tracking</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoseDetectionStats;
