import { SquatState } from '../types';

export const drawPose = (
  ctx: CanvasRenderingContext2D,
  poses: any[],
  options = { 
    drawPoints: true, 
    drawSkeleton: true,
    drawAngles: true,
    canvasWidth: 640,
    canvasHeight: 480
  }
) => {
  if (!poses || poses.length === 0) return;
  
  ctx.clearRect(0, 0, options.canvasWidth, options.canvasHeight);
  
  poses.forEach(pose => {
    if (options.drawPoints) {
      drawKeypoints(ctx, pose.keypoints);
    }
    
    if (options.drawSkeleton) {
      drawSkeleton(ctx, pose.keypoints);
    }
    
    if (options.drawAngles) {
      drawAngles(ctx, pose);
    }
  });
  
  // Draw state information
  drawStateInfo(ctx, SquatState.STANDING, options);
};

const drawKeypoints = (ctx: CanvasRenderingContext2D, keypoints: any[]) => {
  if (!keypoints) return;
  
  keypoints.forEach(keypoint => {
    if (keypoint.score && keypoint.score > 0.5) {
      const { x, y } = keypoint;
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  });
};

const drawSkeleton = (ctx: CanvasRenderingContext2D, keypoints: any[]) => {
  if (!keypoints) return;
  
  // Draw skeleton lines between keypoints
  // This is a simplified implementation
  const connections = [
    ['nose', 'leftEye'], ['nose', 'rightEye'],
    ['leftEye', 'leftEar'], ['rightEye', 'rightEar'],
    ['nose', 'leftShoulder'], ['nose', 'rightShoulder'],
    ['leftShoulder', 'leftElbow'], ['rightShoulder', 'rightElbow'],
    ['leftElbow', 'leftWrist'], ['rightElbow', 'rightWrist'],
    ['leftShoulder', 'rightShoulder'],
    ['leftShoulder', 'leftHip'], ['rightShoulder', 'rightHip'],
    ['leftHip', 'rightHip'],
    ['leftHip', 'leftKnee'], ['rightHip', 'rightKnee'],
    ['leftKnee', 'leftAnkle'], ['rightKnee', 'rightAnkle']
  ];
  
  connections.forEach(([p1, p2]) => {
    const point1 = keypoints.find(kp => kp.name === p1);
    const point2 = keypoints.find(kp => kp.name === p2);
    
    if (point1 && point2 && point1.score > 0.5 && point2.score > 0.5) {
      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    }
  });
};

const drawAngles = (ctx: CanvasRenderingContext2D, pose: any) => {
  // Implementation would go here, but this is just a placeholder
};

const drawStateInfo = (ctx: CanvasRenderingContext2D, state: SquatState, options: any) => {
  ctx.font = '24px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  let stateText = 'Stand up straight';
  let color = 'blue';
  
  switch (state) {
    case SquatState.STANDING:
      stateText = 'Standing';
      color = 'green';
      break;
    case SquatState.DESCENDING:
      stateText = 'Going Down';
      color = 'blue';
      break;
    case SquatState.BOTTOM:
      stateText = 'Bottom Position';
      color = 'purple';
      break;
    case SquatState.ASCENDING:
      stateText = 'Going Up';
      color = 'orange';
      break;
    default:
      stateText = 'Getting Ready';
      color = 'gray';
  }
  
  // Create background for text
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(10, 10, 200, 40);
  
  // Draw text
  ctx.fillStyle = color;
  ctx.fillText(stateText, 20, 18);
};

export default drawPose;
