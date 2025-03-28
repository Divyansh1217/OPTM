
import { useCallback } from 'react';

export const useVideoStatus = () => {
  // Check the current status of the video element
  const checkVideoStatus = useCallback((
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => {
    // Default response for when video is not ready
    const defaultResponse = {
      isReady: false,
      details: "Video element not found",
      resolution: null
    };
    
    if (!videoRef.current) {
      return defaultResponse;
    }
    
    const video = videoRef.current;
    
    // Check if video is playing and has dimensions
    if (video.paused) {
      return {
        isReady: false,
        details: "Video is paused",
        resolution: null
      };
    }
    
    if (!video.videoWidth || !video.videoHeight) {
      return {
        isReady: false,
        details: "Video dimensions not available",
        resolution: null
      };
    }
    
    // Video is ready and playing
    return {
      isReady: true,
      details: "Video is playing",
      resolution: {
        width: video.videoWidth,
        height: video.videoHeight
      }
    };
  }, []);
  
  return { checkVideoStatus };
};
