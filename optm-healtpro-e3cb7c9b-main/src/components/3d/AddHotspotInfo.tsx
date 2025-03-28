
import React from 'react';

interface AddHotspotInfoProps {
  addingHotspot: boolean;
  readOnly: boolean;
}

const AddHotspotInfo: React.FC<AddHotspotInfoProps> = ({ addingHotspot, readOnly }) => {
  if (!addingHotspot || readOnly) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="p-4 bg-background/70 rounded-lg backdrop-blur-sm">
        <p className="text-sm text-center">Click anywhere on the anatomy model to add a hotspot</p>
      </div>
    </div>
  );
};

export default AddHotspotInfo;
