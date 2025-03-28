
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const MedicationOverview: React.FC = () => {
  return (
    <Alert className="mb-6">
      <Info className="h-4 w-4" />
      <AlertTitle>Doctor's Prescription</AlertTitle>
      <AlertDescription>
        Your doctor has prescribed the following medications to be taken 3 times daily:
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>PH3-BHT - Take with water</li>
          <li>PH3-JP - Take after meals</li>
          <li>Foot Batch Crystal - Dissolve in warm water</li>
          <li>Mornblooso - Take on empty stomach</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default MedicationOverview;
