
import React from 'react';
import { AnatomicalMapping, Biomarker } from '@/types/medicalData';
import SystemTabs from '@/components/patient/anatomical-map/SystemTabs';
import EmptyState from './anatomical-view/EmptyState';
import BodyMap from './anatomical-view/BodyMap';
import MappingsList from './anatomical-view/MappingsList';
import { useAnatomicalViewer } from './anatomical-view/useAnatomicalViewer';

interface AnatomicalViewerProps {
  mappings: AnatomicalMapping[];
  biomarkers: Biomarker[];
}

const AnatomicalViewer: React.FC<AnatomicalViewerProps> = ({ mappings, biomarkers }) => {
  const { activeSystem, setActiveSystem, currentMappings, hasData } = useAnatomicalViewer(mappings);
  
  if (!hasData) {
    return <EmptyState />;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Anatomical Mapping</h2>
      
      <div className="card">
        <div className="p-4">
          <SystemTabs activeSystem={activeSystem} onSystemChange={setActiveSystem} />
          <BodyMap 
            mappings={currentMappings}
            biomarkers={biomarkers}
          />
        </div>
      </div>
      
      <MappingsList 
        mappings={currentMappings}
        biomarkers={biomarkers}
      />
    </div>
  );
};

export default AnatomicalViewer;
