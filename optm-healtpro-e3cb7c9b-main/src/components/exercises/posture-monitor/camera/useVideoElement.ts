
import { useVideoSetup } from './useVideoSetup';
import { useVideoPlayback } from './useVideoPlayback';
import { useVideoStatus } from './useVideoStatus';

/**
 * Provides utilities for working with the video element.
 * This is a composing hook that brings together specialized video handling hooks.
 */
export const useVideoElement = () => {
  const { setupVideoElement } = useVideoSetup();
  const { ensureVideoIsPlaying } = useVideoPlayback();
  const { checkVideoStatus } = useVideoStatus();
  
  return {
    setupVideoElement,
    ensureVideoIsPlaying,
    checkVideoStatus
  };
};
