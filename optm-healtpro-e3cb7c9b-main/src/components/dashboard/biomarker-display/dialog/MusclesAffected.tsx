
import React from 'react';
import { Dumbbell } from 'lucide-react';
import { Biomarker } from '../types';
import { getAffectedMuscles } from '../biomarkerUtils';

interface MusclesAffectedProps {
  biomarker: Biomarker;
}

const MusclesAffected: React.FC<MusclesAffectedProps> = ({ biomarker }) => {
  const affectedMuscles = getAffectedMuscles(biomarker.name);
  const showMusclesSection = affectedMuscles.length > 0 && 
                            affectedMuscles[0] !== 'No direct skeletal muscle impact' &&
                            affectedMuscles[0] !== 'Information not available for this biomarker';
  
  if (!showMusclesSection) {
    return null;
  }
  
  return (
    <div className="bg-muted/50 p-4 md:p-6 rounded-lg biomarker-detail-section">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <Dumbbell className="w-4 h-4 mr-1 md:mr-2" />
        Potentially Affected Skeletal Muscles
      </h4>
      <ul className="list-disc pl-4 md:pl-5 space-y-1 md:space-y-1.5">
        {affectedMuscles.map((muscle, index) => (
          <li key={index} className="text-xs md:text-sm text-muted-foreground">{muscle}</li>
        ))}
      </ul>
      <p className="text-xs mt-2 text-muted-foreground">
        These skeletal muscle groups may be impacted by changes in this biomarker.
      </p>
    </div>
  );
};

export default MusclesAffected;
