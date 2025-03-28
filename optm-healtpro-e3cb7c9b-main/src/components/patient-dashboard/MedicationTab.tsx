
import React from 'react';
import MedicationTracker from '@/components/medication/MedicationTracker';
import MedicationDetailView from '@/components/medication/MedicationDetailView';
import MedicationCard from './medication/MedicationCard';
import { useMedicationData } from '@/hooks/useMedicationData';
import { useAuth } from '@/contexts/AuthContext';

interface MedicationTabProps {
  patientId?: string;
}

const MedicationTab: React.FC<MedicationTabProps> = ({ patientId }) => {
  const { user } = useAuth();
  const { 
    medications, 
    improvementData, 
    isLoading, 
    recordDoseTaken, 
    recordDoseMissed 
  } = useMedicationData(patientId);
  
  const [activeMedication, setActiveMedication] = React.useState<string | null>(null);
  
  if (isLoading) {
    return (
      <div className="w-full p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const selectedMedication = medications.find(med => med.id === activeMedication);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Medication tracker */}
        <div className="w-full md:w-1/3">
          <MedicationTracker 
            patientId={patientId || user?.id} 
            className="h-full" 
          />
        </div>
        
        {/* Right column - Selected medication or overview */}
        <div className="w-full md:w-2/3">
          {selectedMedication ? (
            <MedicationDetailView 
              medication={selectedMedication}
              onTakeDose={recordDoseTaken}
              onMissDose={recordDoseMissed}
            />
          ) : (
            <MedicationCard 
              medications={medications}
              onSelectMedication={setActiveMedication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationTab;
