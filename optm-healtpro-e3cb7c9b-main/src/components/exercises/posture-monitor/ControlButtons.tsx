
import React from 'react';
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Check, Info, RotateCcw } from 'lucide-react';

interface ControlButtonsProps {
  cameraActive: boolean;
  isModelLoading: boolean;
  onToggleCamera: () => void;
  onReset: () => void;
  onShowTutorial: () => void;
  onFinish: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  cameraActive,
  isModelLoading,
  onToggleCamera,
  onReset,
  onShowTutorial,
  onFinish
}) => {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <Button 
        onClick={onToggleCamera} 
        variant={cameraActive ? "destructive" : "default"}
        className="gap-2 flex-1 btn-responsive-text"
        disabled={isModelLoading}
        aria-label={cameraActive ? "Stop Camera" : "Start Camera"}
      >
        {cameraActive ? (
          <>
            <CameraOff className="h-4 w-4" />
            <span className="sm:inline">Stop Camera</span>
          </>
        ) : (
          <>
            <Camera className="h-4 w-4" />
            <span className="sm:inline">{isModelLoading ? "Loading AI..." : "Start Camera"}</span>
          </>
        )}
      </Button>
      
      <Button 
        onClick={onReset} 
        variant="outline" 
        className="gap-2 btn-responsive-text btn-icon-only sm:btn-with-text"
        disabled={!cameraActive}
        aria-label="Reset"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Reset</span>
      </Button>
      
      <Button 
        onClick={onShowTutorial} 
        variant="outline" 
        className="gap-2 btn-responsive-text btn-icon-only sm:btn-with-text"
        aria-label="How To"
      >
        <Info className="h-4 w-4" />
        <span>How To</span>
      </Button>
      
      <Button 
        onClick={onFinish} 
        variant="outline" 
        className="gap-2 flex-1 btn-responsive-text"
        aria-label="Finish Session"
      >
        <Check className="h-4 w-4" />
        <span className="sm:inline">Finish Session</span>
      </Button>
    </div>
  );
};

export default ControlButtons;
