
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PatientRecordsHeaderProps {
  onAddPatient: () => void;
}

export const PatientRecordsHeader: React.FC<PatientRecordsHeaderProps> = ({ 
  onAddPatient 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold">Patient Records</h2>
        <p className="text-sm text-muted-foreground">
          View and manage all patient information
        </p>
      </div>
      
      <Button onClick={onAddPatient}>
        <Plus className="h-4 w-4 mr-2" />
        Add Patient
      </Button>
    </div>
  );
};
