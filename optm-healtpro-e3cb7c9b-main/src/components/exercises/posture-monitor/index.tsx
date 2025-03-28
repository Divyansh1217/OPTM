
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Pause, Play, RefreshCw } from 'lucide-react';
import CameraView from './CameraView';
import { FeedbackType, SquatState } from '@/lib/human/types';
import { useCamera } from './camera/useCamera';
import usePoseDetection from './hooks/usePoseDetection';
import PoseRenderer from './renderer/PoseRenderer';
import SquatGuide from './components/SquatGuide';
import FeedbackDisplay from './components/FeedbackDisplay';
import useSquatCounter from './hooks/useSquatCounter';
import { useAutoStartCamera } from './hooks/useAutoStartCamera';

interface CustomFeedback {
  message: string;
  type: FeedbackType;
}

const PostureMonitor: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [customFeedback, setCustomFeedback] = useState<CustomFeedback | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  
  // Use camera hook
  const {
    cameraActive,
    toggleCamera,
    videoStatus,
    permission,
    retryCamera,
    cameraError
  } = useCamera(videoRef);
  
  // Use pose detection
  const {
    isModelLoading,
    pose,
    kneeAngle,
    hipAngle,
    currentSquatState,
    detectionStatus,
    startDetection,
    stopDetection,
    resetSession
  } = usePoseDetection(videoRef, canvasRef, cameraActive);
  
  // Use squat counter
  const {
    squatCount,
    goodSquats,
    badSquats,
    incrementSquatCount,
    resetCounter
  } = useSquatCounter();
  
  // Auto-start camera when permission is granted
  useAutoStartCamera({
    cameraActive,
    permission,
    toggleCamera,
    setCustomFeedback
  });
  
  // Handle detection toggle
  const handleDetectionToggle = () => {
    if (isDetecting) {
      stopDetection();
      setIsDetecting(false);
    } else {
      startDetection();
      setIsDetecting(true);
    }
  };
  
  // Handle session reset
  const handleReset = () => {
    resetSession();
    resetCounter();
    setIsDetecting(false);
  };
  
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">Posture Monitor</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="aspect-video bg-black relative rounded-md overflow-hidden">
              <CameraView
                cameraActive={cameraActive}
                isModelLoading={isModelLoading}
                videoRef={videoRef}
                canvasRef={canvasRef}
                cameraError={cameraError}
                onRetryCamera={retryCamera}
                detectionStatus={detectionStatus}
              />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={toggleCamera}
                variant={cameraActive ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                {cameraActive ? "Stop Camera" : "Start Camera"}
              </Button>
              
              {cameraActive && (
                <>
                  <Button
                    onClick={handleDetectionToggle}
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={!cameraActive || isModelLoading}
                  >
                    {isDetecting ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Pause Detection
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start Detection
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset Session
                  </Button>
                </>
              )}
            </div>
            
            {customFeedback && (
              <div className="mt-4">
                <FeedbackDisplay
                  message={customFeedback.message}
                  type={customFeedback.type}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <SquatGuide
          squatCount={squatCount}
          goodSquats={goodSquats}
          badSquats={badSquats}
          currentSquatState={currentSquatState || SquatState.STANDING}
          kneeAngle={kneeAngle}
          hipAngle={hipAngle}
        />
      </div>
    </div>
  );
};

export default PostureMonitor;
