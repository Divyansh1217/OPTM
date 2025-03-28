import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useHumanDetection } from './hooks/useHumanDetection';
import CameraView from './components/CameraView';
import ControlPanel from './components/ControlPanel';
import FeedbackDisplay from './components/FeedbackDisplay';
import MotionRenderer from './MotionRenderer';
import { toast } from 'sonner';
import { FeedbackType } from '@/lib/human/types';

interface MotionTrackerProps {
  exerciseName?: string;
  exerciseId?: string;
  onFinish?: () => void;
}

const MotionTracker: React.FC<MotionTrackerProps> = ({ 
  exerciseName, 
  exerciseId, 
  onFinish 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState('workout');
  const [cameraStarted, setCameraStarted] = useState(false);

  // Use our human detection hook with real-time tracking
  const {
    isDetecting,
    isModelLoaded,
    detectionFps,
    startDetection,
    stopDetection,
    resetSession,
    angles,
    feedback,
    stats,
    result,
    detectionError
  } = useHumanDetection({
    videoRef,
    canvasRef,
    isActive: true
  });

  // Handle camera start
  const handleCameraStart = () => {
    setCameraStarted(true);
    if (isModelLoaded) {
      startDetection();
      toast.success("Motion tracking started");
    }
  };

  // Handle finish exercise
  const handleFinish = () => {
    stopDetection();
    if (onFinish) {
      onFinish();
    }
  };

  // Convert feedback for UI component
  const uiFeedback = {
    message: feedback?.message || null,
    type: feedback?.type || FeedbackType.INFO
  };

  // Stop detection when component unmounts
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return (
    <div className="motion-tracker-container">
      <div className="motion-tracker-header px-6 pt-4 pb-2 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-1">Exercise Motion Tracking</h2>
          <p className="text-sm text-muted-foreground">Track your exercise form with AI-powered motion analysis</p>
        </div>
        <div className="ai-status flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${isModelLoaded ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
          <span className="text-sm">
            {isModelLoaded 
              ? isDetecting 
                ? 'Tracking Active' 
                : 'Ready' 
              : 'Loading AI Model...'}
          </span>
          {detectionFps && isDetecting && (
            <span className="text-xs text-muted-foreground ml-2">({detectionFps} FPS)</span>
          )}
        </div>
      </div>

      <div className="camera-container bg-gray-900 w-full h-96 md:h-[500px] relative overflow-hidden rounded-md">
        <CameraView 
          videoRef={videoRef}
          canvasRef={canvasRef}
          detectionStatus={{ isDetecting }}
          onCameraStart={handleCameraStart}
          isTracking={isDetecting}
        />
      </div>

      <div className="motion-tracker-grid grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <div className="motion-tracker-main md:col-span-3">
          <Tabs defaultValue="workout" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="workout">Workout</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workout" className="space-y-4">
              <Card>
                <CardHeader className="py-3 px-4 bg-slate-50 dark:bg-slate-800/50">
                  <CardTitle className="text-lg font-medium">Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="stats-card grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="stat-item bg-muted/50 p-3 rounded-md">
                      <span className="stat-value block font-semibold text-lg">{stats.totalReps || 0}</span>
                      <span className="stat-label block text-xs text-muted-foreground">Total Reps</span>
                    </div>
                    <div className="stat-item bg-muted/50 p-3 rounded-md">
                      <span className="stat-value block font-semibold text-lg text-green-500">{stats.goodReps || 0}</span>
                      <span className="stat-label block text-xs text-muted-foreground">Good Form</span>
                    </div>
                    <div className="stat-item bg-muted/50 p-3 rounded-md">
                      <span className="stat-value block font-semibold text-lg text-amber-500">{stats.badReps || 0}</span>
                      <span className="stat-label block text-xs text-muted-foreground">Needs Work</span>
                    </div>
                    <div className="stat-item bg-muted/50 p-3 rounded-md">
                      <span className="stat-value block font-semibold text-lg">{stats.caloriesBurned?.toFixed(1) || 0}</span>
                      <span className="stat-label block text-xs text-muted-foreground">Calories</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {feedback && feedback.message && (
                <FeedbackDisplay 
                  message={uiFeedback.message}
                  type={uiFeedback.type}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="motion-tracker-sidebar">
          <ControlPanel
            isTracking={isDetecting}
            isModelLoaded={isModelLoaded}
            onStartTracking={startDetection}
            onStopTracking={stopDetection}
            onResetSession={resetSession}
            onFinish={handleFinish}
          />
        </div>
      </div>
    </div>
  );
};

export default MotionTracker;
