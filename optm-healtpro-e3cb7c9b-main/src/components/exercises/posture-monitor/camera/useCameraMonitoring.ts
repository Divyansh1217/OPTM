
import { useEffect } from 'react';

interface UseCameraMonitoringProps {
  cameraActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  streamRef: React.MutableRefObject<MediaStream | null>;
  mountedRef: React.MutableRefObject<boolean>;
  setCameraError: (error: string | null) => void;
}

export const useCameraMonitoring = ({
  cameraActive,
  videoRef,
  streamRef,
  mountedRef,
  setCameraError
}: UseCameraMonitoringProps) => {
  // Monitor video state and restart if needed
  useEffect(() => {
    if (!cameraActive) return;
    
    const checkVideoInterval = setInterval(() => {
      if (!mountedRef.current) return;
      
      if (!videoRef.current || !streamRef.current) return;
      
      const videoEl = videoRef.current;
      
      // Check if video element is properly playing
      if (videoEl.paused || videoEl.ended) {
        console.log("Video not playing during monitoring, attempting to resume");
        videoEl.play().catch(err => {
          console.error("Failed to resume video during monitoring:", err);
        });
      }
      
      // Check if stream is still active
      const trackActive = streamRef.current.getTracks().some(track => track.readyState === 'live');
      if (!trackActive) {
        console.error("Camera stream tracks are not active");
        setCameraError("Camera stream has been disconnected. Please try again.");
      }
    }, 5000);
    
    return () => clearInterval(checkVideoInterval);
  }, [cameraActive, videoRef, streamRef, mountedRef, setCameraError]);
};
