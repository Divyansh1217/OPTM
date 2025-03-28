
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleAlert, ZoomIn, ZoomOut } from 'lucide-react';

interface HeaderControlsProps {
  issuesCount: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({ issuesCount, onZoomIn, onZoomOut }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div>
        <div className="flex items-center mt-1">
          <CircleAlert className="h-4 w-4 text-amber-500 mr-1.5" />
          <span className="text-sm text-muted-foreground">{issuesCount} issues detected</span>
        </div>
      </div>
      <div className="flex space-x-1">
        <Button variant="outline" size="sm" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HeaderControls;
