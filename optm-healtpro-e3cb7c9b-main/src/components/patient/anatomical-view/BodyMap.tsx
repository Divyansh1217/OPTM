
import React from 'react';
import { AnatomicalMapping, Biomarker } from '@/types/medicalData';
import HumanBodyOutline from './HumanBodyOutline';
import Hotspot from './Hotspot';

interface BodyMapProps {
  mappings: AnatomicalMapping[];
  biomarkers: Biomarker[];
}

const BodyMap: React.FC<BodyMapProps> = ({ mappings, biomarkers }) => {
  return (
    <div className="mt-6 border rounded-lg p-4 min-h-[400px] relative">
      <div className="flex justify-center items-center h-full">
        <div className="bg-muted/20 border rounded-lg p-6 w-80 relative">
          <HumanBodyOutline />
          
          {/* Render hotspots */}
          {mappings.map((mapping, index) => (
            <Hotspot 
              key={index}
              mapping={mapping}
              biomarkers={biomarkers.filter(b => mapping.affectedBiomarkers.includes(b.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyMap;
