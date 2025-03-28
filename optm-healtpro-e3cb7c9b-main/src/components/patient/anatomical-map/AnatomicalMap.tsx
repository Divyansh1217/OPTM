
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSymptoms } from '@/contexts/SymptomContext';
import { AnatomicalMapProps, HotSpot } from './types';
import { symptomsToHotspots } from './utils';
import MapControls from './MapControls';
import HotspotMarker from './HotspotMarker';
import HotspotDetail from './HotspotDetail';
import SystemTabs from './SystemTabs';
import MapVisualization from './MapVisualization';

const AnatomicalMap: React.FC<AnatomicalMapProps> = ({ className }) => {
  const { symptoms } = useSymptoms();
  const [zoom, setZoom] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<HotSpot | null>(null);
  const [hotspots, setHotspots] = useState<HotSpot[]>([]);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeSystem, setActiveSystem] = useState('muscular');
  
  const handleZoomIn = () => {
    if (zoom < 2) setZoom(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    if (zoom > 0.6) setZoom(prev => Math.max(prev - 0.2, 0.6));
  };
  
  const handleHotspotClick = (hotspot: HotSpot) => {
    setActiveHotspot(hotspot === activeHotspot ? null : hotspot);
  };

  // Function to handle image load event to ensure markers are positioned correctly
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setMapDimensions({
      width: img.clientWidth,
      height: img.clientHeight
    });
    setImageLoaded(true);
  };

  // Convert symptoms to hotspots whenever symptoms change
  useEffect(() => {
    if (symptoms) {
      console.log("Symptoms updated in AnatomicalMap:", symptoms);
      setHotspots(symptomsToHotspots(symptoms));
    } else {
      console.log("No symptoms data available");
      setHotspots([]);
    }
  }, [symptoms]);

  return (
    <Card className={`glass-morphism bg-white dark:bg-gray-800 shadow-sm overflow-visible ${className || ''}`}>
      <CardHeader className="pb-3 flex flex-col">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <CardTitle>Anatomical Map</CardTitle>
            <CardDescription>Interactive visualization of affected areas</CardDescription>
          </div>
          <MapControls 
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
        
        <div className="tabs-container overflow-x-auto mt-2">
          <SystemTabs 
            activeSystem={activeSystem}
            onSystemChange={setActiveSystem}
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0 pb-4 px-4 overflow-visible">
        <MapVisualization
          activeSystem={activeSystem}
          zoom={zoom}
          hotspots={hotspots}
          activeHotspot={activeHotspot}
          onImageLoad={handleImageLoad}
          onHotspotClick={handleHotspotClick}
          imageLoaded={imageLoaded}
        />
        
        {/* Detail panel for active hotspot */}
        {activeHotspot && <HotspotDetail hotspot={activeHotspot} />}
      </CardContent>
    </Card>
  );
};

export default AnatomicalMap;
