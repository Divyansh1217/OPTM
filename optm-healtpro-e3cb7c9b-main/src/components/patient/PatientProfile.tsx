
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ActivityScore, PatientHeader, VitalSigns, AiTips } from '@/components/patient/profile';

interface PatientProfileProps {
  patient: any;
  onAssignTests: () => void;
  showFullDetails?: boolean;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ 
  patient, 
  onAssignTests,
  showFullDetails = false
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800 h-full">
      <CardHeader className="pb-2">
        <PatientHeader patient={patient} />
      </CardHeader>
      <CardContent className="space-y-4">
        <VitalSigns patient={patient} />
        
        {showFullDetails && (
          <>
            <ActivityScore patient={patient} />
            <AiTips patientId={patient.id} />
          </>
        )}
        
        <div className="pt-2">
          <Button 
            onClick={onAssignTests} 
            className="w-full"
          >
            Assign Tests
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
