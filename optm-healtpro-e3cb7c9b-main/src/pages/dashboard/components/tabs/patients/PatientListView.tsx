
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientsList } from '@/pages/patients/components/PatientsList';
import { DashboardPatient } from './usePatientsData';

interface PatientListViewProps {
  patients: DashboardPatient[];
  isLoading: boolean;
  onViewPatient: (patientId: number) => void;
  onAddPatient: () => void;
}

export const PatientListView: React.FC<PatientListViewProps> = ({
  patients,
  isLoading,
  onViewPatient,
  onAddPatient
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patients</h2>
        <Button onClick={onAddPatient}>
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>
      
      <PatientsList 
        patients={patients as any[]} 
        onViewPatient={onViewPatient}
        isLoading={isLoading}
      />
    </div>
  );
};
