
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface CameraHookResult {
  cameraActive: boolean;
  toggleCamera: () => Promise<void>;
  videoStatus: {
    isReady: boolean;
    hasStream: boolean;
    resolution: { width: number; height: number } | null;
    lastCheckTime: number;
    errorCount: number;
  };
  permission: 'granted' | 'denied' | 'prompt';
  retryCamera: () => Promise<void>;
  cameraError: string | null;
}

export const useCamera = (videoRef: React.RefObject<HTMLVideoElement>): CameraHookResult => {
  const [cameraActive, setCameraActive] = useState(false);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isInitializing, setIsInitializing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState({
    isReady: false,
    hasStream: false,
    resolution: null as { width: number; height: number } | null,
    lastCheckTime: 0,
    errorCount: 0
  });
  
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(true);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Request camera access
  const requestCameraAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      setPermission('granted');
      return { stream, error: null };
    } catch (err: any) {
      const permissionDenied = err.name === 'NotAllowedError' || 
                              err.name === 'PermissionDeniedError';
      
      setPermission(permissionDenied ? 'denied' : 'prompt');
      
      return { 
        stream: null, 
        error: err.message || 'Failed to access camera', 
        permissionDenied 
      };
    }
  }, []);
  
  // Setup video element
  const setupVideoElement = useCallback(async (
    videoRef: React.RefObject<HTMLVideoElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    stream: MediaStream
  ) => {
    if (!videoRef.current) {
      return false;
    }
    
    try {
      // Set the stream as source for video element
      videoRef.current.srcObject = stream;
      
      // Wait for video to load metadata
      await new Promise<void>((resolve) => {
        if (videoRef.current!.readyState >= 2) {
          resolve();
        } else {
          videoRef.current!.onloadeddata = () => resolve();
        }
      });
      
      // Update canvas size
      if (canvasRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
      
      return true;
    } catch (err) {
      console.error('Error setting up video element:', err);
      return false;
    }
  }, []);
  
  // Toggle camera state
  const toggleCamera = useCallback(async () => {
    if (cameraActive) {
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      setCameraActive(false);
      setVideoStatus(prev => ({
        ...prev,
        isReady: false,
        hasStream: false
      }));
      
      return;
    }
    
    setIsInitializing(true);
    setCameraError(null);
    
    try {
      const { stream, error, permissionDenied } = await requestCameraAccess();
      
      if (error || !stream) {
        setCameraError(error || 'Failed to access camera');
        setIsInitializing(false);
        
        if (permissionDenied) {
          toast.error('Camera access was denied. Please check your browser permissions.');
        } else {
          toast.error('Failed to access camera. Please try again.');
        }
        
        return;
      }
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        try {
          await videoRef.current.play();
          
          setCameraActive(true);
          setVideoStatus({
            isReady: true,
            hasStream: true,
            resolution: {
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight
            },
            lastCheckTime: Date.now(),
            errorCount: 0
          });
          
        } catch (playError) {
          console.error('Error playing video:', playError);
          setCameraError('Failed to start camera playback');
          
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
        }
      }
    } catch (err: any) {
      console.error('Error toggling camera:', err);
      setCameraError(err.message || 'Error accessing camera');
    } finally {
      if (mountedRef.current) {
        setIsInitializing(false);
      }
    }
  }, [cameraActive, requestCameraAccess, videoRef]);
  
  // Retry camera connection
  const retryCamera = useCallback(async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraActive(false);
    setCameraError(null);
    
    // Small delay before retrying
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toggleCamera();
  }, [toggleCamera, videoRef]);
  
  return {
    cameraActive,
    toggleCamera,
    videoStatus,
    permission,
    retryCamera,
    cameraError
  };
};
