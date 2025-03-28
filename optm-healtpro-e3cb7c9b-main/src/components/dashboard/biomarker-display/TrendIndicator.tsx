
import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'elevated' | 'low' | 'critical';
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend, status }) => {
  if (!trend || trend === 'stable') {
    return <Minus className="w-4 h-4 mr-1 text-muted-foreground" />;
  }
  
  // For normal status, up is good for some biomarkers (like HDL), but for others any deviation is not ideal
  // For others, context matters (e.g., "up" for LDL is bad)
  if (trend === 'up') {
    if (status === 'low') {
      return <TrendingUp className="w-4 h-4 mr-1 text-green-500" />; // going up from low is good
    } else if (status === 'elevated' || status === 'critical') {
      return <TrendingUp className="w-4 h-4 mr-1 text-red-500" />; // going up from elevated is bad
    }
    return <TrendingUp className="w-4 h-4 mr-1 text-yellow-500" />; // neutral context
  }
  
  // Down trend
  if (status === 'elevated' || status === 'critical') {
    return <TrendingDown className="w-4 h-4 mr-1 text-green-500" />; // going down from elevated is good
  } else if (status === 'low') {
    return <TrendingDown className="w-4 h-4 mr-1 text-red-500" />; // going down from low is bad
  }
  return <TrendingDown className="w-4 h-4 mr-1 text-yellow-500" />; // neutral context
};

export default TrendIndicator;
