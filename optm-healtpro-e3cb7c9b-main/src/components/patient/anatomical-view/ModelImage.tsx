
import React from 'react';
import { Html } from '@react-three/drei';

interface ModelImageProps {
  activeSystem: string;
}

const ModelImage: React.FC<ModelImageProps> = ({ activeSystem }) => {
  // Select the appropriate image based on active system
  const getSystemImage = (system: string) => {
    switch (system) {
      case 'muscular':
        return "/lovable-uploads/5a2de827-6408-43ae-91c8-4bfd13c1ed17.png";
      case 'skeletal':
        return "/lovable-uploads/c259fc72-51f3-49b7-863e-d018adadb9df.png";
      case 'muscular-new':
        return "/lovable-uploads/2f92810e-f197-4554-81aa-25c65d85b001.png";
      case 'nervous':
        return "/lovable-uploads/49a33513-51a5-4cbb-b210-a6308cfa91bf.png";
      default:
        return "/lovable-uploads/a6f71747-46dd-486d-97a5-2e263119b969.png";
    }
  };

  return (
    <Html 
      transform 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]} 
      center 
      sprite 
      scale={[1, 1, 1]} 
      distanceFactor={7}
    >
      <div className="anatomy-model-container w-full h-full flex items-center justify-center">
        <img 
          src={getSystemImage(activeSystem)} 
          alt="Anatomical model" 
          className="model-image max-w-[70%] max-h-[70%] object-contain"
          style={{ 
            filter: "drop-shadow(0px 0px 10px rgba(255,255,255,0.5))",
            opacity: 1
          }}
        />
      </div>
    </Html>
  );
};

export default ModelImage;
