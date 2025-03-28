
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Hotspot } from './types';

export default function useAnatomyModel(
  hotspots: Hotspot[],
  onAddHotspot?: (hotspot: Hotspot) => void,
  onDeleteHotspot?: (id: string) => void,
  readOnly: boolean = false
) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [addingHotspot, setAddingHotspot] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempClickPosition, setTempClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHotspotFormOpen, setIsHotspotFormOpen] = useState(false);
  const { toast } = useToast();
  
  const handleHotspotClick = (id: string, label: string, status: 'normal' | 'warning' | 'critical') => {
    if (editMode) {
      if (onDeleteHotspot) {
        onDeleteHotspot(id);
        toast({
          title: "Hotspot removed",
          description: `${label} has been removed`,
        });
      }
      return;
    }
    
    setActiveHotspot(id === activeHotspot ? null : id);
    
    if (status !== 'normal') {
      toast({
        title: `${label} issue detected`,
        description: status === 'critical' ? 
          'Critical condition requiring immediate attention' : 
          'Minor issue detected, monitoring recommended',
        variant: status === 'critical' ? 'destructive' : 'default',
      });
    }
  };
  
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!addingHotspot || readOnly) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTempClickPosition({ x, y });
    setIsHotspotFormOpen(true);
  };

  const handleSaveHotspot = (hotspotData: Partial<Hotspot>) => {
    if (!onAddHotspot || !tempClickPosition) return;
    
    const newHotspot: Hotspot = {
      id: `hotspot-${Date.now()}`,
      x: tempClickPosition.x,
      y: tempClickPosition.y,
      z: 0,
      color: hotspotData.color || '#52C41A',
      label: hotspotData.label || 'New Hotspot',
      description: hotspotData.description || 'No description provided',
      status: hotspotData.status || 'normal',
    };
    
    onAddHotspot(newHotspot);
    toast({
      title: "Issue added",
      description: `${newHotspot.label} has been added to the patient record`,
      variant: newHotspot.status === 'critical' ? 'destructive' : 
              newHotspot.status === 'warning' ? 'default' : 'default',
    });
    
    setAddingHotspot(false);
    setTempClickPosition(null);
  };

  const handleCloseForm = () => {
    setIsHotspotFormOpen(false);
    setTempClickPosition(null);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      if (direction === 'in') return Math.min(prev + 0.1, 2);
      if (direction === 'out') return Math.max(prev - 0.1, 0.5);
      return prev;
    });
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return {
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
  };
}
