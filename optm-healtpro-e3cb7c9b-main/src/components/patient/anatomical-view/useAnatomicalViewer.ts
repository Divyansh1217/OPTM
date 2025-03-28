
import { useState } from 'react';
import { AnatomicalMapping } from '@/types/medicalData';
import { 
  isMusculoskeletal,
  isSkeletal,
  isOrgan,
  isVascular,
  isNervous,
  isSkin
} from './RegionCategoryHelper';

export const useAnatomicalViewer = (mappings: AnatomicalMapping[]) => {
  const [activeSystem, setActiveSystem] = useState('full-body');
  
  // Group mappings by body system
  const systemMappings = {
    'full-body': mappings,
    'muscular': mappings.filter(m => isMusculoskeletal(m.bodyPart)),
    'skeletal': mappings.filter(m => isSkeletal(m.bodyPart)),
    'organs': mappings.filter(m => isOrgan(m.bodyPart)),
    'vascular': mappings.filter(m => isVascular(m.bodyPart)),
    'nervous': mappings.filter(m => isNervous(m.bodyPart)),
    'skin': mappings.filter(m => isSkin(m.bodyPart)),
  };
  
  const currentMappings = systemMappings[activeSystem as keyof typeof systemMappings];
  
  return {
    activeSystem,
    setActiveSystem,
    currentMappings,
    hasData: mappings.length > 0
  };
};
