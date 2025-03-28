
import React from 'react';
import { Hotspot } from './types';
import HotspotDetails from './HotspotDetails';

interface DetailsPanelProps {
  activeHotspotDetails: Hotspot | null;
  isEditMode?: boolean;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ activeHotspotDetails, isEditMode = false }) => {
  if (!activeHotspotDetails) return null;
  
  return <HotspotDetails hotspot={activeHotspotDetails} isEditMode={isEditMode} />;
};

export default DetailsPanel;
