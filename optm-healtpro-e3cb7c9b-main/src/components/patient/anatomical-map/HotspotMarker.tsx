
import React from 'react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HotspotMarkerProps } from './types';
import { CircleDot, CircleEllipsis, Activity } from 'lucide-react';

const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot, isActive, onClick }) => {
  // Determine tooltip positioning based on hotspot coordinates
  const getTooltipSide = (): "top" | "right" | "bottom" | "left" => {
    if (hotspot.x < 25) return "right";
    if (hotspot.x > 75) return "left";
    if (hotspot.y < 30) return "bottom";
    return "top";
  };

  // Get tooltip alignment based on position to prevent cut-off
  const getTooltipAlign = (): "start" | "center" | "end" => {
    const x = hotspot.x;
    const y = hotspot.y;
    
    // Improved alignment logic
    if (x < 25) return y < 30 ? "start" : y > 70 ? "end" : "center";
    if (x > 75) return y < 30 ? "start" : y > 70 ? "end" : "center";
    if (y < 30) return x < 40 ? "start" : x > 60 ? "end" : "center";
    if (y > 70) return x < 40 ? "start" : x > 60 ? "end" : "center";
    
    return "center";
  };

  // Get the severity class for styling - using consistent blue theme
  const getSeverityClass = () => {
    if (!hotspot.severity) return 'hotspot-severity-medium';
    if (hotspot.severity <= 3) return 'hotspot-severity-low';
    if (hotspot.severity <= 6) return 'hotspot-severity-medium';
    return 'hotspot-severity-high';
  };
  
  // Get size class based on severity and active state
  const getSizeClass = () => {
    if (isActive) return 'hotspot-size-md';
    return 'hotspot-size-sm';
  };

  // Render appropriate icon based on severity
  const renderIcon = () => {
    if (!hotspot.severity || hotspot.severity <= 3) {
      return <CircleDot className="hotspot-icon" size={14} strokeWidth={2.5} />;
    } else if (hotspot.severity <= 6) {
      return <Activity className="hotspot-icon" size={14} strokeWidth={2.5} />;
    } else {
      return <CircleEllipsis className="hotspot-icon" size={14} strokeWidth={2.5} />;
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`hotspot-marker ${getSizeClass()} ${getSeverityClass()} ${isActive ? 'hotspot-active hotspot-pulse' : ''}`}
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              backgroundColor: `rgba(33, 150, 243, ${isActive ? 0.6 : 0.4})`,
              borderColor: `rgba(33, 150, 243, ${isActive ? 0.4 : 0.3})`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isActive ? 0.8 : 0.6 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(hotspot)}
          >
            {renderIcon()}
            {isActive && hotspot.id && (
              <span className="hotspot-label text-white text-xs font-bold sr-only">{hotspot.id}</span>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side={getTooltipSide()} 
          align={getTooltipAlign()}
          className="z-50 shadow-lg"
          sideOffset={10}
          avoidCollisions={true}
          collisionPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <div className="p-2.5 space-y-1.5">
            <p className="font-medium text-sm">{hotspot.label}</p>
            {hotspot.severity && (
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                hotspot.severity <= 3 ? 'bg-blue-100 text-blue-800' : 
                hotspot.severity <= 6 ? 'bg-blue-200 text-blue-800' : 
                'bg-blue-300 text-blue-800'
              }`}>
                Pain level: {hotspot.severity}/10
              </div>
            )}
            {hotspot.description && (
              <p className="text-xs text-muted-foreground">{hotspot.description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HotspotMarker;
