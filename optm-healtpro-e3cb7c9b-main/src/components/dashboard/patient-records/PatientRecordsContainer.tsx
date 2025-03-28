
import React, { useState } from 'react';
import { toast } from "sonner";
import { PatientRecordsHeader } from './PatientRecordsHeader';
import { PatientSearchBar } from './PatientSearchBar';
import { PatientRecordsTable } from './PatientRecordsTable';
import { PatientRecordsPagination } from './PatientRecordsPagination';
import { PatientStatisticsPanel } from './PatientStatisticsPanel';
import { Patient } from '@/pages/patients/types';

interface PatientRecordsProps {
  patients: Patient[];
  onViewPatient: (patientId: number) => void;
}

export const PatientRecords: React.FC<PatientRecordsProps> = ({ 
  patients, 
  onViewPatient 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.icdCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    toast.info("Add Patient", {
      description: "Opening new patient form",
      duration: 3000
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
        <PatientRecordsHeader 
          onAddPatient={handleAddPatient} 
        />
        
        <PatientSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <PatientRecordsTable 
          patients={filteredPatients}
          onViewPatient={onViewPatient}
        />
        
        <PatientRecordsPagination 
          totalCount={patients.length}
          filteredCount={filteredPatients.length}
        />
      </div>
      
      <PatientStatisticsPanel patients={patients} />
    </div>
  );
};

export default PatientRecords;
