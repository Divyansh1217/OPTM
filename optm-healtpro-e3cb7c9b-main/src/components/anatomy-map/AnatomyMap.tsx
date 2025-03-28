
import React, { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BodyRegionMarker from './BodyRegionMarker';
import SymptomDialog from './SymptomDialog';
import { BodyRegion, PainSymptom } from './types';

export interface AnatomyMapProps {
  bodyRegions: BodyRegion[];
  symptoms: PainSymptom[];
  onAddSymptom: (symptom: PainSymptom) => void;
  onUpdateSymptom: (symptom: PainSymptom) => void;
  onDeleteSymptom: (symptomId: string) => void;
  loading: boolean;
  onRegionClick?: (region: BodyRegion) => void; 
  selectedRegions?: BodyRegion[]; 
}

const AnatomyMap: React.FC<AnatomyMapProps> = ({
  bodyRegions,
  symptoms,
  onAddSymptom,
  onUpdateSymptom,
  onDeleteSymptom,
  loading,
  onRegionClick,
  selectedRegions = []
}) => {
  const [activeRegion, setActiveRegion] = useState<BodyRegion | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reset image states when component mounts or when bodyRegions change
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, []);
  
  // Whenever activeRegion changes, show dialog if a region is selected
  useEffect(() => {
    if (activeRegion) {
      setShowDialog(true);
    }
  }, [activeRegion]);
  
  // Handle dialog close
  const handleCloseDialog = () => {
    setShowDialog(false);
    // Use a timeout to allow the dialog closing animation to complete
    setTimeout(() => setActiveRegion(null), 300);
  };
  
  // Handle zoom in/out
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(prev + 0.2, 2);
      return Math.max(prev - 0.2, 0.6);
    });
  };
  
  // Reset zoom
  const handleResetZoom = () => setZoomLevel(1);
  
  // Handle region click, either for internal state or external handler
  const handleRegionClick = (region: BodyRegion) => {
    if (onRegionClick) {
      onRegionClick(region);
    } else {
      setActiveRegion(region);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleZoom('out')}
          disabled={zoomLevel <= 0.6}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetZoom}
          disabled={zoomLevel === 1}
        >
          <RefreshCwIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleZoom('in')}
          disabled={zoomLevel >= 2}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="relative overflow-hidden border rounded-lg h-96 bg-gray-50 dark:bg-gray-800">
        {imageError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Failed to load anatomy image. Please refresh the page.</p>
          </div>
        ) : (
          <div 
            className="anatomy-map-wrapper absolute inset-0"
            style={{ 
              transform: `scale(${zoomLevel})`, 
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <img
              src="/lovable-uploads/d4871440-0787-4dc8-bfbf-20a04c1f96fc.png"
              alt="Human body anatomy"
              className="anatomy-map-image absolute top-0 left-0 w-full h-full object-contain opacity-70"
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                console.error('Failed to load anatomy map image');
                setImageError(true);
              }}
            />
            
            {imageLoaded && bodyRegions.map((region) => (
              <BodyRegionMarker
                key={region.id}
                region={region}
                active={activeRegion?.id === region.id || selectedRegions.some(r => r.id === region.id)}
                symptoms={symptoms}
                onClick={() => handleRegionClick(region)}
              />
            ))}
          </div>
        )}
      </div>
      
      {activeRegion && !onRegionClick && (
        <SymptomDialog
          open={showDialog}
          onClose={handleCloseDialog}
          selectedRegion={activeRegion}
          bodyRegions={bodyRegions}
          existingSymptoms={symptoms.filter(s => s.bodyRegionId === activeRegion.id)}
          onAddSymptom={onAddSymptom}
          onUpdateSymptom={onUpdateSymptom}
          onDeleteSymptom={onDeleteSymptom}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AnatomyMap;
