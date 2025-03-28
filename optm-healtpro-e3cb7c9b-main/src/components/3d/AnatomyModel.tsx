
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import HotspotItem from './HotspotItem';
import HotspotForm from './HotspotForm';
import ControlPanel from './ControlPanel';
import AddHotspotInfo from './AddHotspotInfo';
import useAnatomyModel from './useAnatomyModel';
import { AnatomyModelProps } from './types';

const AnatomyModel: React.FC<AnatomyModelProps> = ({
  className,
  hotspots,
  onAddHotspot,
  onDeleteHotspot,
  readOnly = false,
}) => {
  const {
    activeHotspot,
    zoom,
    fullscreen,
    addingHotspot,
    editMode,
    tempClickPosition,
    isHotspotFormOpen,
    setAddingHotspot,
    setEditMode,
    handleHotspotClick,
    handleImageClick,
    handleSaveHotspot,
    handleCloseForm,
    handleZoom,
    toggleFullscreen
  } = useAnatomyModel(hotspots, onAddHotspot, onDeleteHotspot, readOnly);

  return (
    <div 
      className={cn(
        "anatomy-model-container relative bg-transparent",
        fullscreen ? "fixed inset-0 z-50 bg-background/90 backdrop-blur-sm" : "h-full w-full", 
        className
      )}
    >
      <motion.div
        className="relative w-full h-full flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ControlPanel 
          readOnly={readOnly}
          addingHotspot={addingHotspot}
          editMode={editMode}
          setAddingHotspot={setAddingHotspot}
          setEditMode={setEditMode}
          handleZoom={handleZoom}
          toggleFullscreen={toggleFullscreen}
        />
        
        <div className="flex-1 relative overflow-hidden">
          <div 
            className={cn(
              "relative w-full h-full flex items-center justify-center",
              addingHotspot && !readOnly ? "cursor-crosshair" : ""
            )}
            style={{ 
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease'
            }}
            onClick={handleImageClick}
          >
            <img 
              src="/lovable-uploads/5948eb29-98e2-4f5e-84f5-215cd42d103e.png" 
              alt="Human Anatomy" 
              className="h-full w-auto max-h-full object-contain"
            />
            
            {hotspots.map((hotspot) => (
              <HotspotItem 
                key={hotspot.id}
                hotspot={hotspot}
                activeHotspot={activeHotspot}
                editMode={editMode}
                readOnly={readOnly}
                onClick={handleHotspotClick}
              />
            ))}
            
            <AddHotspotInfo 
              addingHotspot={addingHotspot}
              readOnly={readOnly}
            />
          </div>
        </div>
      </motion.div>
      
      <HotspotForm 
        isOpen={isHotspotFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveHotspot}
        position={tempClickPosition}
      />
    </div>
  );
};

export default AnatomyModel;
