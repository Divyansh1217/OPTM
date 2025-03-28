
import React from 'react';
import SymptomProgressChart from '@/components/dashboard/SymptomProgressChart';
import SymptomTracker from '@/components/dashboard/SymptomTracker';
import AnatomicalMap from '@/components/patient/AnatomicalMap';
import MedicalDocuments from '../MedicalDocuments';

const RightColumn: React.FC = () => {
  return (
    <div className="lg:col-span-4 space-y-4 md:space-y-6">
      {/* Progress Chart */}
      <div className="glass-morphism rounded-2xl p-6">
        <SymptomProgressChart className="w-full" />
      </div>
      
      {/* Symptom Tracker */}
      <SymptomTracker />
      
      {/* Anatomical Map */}
      <AnatomicalMap />
      
      {/* Medical Documents */}
      <MedicalDocuments />
    </div>
  );
};

export default RightColumn;
