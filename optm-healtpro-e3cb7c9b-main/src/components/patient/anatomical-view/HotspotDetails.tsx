
import React from 'react';
import { motion } from 'framer-motion';
import { Hotspot } from './types';

interface HotspotDetailsProps {
  hotspot: Hotspot;
  isEditMode?: boolean;
}

const HotspotDetails: React.FC<HotspotDetailsProps> = ({ hotspot, isEditMode = false }) => {
  // Function to determine the best positioning for the details panel
  // to prevent it from being cut off at the edges
  const getPositionStyles = () => {
    // Define position with all possible properties that might be used
    const position: {
      bottom?: string;
      left?: string;
      right?: string;
      top?: string;
    } = { bottom: '4rem', left: '4rem' };
    
    // Adjust position based on whether the hotspot is near an edge
    if (hotspot.position) {
      // If we have 3D position data, let's use it to determine the best position
      const [x, y, z] = hotspot.position;
      
      // For simplicity, we're just using the sign of x and y to determine position
      // In a real implementation, you'd want to use viewport calculations
      if (x > 1) {
        position.left = undefined;
        position.right = '4rem';
      }
      
      if (y > 1) {
        position.bottom = undefined;
        position.top = '4rem';
      }
    }
    
    return position;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg border max-w-[300px] z-10"
      style={getPositionStyles()}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: hotspot.color }}
          ></div>
          <h4 className="font-semibold">{hotspot.label}</h4>
          {hotspot.region && (
            <span className="text-xs text-muted-foreground ml-1">
              ({hotspot.region})
            </span>
          )}
        </div>
        <p className="text-sm mb-2">{hotspot.description}</p>
        <div className={`text-xs font-medium ${
          hotspot.severity === 'Severe' ? 'text-red-500' : 
          hotspot.severity === 'Moderate' ? 'text-orange-500' : 
          'text-green-500'
        }`}>
          Severity: {hotspot.severity}
        </div>
        {isEditMode && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-amber-600 font-medium">Edit mode: Click to modify</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HotspotDetails;
