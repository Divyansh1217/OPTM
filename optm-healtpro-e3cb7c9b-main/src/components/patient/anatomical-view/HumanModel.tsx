
import React, { useState, useEffect } from 'react';
import ModelImage from './ModelImage';
import LoadingSpinner from './LoadingSpinner';
import HotspotsGroup from './HotspotsGroup';
import { HumanModelProps } from './types';

const HumanModel: React.FC<HumanModelProps> = ({
  activeSystem,
  hotspots,
  onHotspotClick,
  isEditMode = false
}) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  
  useEffect(() => {
    // Reset loading state when system changes
    setModelLoaded(false);
    
    // Simulate loading time for the model
    const timer = setTimeout(() => {
      setModelLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeSystem]); // Reset loading when system changes
  
  return (
    <group position={[0, 0, 0]}>
      {modelLoaded ? (
        <>
          <ModelImage activeSystem={activeSystem} />
          {hotspots && hotspots.length > 0 && (
            <HotspotsGroup 
              hotspots={hotspots} 
              onHotspotClick={onHotspotClick}
              isEditMode={isEditMode}
            />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </group>
  );
};

export default HumanModel;
