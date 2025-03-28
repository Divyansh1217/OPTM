
import React from 'react';
import { Biomarker } from '../types';
import { getStatusDescription, getTrendDescription } from '../biomarkerUtils';

interface BiomarkerExplanationProps {
  biomarker: Biomarker;
}

const BiomarkerExplanation: React.FC<BiomarkerExplanationProps> = ({ biomarker }) => {
  return (
    <div className="bg-muted/50 p-4 md:p-6 rounded-lg space-y-4 biomarker-detail-section">
      <div>
        <h4 className="font-medium mb-2">What does this mean?</h4>
        <p className="text-sm text-muted-foreground">{getStatusDescription(biomarker.status, biomarker.name)}</p>
      </div>
      
      {biomarker.description && (
        <div>
          <h4 className="font-medium mb-2">About this biomarker</h4>
          <p className="text-sm text-muted-foreground break-words">{biomarker.description}</p>
        </div>
      )}
      
      <div>
        <h4 className="font-medium mb-2">Trend analysis</h4>
        <p className="text-sm text-muted-foreground">{getTrendDescription(biomarker.trend, biomarker.status)}</p>
      </div>
    </div>
  );
};

export default BiomarkerExplanation;
