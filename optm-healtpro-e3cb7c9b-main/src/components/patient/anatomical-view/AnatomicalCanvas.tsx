
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HumanModel from './HumanModel';
import ViewControls from './ViewControls';
import AutoRotate from './AutoRotate';
import LoadingSpinner from './LoadingSpinner';

interface AnatomicalCanvasProps {
  activeSystem: string;
  isRotating: boolean;
  setIsRotating: (isRotating: boolean) => void;
  cameraPosition: [number, number, number];
  hotspots: any[];
  handleResetView: () => void;
  handleHotspotClick: (id: string) => void;
  isEditMode?: boolean;
}

const AnatomicalCanvas: React.FC<AnatomicalCanvasProps> = ({
  activeSystem,
  isRotating,
  setIsRotating,
  cameraPosition,
  hotspots,
  handleResetView,
  handleHotspotClick,
  isEditMode = false
}) => {
  return (
    <div className="anatomy-canvas-container relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        className="w-full h-full"
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[0, 10, 5]} intensity={0.8} />
        
        <Suspense fallback={<LoadingSpinner />}>
          <HumanModel 
            activeSystem={activeSystem}
            hotspots={hotspots}
            onHotspotClick={handleHotspotClick}
            isEditMode={isEditMode}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={!isEditMode}
          autoRotate={isRotating}
          autoRotateSpeed={1}
          maxDistance={14}
          minDistance={5}
          target={[0, 0, 0]}
          makeDefault
        />
        
        <AutoRotate isRotating={isRotating} />
      </Canvas>
      
      <ViewControls
        handleResetView={handleResetView}
        isRotating={isRotating}
        setIsRotating={setIsRotating}
      />
    </div>
  );
};

export default AnatomicalCanvas;
