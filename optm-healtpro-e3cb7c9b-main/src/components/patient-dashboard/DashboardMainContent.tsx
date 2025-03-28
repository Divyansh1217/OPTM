
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import MetricsOverview from '@/components/patient-dashboard/MetricsOverview';
import RecentSymptoms from '@/components/patient-dashboard/RecentSymptoms';
import TreatmentTasks from '@/components/patient-dashboard/TreatmentTasks';
import AppointmentsList from '@/components/patient-dashboard/AppointmentsList';
import BiologicalAgeMeter from '@/components/patient-dashboard/BiologicalAgeMeter';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HealthMetric } from '@/types/health';
import { AppointmentWithProvider } from '@/types/appointments';
import { TreatmentTask } from '@/types/treatment';
import FitnessDataCharts from '@/components/dashboard/FitnessDataCharts';
import { useAuth } from '@/contexts/auth';
import useFitnessIntegration from '@/hooks/useFitnessIntegration';

interface DashboardMainContentProps {
  healthMetrics: HealthMetric[];
  activityData: any;
  treatmentTasks: TreatmentTask[];
  upcomingAppointments: AppointmentWithProvider[];
  biologicalAge: number;
  chronologicalAge: number;
  hasConnectedApps: boolean;
  onSyncData: () => Promise<void>;
  handleConfirmAppointment: (appointmentId: string) => void;
  handleRescheduleAppointment: (appointmentId: string) => void;
}

const DashboardMainContent: React.FC<DashboardMainContentProps> = ({
  healthMetrics,
  treatmentTasks,
  upcomingAppointments,
  biologicalAge,
  chronologicalAge,
  hasConnectedApps,
  onSyncData,
  handleConfirmAppointment,
  handleRescheduleAppointment
}) => {
  const { user } = useAuth();
  const { fitnessData } = useFitnessIntegration();
  
  return (
    <TabsContent value="dashboard" className="space-y-6">
      {!hasConnectedApps && (
        <Alert variant="default" className="bg-primary/5 border border-primary/20">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle>No connected health apps</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>
              Connect your health apps to see more accurate health data.
            </span>
            <Button variant="outline" size="sm" asChild>
              <a href="/health-apps">Connect Apps</a>
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid md:grid-cols-3 gap-4">
        <MetricsOverview metrics={healthMetrics} />
        <BiologicalAgeMeter 
          biologicalAge={biologicalAge} 
          chronologicalAge={chronologicalAge} 
          className="md:col-span-1" 
        />
      </div>
      
      {hasConnectedApps && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Fitness Activity</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSyncData}
            className="gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sync Data</span>
          </Button>
        </div>
      )}
      
      {hasConnectedApps && (
        <FitnessDataCharts fitnessData={fitnessData} />
      )}
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TreatmentTasks tasks={treatmentTasks} />
          <RecentSymptoms />
        </div>
        
        <AppointmentsList 
          appointments={upcomingAppointments} 
          onConfirm={handleConfirmAppointment}
          onReschedule={handleRescheduleAppointment}
        />
      </div>
    </TabsContent>
  );
};

export default DashboardMainContent;
