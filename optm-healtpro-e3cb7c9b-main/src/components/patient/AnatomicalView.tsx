
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  AnatomicalCanvas, 
  DetailsPanel, 
  Header, 
  IssuesCounter, 
  useAnatomicalView
} from './anatomical-view';

export interface AnatomicalViewProps {
  selectedRegion?: string;
  onSelectRegion?: (region: string) => void;
  patientId?: number;
  isEditMode?: boolean;
}

const AnatomicalView: React.FC<AnatomicalViewProps> = ({
  selectedRegion,
  onSelectRegion,
  patientId,
  isEditMode = false
}) => {
  // Track the internal selected region
  const [internalSelectedRegion, setInternalSelectedRegion] = useState<string | undefined>(selectedRegion);

  // Update internal state when external selectedRegion changes
  useEffect(() => {
    setInternalSelectedRegion(selectedRegion);
  }, [selectedRegion]);

  // Handler for internal region selection
  const handleRegionSelect = (region: string) => {
    setInternalSelectedRegion(region);
    // Propagate change to parent if callback provided
    if (onSelectRegion) {
      onSelectRegion(region);
    }
  };
  
  const {
    activeSystem,
    setActiveSystem,
    isRotating,
    setIsRotating,
    cameraPosition,
    hotspots,
    handleResetView,
    handleHotspotClick,
    activeHotspotDetails,
    bodySystems
  } = useAnatomicalView(internalSelectedRegion, handleRegionSelect, patientId);
  
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3">
        <Header 
          systems={bodySystems} 
          activeSystem={activeSystem} 
          onSystemChange={setActiveSystem} 
          isEditMode={isEditMode}
        />
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        <AnatomicalCanvas
          activeSystem={activeSystem}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          cameraPosition={cameraPosition}
          hotspots={hotspots}
          handleResetView={handleResetView}
          handleHotspotClick={handleHotspotClick}
          isEditMode={isEditMode}
        />
        {activeHotspotDetails && (
          <DetailsPanel 
            activeHotspotDetails={activeHotspotDetails} 
            isEditMode={isEditMode}
          />
        )}
        <IssuesCounter count={hotspots.length} />
      </CardContent>
    </Card>
  );
};

export default AnatomicalView;
