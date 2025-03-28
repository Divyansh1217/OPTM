import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HotSpot } from './types';
import HotspotMarker from './HotspotMarker';
import { getSystemImage } from './utils';

interface MapVisualizationProps {
  activeSystem: string;
  zoom: number;
  hotspots: HotSpot[];
  activeHotspot: HotSpot | null;
  imageLoaded: boolean;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onHotspotClick: (hotspot: HotSpot) => void;
}

const MapVisualization: React.FC<MapVisualizationProps> = ({
  activeSystem,
  zoom,
  hotspots,
  activeHotspot,
  imageLoaded,
  onImageLoad,
  onHotspotClick
}) => {
  return (
    <div className="relative flex justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-900/30 rounded-lg h-[550px] shadow-inner">
      <div 
        className="relative w-full h-full flex justify-center items-center"
        style={{
          scale: zoom,
          transition: 'scale 0.3s ease-out'
        }}
      >
        {/* Contained wrapper to keep hotspots properly aligned with the image */}
        <div className="relative inline-block max-h-full">
          {/* Anatomical model image */}
          <img
            src={getSystemImage(activeSystem)}
            alt={`${activeSystem} Anatomical System`}
            className="max-h-[520px] w-auto object-contain"
            onLoad={onImageLoad}
            draggable={false}
          />
          
          {/* Hotspots container positioned absolutely over the image */}
          {imageLoaded && (
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence mode="sync">
                {hotspots.map((hotspot, index) => (
                  <HotspotMarker
                    key={hotspot.id || `hotspot-${index}`}
                    hotspot={hotspot}
                    isActive={activeHotspot?.id === hotspot.id}
                    onClick={onHotspotClick}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;
