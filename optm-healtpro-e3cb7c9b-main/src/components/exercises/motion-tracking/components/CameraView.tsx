
import React, { useEffect, useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onCameraStart?: () => void;
  detectionStatus: { isDetecting: boolean };
  isTracking?: boolean;
}

const CameraView: React.FC<CameraViewProps> = ({
  videoRef,
  canvasRef,
  onCameraStart,
  detectionStatus,
  isTracking
}) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const startCamera = async () => {
      try {
        setIsError(false);
        
        // Request camera permission and access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraActive(true);
            if (onCameraStart) {
              onCameraStart();
            }
          };
        }
      } catch (error) {
        console.error('Camera error:', error);
        setIsError(true);
        setErrorMessage(
          error instanceof DOMException && error.name === 'NotAllowedError'
            ? 'Camera access denied. Please check your browser permissions.'
            : 'Failed to access camera. Please make sure no other app is using it.'
        );
      }
    };
    
    startCamera();
    
    // Clean up on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef, onCameraStart]);
  
  // If there's an error accessing the camera
  if (isError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center max-w-sm p-4">
          <div className="text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Camera Error</h3>
          <p className="mb-4 text-sm text-gray-300">{errorMessage}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  // If camera is still initializing
  if (!cameraActive) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Initializing camera...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover mirror-mode"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Status indicator */}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs p-1.5 rounded-md flex items-center gap-1.5">
        <Camera className="h-3.5 w-3.5" />
        <span>
          {isTracking 
            ? "Motion tracking active" 
            : detectionStatus.isDetecting 
              ? "Processing video" 
              : "Camera active"}
        </span>
      </div>
    </div>
  );
};

export default CameraView;
