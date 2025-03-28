
import React from 'react';
import { Patient } from '../../types';

interface PatientsTableProps {
  patients: Patient[];
  onViewPatient: (patientId: number) => void;
  children: React.ReactNode;
}

export const PatientsTable: React.FC<PatientsTableProps> = ({
  patients,
  onViewPatient,
  children
}) => {
  return (
    <div className="overflow-x-auto responsive-table">
      <table className="w-full border-collapse table-auto">
        {children}
      </table>
      
      {patients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
};
