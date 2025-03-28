
import React, { useState, useEffect } from 'react';
import PatientHistory from '@/components/dashboard/PatientHistory';
import AddPatientDialog from './overview/AddPatientDialog';
import { PatientLoadingState, PatientErrorState } from './patients/PatientLoadingStates';
import { PatientListView } from './patients/PatientListView';
import { usePatientsData } from './patients/usePatientsData';

interface PatientsTabProps {
  patients?: any[];
  selectedPatient?: any;
  onViewPatient?: (patientId: number) => void;
  onClosePatientHistory?: () => void;
  onUpdatePatient?: (patient: any) => void;
}

const PatientsTab: React.FC<PatientsTabProps> = ({
  patients: externalPatients,
  selectedPatient: externalSelectedPatient,
  onViewPatient: externalHandleViewPatient,
  onClosePatientHistory: externalHandleClosePatientHistory,
  onUpdatePatient: externalHandlePatientUpdate
}) => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const {
    patients: internalPatients,
    selectedPatient: internalSelectedPatient,
    isLoading,
    hasError,
    refreshPatientData,
    handleViewPatient: internalHandleViewPatient,
    handleClosePatientHistory: internalHandleClosePatientHistory,
    handlePatientUpdate: internalHandlePatientUpdate,
    handleAddPatient
  } = usePatientsData();
  
  // Use external props if provided, otherwise use internal state
  const patients = externalPatients || internalPatients;
  const selectedPatient = externalSelectedPatient || internalSelectedPatient;
  const handleViewPatient = externalHandleViewPatient || internalHandleViewPatient;
  const handleClosePatientHistory = externalHandleClosePatientHistory || internalHandleClosePatientHistory;
  const handlePatientUpdate = externalHandlePatientUpdate || internalHandlePatientUpdate;
  
  // Auto-refresh patient data when tab is shown (only if using internal data)
  useEffect(() => {
    if (!externalPatients) {
      refreshPatientData();
    }
  }, [externalPatients, refreshPatientData]);
  
  // Handle add patient dialog
  const onAddPatientClick = () => setShowAddPatient(true);
  const onAddPatientSubmit = (newPatient: any) => {
    const success = handleAddPatient(newPatient);
    if (success) {
      setShowAddPatient(false);
    }
  };
  
  // Show loading state if we're using internal data and still loading
  if (isLoading && !selectedPatient && !externalPatients) {
    return <PatientLoadingState />;
  }
  
  // Show error state if there's an issue and no selected patient (only for internal data)
  if (hasError && !selectedPatient && (!patients || patients.length === 0) && !externalPatients) {
    return <PatientErrorState onRetry={refreshPatientData} />;
  }
  
  return (
    <>
      {selectedPatient ? (
        <PatientHistory 
          patient={selectedPatient as any} 
          onClose={handleClosePatientHistory}
          onUpdate={handlePatientUpdate as any}
        />
      ) : (
        <PatientListView
          patients={patients}
          isLoading={isLoading && !externalPatients}
          onViewPatient={handleViewPatient}
          onAddPatient={onAddPatientClick}
        />
      )}
      
      <AddPatientDialog 
        open={showAddPatient} 
        onOpenChange={setShowAddPatient}
        onAddPatient={onAddPatientSubmit}
      />
    </>
  );
};

export default PatientsTab;
