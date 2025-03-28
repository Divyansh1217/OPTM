
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Patient, 
  MedicalReport, 
  MedicalAnalysis,
  Biomarker
} from '@/types/medicalData';
import { DataSyncService } from '@/services/dataSyncService';

// Default empty patient data
const defaultPatient: Patient = {
  id: 'default-patient',
  name: 'John Doe',
  biomarkers: [],
  symptoms: [],
  anatomicalMappings: [],
  reports: [],
  analyses: []
};

interface MedicalDataContextType {
  patient: Patient;
  isLoading: boolean;
  error: string | null;
  processMedicalReport: (report: MedicalReport) => Promise<MedicalAnalysis | null>;
  addBiomarker: (biomarker: Biomarker) => void;
  resetPatientData: () => void;
  lastProcessedReport: MedicalReport | null;
  lastAnalysis: MedicalAnalysis | null;
}

const MedicalDataContext = createContext<MedicalDataContextType | undefined>(undefined);

export const MedicalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [patient, setPatient] = useState<Patient>(defaultPatient);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastProcessedReport, setLastProcessedReport] = useState<MedicalReport | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<MedicalAnalysis | null>(null);

  // Load patient data from localStorage on mount
  useEffect(() => {
    try {
      const savedPatient = localStorage.getItem('patient-data');
      if (savedPatient) {
        setPatient(JSON.parse(savedPatient));
      }
    } catch (error) {
      console.error('Error loading patient data from localStorage:', error);
      // If there's an error loading data, continue with default data
    }
  }, []);

  // Save patient data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('patient-data', JSON.stringify(patient));
    } catch (error) {
      console.error('Error saving patient data to localStorage:', error);
      toast({
        title: "Error Saving Data",
        description: "Could not save patient data locally. Some changes may be lost.",
        variant: "destructive",
      });
    }
  }, [patient, toast]);

  /**
   * Process a medical report, extract data, and sync it across all components
   */
  const processMedicalReport = async (report: MedicalReport): Promise<MedicalAnalysis | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Process the report and get updated patient data
      const { updatedPatient, analysis } = await DataSyncService.processMedicalReport(report, patient);
      
      // Update state
      setPatient(updatedPatient);
      setLastProcessedReport(report);
      setLastAnalysis(analysis);
      
      // Notify user
      toast({
        title: "Report Processed Successfully",
        description: `Extracted ${analysis.extractedBiomarkers.length} biomarkers from your report`,
      });
      
      return analysis;
    } catch (error) {
      console.error('Error processing medical report:', error);
      setError('Failed to process report. Please try again.');
      
      toast({
        title: "Processing Failed",
        description: "There was an error analyzing your medical report.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a biomarker directly (used by the upload biomarker component)
   */
  const addBiomarker = (biomarker: Biomarker) => {
    setPatient(prev => {
      // Check if this biomarker already exists
      const existingIndex = prev.biomarkers.findIndex(b => b.name === biomarker.name);
      
      // Copy the biomarkers array
      const updatedBiomarkers = [...prev.biomarkers];
      
      if (existingIndex >= 0) {
        // Update existing biomarker
        updatedBiomarkers[existingIndex] = {
          ...updatedBiomarkers[existingIndex],
          latestValue: biomarker.latestValue,
          historicalValues: [
            biomarker.latestValue,
            ...updatedBiomarkers[existingIndex].historicalValues
          ]
        };
      } else {
        // Add new biomarker
        updatedBiomarkers.push(biomarker);
      }
      
      return {
        ...prev,
        biomarkers: updatedBiomarkers
      };
    });
    
    toast({
      title: "Biomarker Added",
      description: `${biomarker.name} has been added to your profile`,
    });
  };

  /**
   * Reset patient data to default values
   */
  const resetPatientData = () => {
    setPatient(defaultPatient);
    setLastProcessedReport(null);
    setLastAnalysis(null);
    
    toast({
      title: "Data Reset",
      description: "All patient data has been reset to default values",
    });
  };

  const contextValue: MedicalDataContextType = {
    patient,
    isLoading,
    error,
    processMedicalReport,
    addBiomarker,
    resetPatientData,
    lastProcessedReport,
    lastAnalysis
  };

  return (
    <MedicalDataContext.Provider value={contextValue}>
      {children}
    </MedicalDataContext.Provider>
  );
};

export const useMedicalData = (): MedicalDataContextType => {
  const context = useContext(MedicalDataContext);
  
  if (context === undefined) {
    throw new Error('useMedicalData must be used within a MedicalDataProvider');
  }
  
  return context;
};
