
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HealthIssue } from './types';
import { motion } from 'framer-motion';

interface HotspotMarkerProps {
  issue: HealthIssue;
  isSelected: boolean;
  onClick: (issue: HealthIssue) => void;
}

const HotspotMarker: React.FC<HotspotMarkerProps> = ({ issue, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get proper size based on selection state and severity
  const getMarkerSize = () => {
    // Base size on severity with larger sizes for more severe issues
    const baseSizeByType = issue.severity === 'high' ? 'w-8 h-8' : 
                            issue.severity === 'medium' ? 'w-7 h-7' : 'w-6 h-6';
                            
    // Adjust size for interaction states
    if (isSelected) return issue.severity === 'high' ? 'w-9 h-9' : 'w-8 h-8';
    if (isHovered) return baseSizeByType;
    return baseSizeByType;
  };
  
  // Get proper z-index to ensure visibility
  const getZIndex = () => {
    if (isSelected) return 'z-30';
    return issue.severity === 'high' ? 'z-25' : issue.severity === 'medium' ? 'z-20' : 'z-10';
  };
  
  // Get color based on severity with enhanced visual appeal
  const getSeverityColor = () => {
    if (issue.severity === 'high') return 'bg-red-500 shadow-red-500/50';
    if (issue.severity === 'medium') return 'bg-orange-500 shadow-orange-500/50';
    return 'bg-yellow-500 shadow-yellow-500/50';
  };
  
  // Determine tooltip positioning based on issue location
  const getTooltipSide = (): "top" | "right" | "bottom" | "left" => {
    // Enhanced positioning logic to prevent tooltip cutoff
    if (issue.location.x < 25) return "right";
    if (issue.location.x > 75) return "left";
    if (issue.location.y < 30) return "bottom";
    return "top";
  };
  
  // Get tooltip alignment based on position
  const getTooltipAlign = (): "start" | "center" | "end" => {
    const x = issue.location.x;
    const y = issue.location.y;
    
    // Improved alignment logic to prevent tooltip cutoff
    if (x < 25) return y < 30 ? "start" : y > 70 ? "end" : "center";
    if (x > 75) return y < 30 ? "start" : y > 70 ? "end" : "center";
    if (y < 30) return x < 40 ? "start" : x > 60 ? "end" : "center";
    if (y > 70) return x < 40 ? "start" : x > 60 ? "end" : "center";
    
    return "center";
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`absolute ${getMarkerSize()} rounded-full cursor-pointer ${getSeverityColor()} flex items-center justify-center ${
              isSelected ? 'border-2 border-white shadow-lg' : 
              isHovered ? 'border-2 border-white/80 shadow-md' : 'border border-white/60 shadow-sm'
            } transition-all duration-300 ${getZIndex()}`}
            style={{
              left: `${issue.location.x}%`,
              top: `${issue.location.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: isSelected ? '0 0 15px rgba(0, 0, 0, 0.4)' : '0 0 8px rgba(0, 0, 0, 0.2)'
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: isSelected ? [1, 1.1, 1] : 1, 
              opacity: 1,
              transition: {
                scale: isSelected ? {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2
                } : {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(issue)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-testid={`hotspot-${issue.id}`}
          >
            <span className="text-white text-xs font-bold">{issue.id}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side={getTooltipSide()} 
          align={getTooltipAlign()}
          className="z-50 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-3"
          sideOffset={12}
          avoidCollisions={true}
          collisionPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <div className="space-y-2 max-w-[220px]">
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${
                issue.severity === 'high' ? "bg-red-500" :
                issue.severity === 'medium' ? "bg-orange-500" :
                "bg-yellow-500"
              }`}></span>
              <h3 className="font-semibold text-sm">{issue.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{
              issue.severity === 'high' ? 'Severe' :
              issue.severity === 'medium' ? 'Moderate' :
              'Mild'
            } severity</p>
            {issue.muscleGroup && (
              <p className="text-xs mt-1">Affects: {issue.muscleGroup}</p>
            )}
            {issue.description && (
              <p className="text-xs mt-1 text-muted-foreground line-clamp-2">{issue.description}</p>
            )}
            <p className="text-xs mt-1 italic">Click for details</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HotspotMarker;
