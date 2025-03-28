
import React from 'react';
import Hotspot from './Hotspot';
import { Hotspot as HotspotType } from './types';

interface HotspotsGroupProps {
  hotspots: HotspotType[];
  onHotspotClick: (id: string) => void;
  isEditMode?: boolean;
}

const HotspotsGroup: React.FC<HotspotsGroupProps> = ({ 
  hotspots, 
  onHotspotClick, 
  isEditMode = false 
}) => {
  return (
    <>
      {hotspots.map(hotspot => (
        <Hotspot 
          key={hotspot.id} 
          position={hotspot.position} 
          color={hotspot.color} 
          size={hotspot.size} 
          label={hotspot.label} 
          description={hotspot.description} 
          severity={hotspot.severity} 
          onClick={() => onHotspotClick(hotspot.id)}
          isEditMode={isEditMode}
        />
      ))}
    </>
  );
};

export default HotspotsGroup;
