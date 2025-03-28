
import React from 'react';
import { Patient } from '@/pages/patients/types';
import { PatientTableHeader } from './PatientTableHeader';
import { PatientTableRow } from './PatientTableRow';

interface PatientRecordsTableProps {
  patients: Patient[];
  onViewPatient: (patientId: number) => void;
}

export const PatientRecordsTable: React.FC<PatientRecordsTableProps> = ({
  patients,
  onViewPatient,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <PatientTableHeader />
        <tbody>
          {patients.map((patient) => (
            <PatientTableRow 
              key={patient.id}
              patient={patient} 
              onViewPatient={onViewPatient}
            />
          ))}
        </tbody>
      </table>
      
      {patients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
};
