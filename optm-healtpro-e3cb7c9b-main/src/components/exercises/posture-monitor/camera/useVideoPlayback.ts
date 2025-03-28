
import { useCallback } from 'react';

export const useVideoPlayback = () => {
  // Ensure the video is playing correctly
  const ensureVideoIsPlaying = useCallback(async (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ): Promise<boolean> => {
    if (!videoRef.current) {
      console.error("Video element not found when trying to ensure playback");
      return false;
    }
    
    try {
      if (videoRef.current.paused) {
        console.log("Video is paused, attempting to play");
        await videoRef.current.play();
      }
      
      // Double check that it's actually playing now
      if (videoRef.current.paused) {
        console.error("Failed to play video even after calling play()");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error ensuring video is playing:", error);
      return false;
    }
  }, []);
  
  return { ensureVideoIsPlaying };
};
