
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill } from 'lucide-react';
import MedicationOverview from './MedicationOverview';
import MedicationGrid from './MedicationGrid';
import { MedicationWithSummary } from '@/types/medicationData';

interface MedicationCardProps {
  medications: MedicationWithSummary[];
  onSelectMedication: (id: string) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medications, onSelectMedication }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="h-5 w-5 mr-2" />
          My Medications
        </CardTitle>
        <CardDescription>
          Track your prescribed medications and view their effectiveness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MedicationOverview />
        <MedicationGrid 
          medications={medications} 
          onSelectMedication={onSelectMedication} 
        />
      </CardContent>
    </Card>
  );
};

export default MedicationCard;
