
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getFromLocalStorage, storeInLocalStorage } from '@/services/storage/localStorageService';

// Define a Patient interface that matches the PatientsTab needs
export interface DashboardPatient {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  condition: string;
  lastVisit: string;
  nextVisit: string;
  icdCode: string;
  status: string;
  nextAppointment?: string;
  biomarkers?: any[];
  medicalRecords?: any[];
  isSample?: boolean;
}

export const usePatientsData = () => {
  const [patients, setPatients] = useState<DashboardPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<DashboardPatient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const refreshPatientData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Load patients from localStorage
      const storedPatients = getFromLocalStorage('patients');
      
      // Load sample data if no patients exist (first time only)
      if (storedPatients.length === 0) {
        // Import sample data from the patients page
        const { samplePatients } = await import('@/pages/patients/data/samplePatients');
        
        // Mark them as sample data and make sure they conform to our DashboardPatient type
        const markedSamplePatients = samplePatients.map(patient => ({
          ...patient,
          isSample: true,
          status: 'active', // Adding the required status field
          nextAppointment: patient.nextVisit // Using nextVisit as nextAppointment
        }));
        
        // Store sample patients
        markedSamplePatients.forEach(patient => {
          storeInLocalStorage('patients', patient);
        });
        
        setPatients(markedSamplePatients as DashboardPatient[]);
      } else {
        console.log('Loaded patients from storage:', storedPatients.length);
        // Ensure loaded patients match our required interface
        const formattedPatients = storedPatients.map((patient: any) => ({
          ...patient,
          status: patient.status || 'active',
          nextAppointment: patient.nextAppointment || patient.nextVisit
        }));
        setPatients(formattedPatients);
      }
      
      toast.success("Patient data loaded", { 
        description: "Latest patient information is ready",
        duration: 3000
      });
    } catch (error) {
      console.error("Error refreshing patient data:", error);
      setHasError(true);
      toast.error("Failed to refresh data", {
        description: "Please try again or contact support",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleViewPatient = useCallback((patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      toast.error("Patient not found", {
        description: "Could not find the selected patient",
        duration: 3000
      });
    }
  }, [patients]);
  
  const handleClosePatientHistory = useCallback(() => {
    setSelectedPatient(null);
  }, []);
  
  const handlePatientUpdate = useCallback(async (updatedPatient: DashboardPatient) => {
    if (!updatedPatient) {
      toast.error("Invalid patient data", {
        description: "Cannot update with empty data",
        duration: 3000
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Store the updated patient
      storeInLocalStorage('patients', updatedPatient);
      
      // Update the local state
      setPatients(prevPatients => 
        prevPatients.map(p => 
          p.id === updatedPatient.id ? updatedPatient : p
        )
      );
      
      // Update the selected patient
      setSelectedPatient(updatedPatient);
      
      toast.success("Patient record updated", {
        description: "Changes have been saved successfully",
        duration: 3000
      });
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Update failed", {
        description: "Please try again or contact support",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleAddPatient = useCallback((newPatient: Partial<DashboardPatient>) => {
    try {
      const patientWithId = {
        ...newPatient,
        id: Date.now(),
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'active',
        icdCode: newPatient.icdCode || 'N/A',
        nextAppointment: newPatient.nextVisit || 'Not scheduled',
        nextVisit: newPatient.nextVisit || 'Not scheduled'
      } as DashboardPatient;
      
      // Store the new patient
      storeInLocalStorage('patients', patientWithId);
      
      // Update the local state
      setPatients(prev => [...prev, patientWithId]);
      
      toast.success("Patient added successfully", {
        description: "New patient record has been created",
        duration: 3000
      });
      
      return true;
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("Failed to add patient", {
        description: "Please try again or contact support",
        duration: 5000
      });
      return false;
    }
  }, []);
  
  return {
    patients,
    selectedPatient,
    isLoading,
    hasError,
    refreshPatientData,
    handleViewPatient,
    handleClosePatientHistory,
    handlePatientUpdate,
    handleAddPatient
  };
};
