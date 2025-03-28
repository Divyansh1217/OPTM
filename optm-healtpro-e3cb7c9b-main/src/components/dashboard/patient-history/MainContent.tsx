
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PatientProfile from '@/components/patient/PatientProfile';
import { AnatomicalView } from '@/components/patient/anatomical-view';
import { SymptomProvider } from '@/contexts/SymptomContext';

interface MainContentProps {
  patient: any;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  onAssignTests: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  patient,
  selectedRegion,
  onSelectRegion,
  onAssignTests
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <SymptomProvider>
          <div className="h-full flex flex-col">
            <AnatomicalView 
              selectedRegion={selectedRegion}
              onSelectRegion={onSelectRegion}
              patientId={patient.id}
            />
          </div>
        </SymptomProvider>
      </div>
      
      <div>
        <PatientProfile 
          patient={patient} 
          onAssignTests={onAssignTests} 
          showFullDetails={true}
        />
      </div>
    </div>
  );
};

export default MainContent;
