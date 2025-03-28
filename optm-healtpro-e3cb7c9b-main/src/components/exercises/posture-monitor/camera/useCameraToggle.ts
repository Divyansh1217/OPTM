
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { VideoStatus } from '../hooks/detection/types';
import { useCameraToggleActions } from './hooks/useCameraToggleActions';
import { useCameraToggleState } from './hooks/useCameraToggleState';

interface UseCameraToggleProps {
  cameraActive: boolean;
  isInitializing: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  streamRef: React.MutableRefObject<MediaStream | null>;
  mountedRef: React.MutableRefObject<boolean>;
  setupTimeoutRef: React.MutableRefObject<number | null>;
  setCameraActive: (active: boolean) => void;
  setPermission: (permission: 'granted' | 'denied' | 'prompt') => void;
  setCameraError: (error: string | null) => void;
  setIsInitializing: (initializing: boolean) => void;
  setVideoStatus: React.Dispatch<React.SetStateAction<VideoStatus>>;
  stopCamera: () => void;
  onCameraStart?: () => void;
  requestCameraAccess: () => Promise<{ stream: MediaStream | null; error: string | null; permissionDenied?: boolean }>;
  setupVideoElement: (videoRef: React.MutableRefObject<HTMLVideoElement | null>, canvasRef: React.MutableRefObject<HTMLCanvasElement | null>, stream: MediaStream) => Promise<boolean>;
  ensureVideoIsPlaying: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => Promise<boolean>;
  checkVideoStatus: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => { isReady: boolean, details: string, resolution: { width: number, height: number } | null };
  waitForVideoElement: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => Promise<boolean>;
}

export const useCameraToggle = ({
  cameraActive,
  isInitializing,
  videoRef,
  canvasRef,
  streamRef,
  mountedRef,
  setupTimeoutRef,
  setCameraActive,
  setPermission,
  setCameraError,
  setIsInitializing,
  setVideoStatus,
  stopCamera,
  onCameraStart,
  requestCameraAccess,
  setupVideoElement,
  ensureVideoIsPlaying,
  checkVideoStatus,
  waitForVideoElement
}: UseCameraToggleProps) => {
  
  // Use extracted hooks for better organization
  const { validateVideoElement, validateComponentMounted, performFinalStatusCheck } = 
    useCameraToggleState({
      mountedRef,
      videoRef,
      setCameraError,
      stopCamera,
      setIsInitializing,
      waitForVideoElement,
      checkVideoStatus
    });
    
  const { getCameraStream, setupVideo, ensureVideoPlayback } = 
    useCameraToggleActions({
      requestCameraAccess,
      streamRef,
      videoRef,
      canvasRef,
      setupTimeoutRef,
      mountedRef,
      setPermission,
      setCameraError,
      setVideoStatus,
      setIsInitializing,
      stopCamera,
      setupVideoElement,
      ensureVideoIsPlaying
    });
  
  // Main function to toggle camera
  const toggleCamera = useCallback(async () => {
    if (cameraActive) {
      stopCamera();
      return;
    }
    
    if (isInitializing) {
      console.log("Camera initialization already in progress");
      return;
    }
    
    setIsInitializing(true);
    setCameraError(null);
    
    try {
      // Validate video element exists
      const videoElementValid = await validateVideoElement();
      if (!videoElementValid) return;
      
      // Get camera stream
      const streamObtained = await getCameraStream();
      if (!streamObtained) return;
      
      // Validate component is still mounted
      if (!validateComponentMounted()) return;
      
      // Setup video with stream
      const videoSetup = await setupVideo(streamRef.current!);
      if (!videoSetup) {
        setIsInitializing(false);
        return;
      }
      
      // Ensure video is playing
      const playbackEnsured = await ensureVideoPlayback();
      if (!playbackEnsured) {
        setIsInitializing(false);
        return;
      }
      
      // Perform final status check
      const statusCheckPassed = await performFinalStatusCheck();
      if (!statusCheckPassed) {
        // Try one more time to ensure video is playing
        await ensureVideoIsPlaying(videoRef).catch(() => {});
        
        // Check once more
        const lastChanceStatus = checkVideoStatus(videoRef);
        if (!lastChanceStatus.isReady) {
          setCameraError("Camera is not functioning properly. Please try again.");
          stopCamera();
          setIsInitializing(false);
          return;
        }
      }
      
      // Set video status
      setVideoStatus({
        isReady: true,
        hasStream: true,
        resolution: checkVideoStatus(videoRef).resolution,
        lastCheckTime: Date.now(),
        errorCount: 0
      });
      
      // Set camera as active
      setCameraActive(true);
      setPermission('granted');
      
      if (onCameraStart) {
        onCameraStart();
      }
      
      toast({
        title: "Camera Active",
        description: "Camera is now active and ready for pose detection.",
      });
      
    } catch (err) {
      console.error("Error in toggleCamera:", err);
      setCameraError(`Camera setup failed: ${err}`);
      stopCamera();
    } finally {
      if (mountedRef.current) {
        setIsInitializing(false);
      }
    }
  }, [
    cameraActive, 
    isInitializing,
    validateVideoElement,
    getCameraStream,
    validateComponentMounted,
    setupVideo,
    ensureVideoPlayback,
    performFinalStatusCheck,
    streamRef,
    videoRef,
    checkVideoStatus,
    ensureVideoIsPlaying,
    setCameraActive, 
    setPermission, 
    setCameraError, 
    setIsInitializing, 
    setVideoStatus, 
    stopCamera, 
    onCameraStart,
    mountedRef
  ]);
  
  return { toggleCamera };
};
