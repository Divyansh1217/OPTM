
import { useFrame, useThree } from '@react-three/fiber';
import { AutoRotateProps } from './types';

const AutoRotate: React.FC<AutoRotateProps> = ({ isRotating }) => {
  const { camera } = useThree();
  
  useFrame(({ clock }) => {
    if (isRotating) {
      camera.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 5;
      camera.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 5;
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
};

export default AutoRotate;
