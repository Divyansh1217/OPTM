
import React, { useState, useEffect } from 'react';
import { PatientsLayout } from './components/PatientsLayout';
import { PatientsList } from './components/PatientsList';
import { PatientDetails } from './components/PatientDetails';
import { Patient } from './types';

// Sample patient data moved to a separate file
import { samplePatients } from './data/samplePatients';

const PatientsPage: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [patients] = useState<Patient[]>(samplePatients);
  const [patientSymptoms, setPatientSymptoms] = useState<any>({});
  
  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  
  // Mock function to replace the useSymptoms hook functionality
  const loadPatientSymptoms = (patientId: number) => {
    console.log(`Loading symptoms for patient ${patientId}`);
    // In a real implementation, this would fetch symptoms from an API
    // For now, we'll just store an empty array in our local state
    setPatientSymptoms(prev => ({
      ...prev,
      [patientId]: []
    }));
  };
  
  const handleViewPatient = (patientId: number) => {
    setSelectedPatientId(patientId);
    loadPatientSymptoms(patientId);
  };
  
  const handleClosePatientHistory = () => {
    setSelectedPatientId(null);
  };
  
  const handleUpdatePatient = (updatedPatient: Patient) => {
    // In a real app, this would update the patient data in your state or backend
    console.log("Patient updated:", updatedPatient);
  };
  
  useEffect(() => {
    if (selectedPatientId) {
      loadPatientSymptoms(selectedPatientId);
    }
  }, [selectedPatientId]);
  
  return (
    <PatientsLayout>
      {selectedPatientId && selectedPatient ? (
        <PatientDetails
          patient={selectedPatient}
          onClose={handleClosePatientHistory}
          onUpdate={handleUpdatePatient}
        />
      ) : (
        <PatientsList
          patients={patients}
          onViewPatient={handleViewPatient}
        />
      )}
    </PatientsLayout>
  );
};

export default PatientsPage;
