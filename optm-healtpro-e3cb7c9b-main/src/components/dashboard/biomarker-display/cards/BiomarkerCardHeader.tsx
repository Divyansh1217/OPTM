
import React from 'react';
import { InfoIcon } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getStatusBgColor } from '../biomarkerUtils';
import { Biomarker } from '../types';

interface BiomarkerCardHeaderProps {
  biomarker: Biomarker;
}

const BiomarkerCardHeader: React.FC<BiomarkerCardHeaderProps> = ({ biomarker }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1">
        <h3 className="text-base font-medium">{biomarker.name}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="w-4 h-4 text-muted-foreground ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Normal range: {biomarker.normalRange} {biomarker.unit}</p>
              {biomarker.description && <p className="mt-1">{biomarker.description}</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(biomarker.status)}`}>
        {biomarker.status.charAt(0).toUpperCase() + biomarker.status.slice(1)}
      </span>
    </div>
  );
};

export default BiomarkerCardHeader;
