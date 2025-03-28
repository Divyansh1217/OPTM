
import React from 'react';
import { AnatomicalMapping, Biomarker } from '@/types/medicalData';
import MappingCard from './MappingCard';

interface MappingsListProps {
  mappings: AnatomicalMapping[];
  biomarkers: Biomarker[];
}

const MappingsList: React.FC<MappingsListProps> = ({ mappings, biomarkers }) => {
  if (mappings.length === 0) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {mappings.map((mapping, index) => (
        <MappingCard 
          key={index} 
          mapping={mapping} 
          biomarkers={biomarkers.filter(b => mapping.affectedBiomarkers.includes(b.id))}
        />
      ))}
    </div>
  );
};

export default MappingsList;
