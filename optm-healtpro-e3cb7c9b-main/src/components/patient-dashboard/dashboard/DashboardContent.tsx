
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import HealthAppsAlert from './HealthAppsAlert';
import ProfileAndAnatomySection from './ProfileAndAnatomySection';
import MetricsAndAgeSection from './MetricsAndAgeSection';
import FitnessActivitySection from './FitnessActivitySection';
import HealthMetricsAndInsights from './HealthMetricsAndInsights';
import TreatmentsAndAppointments from './TreatmentsAndAppointments';
import { AppointmentWithProvider } from '@/types/appointments';
import { HealthMetric } from '@/types/health';
import { TreatmentTask } from '@/types/treatment';
import { FitnessData } from '@/hooks/useFitnessIntegration';

interface DashboardContentProps {
  userName: string;
  patientId: string;
  healthMetrics: HealthMetric[];
  fitnessData: FitnessData;
  treatmentTasks: TreatmentTask[];
  appointments: AppointmentWithProvider[];
  biologicalAge: number;
  chronologicalAge: number;
  hasConnectedApps: boolean;
  onSyncData: () => Promise<void>;
  onConfirmAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  userName,
  patientId,
  healthMetrics,
  fitnessData,
  treatmentTasks,
  appointments,
  biologicalAge,
  chronologicalAge,
  hasConnectedApps,
  onSyncData,
  onConfirmAppointment,
  onRescheduleAppointment
}) => {
  return (
    <Tabs defaultValue="dashboard">
      <TabsContent value="dashboard" className="space-y-6">
        <HealthAppsAlert hasConnectedApps={hasConnectedApps} />
        
        <ProfileAndAnatomySection 
          name={userName} 
          patientId={patientId} 
          age={chronologicalAge || 35} 
        />
        
        <HealthMetricsAndInsights 
          healthMetrics={healthMetrics} 
          fitnessData={fitnessData} 
        />
        
        <MetricsAndAgeSection 
          healthMetrics={healthMetrics} 
          biologicalAge={biologicalAge} 
          chronologicalAge={chronologicalAge} 
        />
        
        <FitnessActivitySection 
          hasConnectedApps={hasConnectedApps} 
          fitnessData={fitnessData} 
          onSyncData={onSyncData} 
        />
        
        <TreatmentsAndAppointments 
          treatmentTasks={treatmentTasks} 
          appointments={appointments} 
          onConfirmAppointment={onConfirmAppointment} 
          onRescheduleAppointment={onRescheduleAppointment} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardContent;
