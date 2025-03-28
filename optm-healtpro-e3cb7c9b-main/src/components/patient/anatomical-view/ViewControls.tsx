
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, 
  Target
} from 'lucide-react';

interface ViewControlsProps {
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  handleResetView: () => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({
  isRotating,
  setIsRotating,
  handleResetView
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-700 shadow-md"
              onClick={() => setIsRotating(!isRotating)}
            >
              <RotateCcw className={`h-4 w-4 ${isRotating ? 'text-primary' : ''}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isRotating ? 'Stop rotation' : 'Auto-rotate'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-700 shadow-md"
              onClick={handleResetView}
            >
              <Target className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset view</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ViewControls;
