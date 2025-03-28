
import React from 'react';
import { RefreshCw, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DetectionStatus } from '@/lib/human/types';

interface CameraViewProps {
  cameraActive: boolean;
  isModelLoading: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraError: string | null;
  onRetryCamera: () => void;
  detectionStatus: DetectionStatus;
}

const CameraView: React.FC<CameraViewProps> = ({
  cameraActive,
  isModelLoading,
  videoRef,
  canvasRef,
  cameraError,
  onRetryCamera,
  detectionStatus
}) => {
  // Loading state
  if (isModelLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="w-10 h-10 border-t-2 border-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm">Loading AI model...</p>
        </div>
      </div>
    );
  }
  
  // Camera error state
  if (cameraError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-center p-4 max-w-md">
          <div className="mb-4 text-red-500 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Camera Error</h3>
          <p className="text-gray-300 text-sm mb-4">{cameraError}</p>
          <Button onClick={onRetryCamera} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Camera
          </Button>
        </div>
      </div>
    );
  }
  
  // Camera inactive state
  if (!cameraActive) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-300">Click "Start Camera" to begin</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="camera-container relative bg-black w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Confidence indicator */}
      {detectionStatus.confidence !== null && (
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <div className={`h-2 w-2 rounded-full mr-1 ${
            detectionStatus.confidence > 0.7 ? 'bg-green-500' : 
            detectionStatus.confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          Confidence: {Math.round(detectionStatus.confidence * 100)}%
          {detectionStatus.fps && ` | ${detectionStatus.fps} FPS`}
        </div>
      )}
    </div>
  );
};

export default CameraView;
