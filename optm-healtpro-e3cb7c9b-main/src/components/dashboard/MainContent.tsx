
import React, { useState } from 'react';
import AnatomicalView from '@/components/patient/AnatomicalView';
import PatientProfile from '@/components/patient/PatientProfile';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left panel - Anatomical view */}
      <div className="lg:col-span-7 xl:col-span-8">
        <div className="h-full flex flex-col">
          <SymptomProvider>
            <AnatomicalView 
              selectedRegion={selectedRegion}
              onSelectRegion={onSelectRegion}
              patientId={patient.id}
            />
          </SymptomProvider>
        </div>
      </div>

      {/* Right panel - Patient profile */}
      <div className="lg:col-span-5 xl:col-span-4">
        <PatientProfile 
          patient={patient}
          onAssignTests={onAssignTests}
        />
      </div>
    </div>
  );
};

export default MainContent;
