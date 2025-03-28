
import React, { useState } from 'react';
import PatientHistory from '@/components/dashboard/PatientHistory';
import { PatientDetailsProps } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Activity, FileText, BarChart } from 'lucide-react';
import OptmHealthPatientTab from '@/components/optm-health/patient/OptmHealthPatientTab';

export const PatientDetails: React.FC<PatientDetailsProps> = ({ 
  patient, 
  onClose, 
  onUpdate 
}) => {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="history" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Patient History</span>
          </TabsTrigger>
          <TabsTrigger value="optm-health" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>OPTM Health</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <PatientHistory 
            patient={patient}
            onClose={onClose}
            onUpdate={onUpdate}
          />
        </TabsContent>
        
        <TabsContent value="optm-health">
          <OptmHealthPatientTab patientId={patient.id.toString()} patientName={patient.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
