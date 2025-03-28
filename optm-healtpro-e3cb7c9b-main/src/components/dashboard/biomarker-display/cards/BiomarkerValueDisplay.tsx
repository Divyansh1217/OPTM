
import React from 'react';
import { Calendar } from 'lucide-react';
import TrendIndicator from '../TrendIndicator';
import { Biomarker } from '../types';
import { getStatusColor, formatDate } from '../biomarkerUtils';

interface BiomarkerValueDisplayProps {
  biomarker: Biomarker;
}

const BiomarkerValueDisplay: React.FC<BiomarkerValueDisplayProps> = ({ biomarker }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-20 w-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            className="stroke-muted/20"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            className={getStatusColor(biomarker.status)}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - (biomarker.percentage || 0) / 100)}`}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{biomarker.percentage}%</span>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="text-2xl font-bold mb-1 flex items-center">
          {biomarker.value} <span className="text-sm font-normal text-muted-foreground ml-1">{biomarker.unit}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Range: {biomarker.normalRange} {biomarker.unit}
        </div>
        <div className="flex items-center mt-1 text-xs">
          <TrendIndicator trend={biomarker.trend} status={biomarker.status} />
          <span>
            {biomarker.trend === 'stable' ? 'Stable' : biomarker.trend === 'up' ? 'Increasing' : 'Decreasing'}
          </span>
        </div>
        <div className="text-xs flex items-center gap-1 text-muted-foreground mt-1">
          <Calendar className="h-3 w-3" />
          {formatDate(biomarker.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default BiomarkerValueDisplay;
