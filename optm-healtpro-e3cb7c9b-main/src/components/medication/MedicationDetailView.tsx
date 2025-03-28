
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MedicationWithSummary } from '@/types/medicationData';
import MedicationHeader from './detail/MedicationHeader';
import MedicationStats from './detail/MedicationStats';
import DoseHistory from './detail/DoseHistory';

interface MedicationDetailViewProps {
  medication: MedicationWithSummary;
  onTakeDose?: (medicationId: string, doseId: string) => void;
  onMissDose?: (medicationId: string, doseId: string) => void;
}

const MedicationDetailView: React.FC<MedicationDetailViewProps> = ({
  medication,
  onTakeDose,
  onMissDose
}) => {
  return (
    <Card>
      <MedicationHeader 
        name={medication.name} 
        description={medication.description} 
      />
      
      <CardContent>
        <MedicationStats medication={medication} />
        <DoseHistory 
          medication={medication} 
          onTakeDose={onTakeDose} 
          onMissDose={onMissDose} 
        />
      </CardContent>
    </Card>
  );
};

export default MedicationDetailView;
