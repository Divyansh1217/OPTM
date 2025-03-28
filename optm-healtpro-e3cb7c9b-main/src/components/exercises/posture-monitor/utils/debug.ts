
// Debug utilities for pose detection

export const logPoseDetection = (pose: any, status: any) => {
  if (!pose) return;
  
  console.group('Pose Detection Details');
  console.log('Pose confidence:', pose.score?.toFixed(2));
  console.log('Keypoints detected:', pose.keypoints?.length);
  console.log('Detection status:', status);
  console.groupEnd();
};

export const logDetectionFailure = (error: any) => {
  console.group('Pose Detection Error');
  console.error('Error during pose detection:', error);
  console.trace('Stack trace:');
  console.groupEnd();
};

// Helper to identify common pose detection issues
export const diagnoseDetectionIssues = (videoElement: HTMLVideoElement | null) => {
  if (!videoElement) {
    console.warn('Video element is not available');
    return 'Video element not found';
  }
  
  const issues = [];
  
  if (videoElement.paused) {
    console.warn('Video is paused');
    issues.push('Video playback paused');
  }
  
  if (videoElement.readyState < 2) {
    console.warn('Video not ready (readyState:', videoElement.readyState, ')');
    issues.push('Video not loaded');
  }
  
  if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
    console.warn('Video has zero dimensions');
    issues.push('Video has no dimensions');
  }
  
  if (!videoElement.srcObject) {
    console.warn('Video has no source stream');
    issues.push('No camera stream');
  }
  
  if (issues.length === 0) {
    console.log('Video appears to be working correctly');
    return null;
  }
  
  return issues.join(', ');
};
