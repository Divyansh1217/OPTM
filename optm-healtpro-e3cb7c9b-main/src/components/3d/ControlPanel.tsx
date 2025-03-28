
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2, Plus, X, Trash2 } from 'lucide-react';

interface ControlPanelProps {
  readOnly: boolean;
  addingHotspot: boolean;
  editMode: boolean;
  setAddingHotspot: (value: boolean) => void;
  setEditMode: (value: boolean) => void;
  handleZoom: (direction: 'in' | 'out') => void;
  toggleFullscreen: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  readOnly,
  addingHotspot,
  editMode,
  setAddingHotspot,
  setEditMode,
  handleZoom,
  toggleFullscreen
}) => {
  return (
    <>
      <div className="absolute top-2 right-2 z-20 flex space-x-2">
        {!readOnly && (
          <>
            <Button
              onClick={() => {
                setAddingHotspot(!addingHotspot);
                setEditMode(false);
              }}
              variant={addingHotspot ? "default" : "outline"}
              size="icon"
              className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
              title={addingHotspot ? "Cancel adding" : "Add hotspot"}
            >
              {addingHotspot ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => {
                setEditMode(!editMode);
                setAddingHotspot(false);
              }}
              variant={editMode ? "destructive" : "outline"}
              size="icon"
              className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
              title={editMode ? "Exit delete mode" : "Delete hotspots"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
        <Button
          onClick={toggleFullscreen}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <Button 
          onClick={() => handleZoom('in')}
          variant="secondary"
          className="p-1 md:p-2 rounded-full glass-morphism h-8 w-8 md:h-10 md:w-10 flex items-center justify-center"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button 
          onClick={() => handleZoom('out')}
          variant="secondary"
          className="p-1 md:p-2 rounded-full glass-morphism h-8 w-8 md:h-10 md:w-10 flex items-center justify-center"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </>
  );
};

export default ControlPanel;
