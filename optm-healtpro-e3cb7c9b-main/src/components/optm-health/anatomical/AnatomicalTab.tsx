
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CircumferenceMeasurementSection from './CircumferenceMeasurementSection';
import { AnatomicalMeasurements } from '@/types/optm-health';

interface AnatomicalTabProps {
  anatomicalMeasurements: AnatomicalMeasurements;
  onAnatomicalCtmChange: (value: string) => void;
  onCircumferenceChange: (type: 'ccm' | 'cap' | 'cbp', index: number, field: string, value: any) => void;
  onAddCircumference: (type: 'ccm' | 'cap' | 'cbp') => void;
  onRemoveCircumference: (type: 'ccm' | 'cap' | 'cbp', index: number) => void;
  previousMeasurements?: AnatomicalMeasurements; // Added previous measurements
  errors?: string[]; // Added errors prop
}

const AnatomicalTab: React.FC<AnatomicalTabProps> = ({
  anatomicalMeasurements,
  onAnatomicalCtmChange,
  onCircumferenceChange,
  onAddCircumference,
  onRemoveCircumference,
  previousMeasurements,
  errors = [] // Default to empty array
}) => {
  // Calculate improvement percentage for CTM
  const getCtmImprovement = (): string | null => {
    if (anatomicalMeasurements?.ctm !== undefined && 
        previousMeasurements?.ctm !== undefined && 
        previousMeasurements.ctm !== 0) {
      // For CTM, a decrease indicates improvement (less neck forward position)
      const percentage = ((previousMeasurements.ctm - anatomicalMeasurements.ctm) / previousMeasurements.ctm) * 100;
      
      if (percentage > 0) {
        return `+${percentage.toFixed(1)}%`;
      } else {
        return `${percentage.toFixed(1)}%`;
      }
    }
    return null;
  };
  
  const ctmImprovement = getCtmImprovement();
  
  return (
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-2">Cervical Translational Measurement (CTM)</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="ctm">CTM Value (mm)</Label>
            {ctmImprovement && (
              <span className={`text-sm font-medium px-2 py-1 rounded ${parseFloat(ctmImprovement) > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                {ctmImprovement}
              </span>
            )}
          </div>
          <Input 
            id="ctm"
            type="number"
            step="0.1"
            value={anatomicalMeasurements?.ctm ?? ''} 
            onChange={(e) => onAnatomicalCtmChange(e.target.value)}
            placeholder="Enter CTM value in mm"
          />
        </div>
      </div>
      
      <Separator />
      
      <CircumferenceMeasurementSection
        type="ccm"
        title="Cervical Circumference Measurements (CCM)"
        measurements={anatomicalMeasurements?.ccm || []}
        previousMeasurements={previousMeasurements?.ccm}
        onChange={onCircumferenceChange}
        onRemove={onRemoveCircumference}
        onAdd={onAddCircumference}
      />
      
      <Separator />
      
      <CircumferenceMeasurementSection
        type="cap"
        title="Circumference Arm Posterior (CAP)"
        measurements={anatomicalMeasurements?.cap || []}
        previousMeasurements={previousMeasurements?.cap}
        onChange={onCircumferenceChange}
        onRemove={onRemoveCircumference}
        onAdd={onAddCircumference}
        hasSide
      />
      
      <Separator />
      
      <CircumferenceMeasurementSection
        type="cbp"
        title="Circumference Brachial Posterior (CBP)"
        measurements={anatomicalMeasurements?.cbp || []}
        previousMeasurements={previousMeasurements?.cbp}
        onChange={onCircumferenceChange}
        onRemove={onRemoveCircumference}
        onAdd={onAddCircumference}
        hasSide
      />
    </div>
  );
};

export default AnatomicalTab;
