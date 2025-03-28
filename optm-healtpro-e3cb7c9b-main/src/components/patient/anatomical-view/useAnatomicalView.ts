
import { useState, useEffect } from 'react';
import { BodySystem, Hotspot } from './types';
import { getHotspotPosition, getSeverityColor, getSeverityLevel } from './utils';

export const useAnatomicalView = (
  selectedRegion?: string, 
  onSelectRegion?: (region: string) => void,
  patientId?: number
) => {
  const bodySystems: BodySystem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'skeletal', label: 'Skeletal' },
    { id: 'muscular', label: 'Muscular' },
    { id: 'muscular-new', label: 'Muscular HD' },
    { id: 'nervous', label: 'Nervous' }
  ];
  
  const [activeSystem, setActiveSystem] = useState('muscular-new');
  const [isRotating, setIsRotating] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 10.5]);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [activeHotspotDetails, setActiveHotspotDetails] = useState<Hotspot | null>(null);
  
  useEffect(() => {
    const mockHotspots: Hotspot[] = [];
    
    if (selectedRegion) {
      mockHotspots.push({
        id: '1',
        position: getHotspotPosition(`${selectedRegion.toLowerCase()}`),
        label: `${selectedRegion} Issue`,
        description: `Pain in ${selectedRegion} area likely caused by muscle tension`,
        severity: 'Moderate',
        color: '#FF4500',
        size: 0.1,
        region: selectedRegion
      });
    }
    
    if (activeSystem === 'muscular' || activeSystem === 'muscular-new') {
      mockHotspots.push(
        {
          id: '2',
          position: getHotspotPosition('shoulder-right'),
          label: 'Rotator Cuff Tear',
          description: 'Partial tear in the right rotator cuff causing limited mobility',
          severity: 'Severe',
          color: '#FF0000',
          size: 0.08,
          region: 'Shoulder'
        },
        {
          id: '3',
          position: getHotspotPosition('lower-back'),
          label: 'Lumbar Strain',
          description: 'Chronic lower back pain from muscular strain',
          severity: 'Moderate',
          color: '#FFA500',
          size: 0.09,
          region: 'Back'
        },
        {
          id: '4',
          position: getHotspotPosition('knee-left'),
          label: 'Patellar Tendinitis',
          description: 'Inflammation of the patellar tendon, causing pain during extension',
          severity: 'Mild',
          color: '#00FF00',
          size: 0.08,
          region: 'Knee'
        }
      );
    } else if (activeSystem === 'skeletal') {
      mockHotspots.push(
        {
          id: '5',
          position: getHotspotPosition('hip-right'),
          label: 'Osteoarthritis',
          description: 'Degenerative joint disease affecting right hip mobility',
          severity: 'Moderate',
          color: '#FFA500',
          size: 0.09,
          region: 'Hip'
        },
        {
          id: '6',
          position: getHotspotPosition('spine'),
          label: 'Herniated Disc',
          description: 'L4-L5 disc herniation causing nerve compression',
          severity: 'Severe',
          color: '#FF0000',
          size: 0.08,
          region: 'Spine'
        }
      );
    }
    
    setHotspots(mockHotspots);
  }, [selectedRegion, activeSystem]);
  
  const handleResetView = () => {
    setCameraPosition([0, 0, 10.5]);
    setIsRotating(false);
  };
  
  const handleHotspotClick = (id: string) => {
    const hotspot = hotspots.find(h => h.id === id);
    setActiveHotspotDetails(hotspot || null);
    
    if (hotspot && hotspot.region !== selectedRegion && onSelectRegion) {
      onSelectRegion(hotspot.region);
    }
  };
  
  return {
    activeSystem,
    setActiveSystem,
    isRotating,
    setIsRotating,
    cameraPosition,
    hotspots,
    handleResetView,
    handleHotspotClick,
    activeHotspotDetails,
    bodySystems
  };
};
