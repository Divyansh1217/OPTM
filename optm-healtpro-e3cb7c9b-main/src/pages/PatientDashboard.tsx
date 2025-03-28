
import React, { useState, useEffect } from 'react';
import { SymptomProvider } from '@/contexts/SymptomContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import DashboardTabs from '@/components/patient-dashboard/DashboardTabs';
import usePatientDashboard from '@/hooks/usePatientDashboard';
import ErrorBoundary from '@/pages/dashboard/components/ErrorBoundary';
import { Appointment, AppointmentWithProvider } from '@/types/appointments';
import DashboardHeader from '@/components/patient-dashboard/dashboard/DashboardHeader';
import DashboardContent from '@/components/patient-dashboard/dashboard/DashboardContent';
import DashboardLoading from '@/components/patient-dashboard/dashboard/DashboardLoading';
import DashboardError from '@/components/patient-dashboard/dashboard/DashboardError';

// Default values used in various places moved to a single location
const defaultFitnessData = {
  steps: {
    data: [],
    summary: { total: 0, average: 0 }
  },
  heartRate: {
    data: [],
    summary: { average: 0, min: 0, max: 0 }
  },
  calories: {
    data: [],
    summary: { total: 0, average: 0 }
  }
};

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const {
    activityData,
    fitnessData,
    treatmentTasks,
    upcomingAppointments,
    healthMetrics,
    biologicalAge,
    chronologicalAge,
    hasConnectedApps,
    handleConfirmAppointment,
    handleRescheduleAppointment,
    handleSyncAllData,
    isLoading,
    error
  } = usePatientDashboard();

  // Format appointments for the components that need the AppointmentWithProvider type
  const formattedAppointments: AppointmentWithProvider[] = upcomingAppointments.map(appointment => ({
    id: appointment.id,
    patientId: appointment.patientId,
    providerId: appointment.providerId,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status || 'scheduled',
    type: appointment.type,
    location: appointment.location,
    provider: appointment.provider || {
      id: appointment.providerId,
      name: appointment.doctor,
      specialty: 'General Medicine',
    }
  }));

  useEffect(() => {
    if (error) {
      console.error("Dashboard error detected:", error);
      setHasError(true);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timeout triggered");
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleRetry = () => {
    setHasError(false);
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };

  const initialTab = 'dashboard';

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (hasError) {
    return <DashboardError onRetry={handleRetry} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 overflow-container bg-gray-50 dark:bg-gray-900">
          <DashboardHeader userName={user?.name || 'Patient'} />
          
          <ErrorBoundary onError={(error) => console.error("Error boundary caught:", error)}>
            <SymptomProvider>
              <DashboardTabs
                initialTab={initialTab}
                upcomingAppointments={formattedAppointments}
                onConfirmAppointment={handleConfirmAppointment}
                onRescheduleAppointment={handleRescheduleAppointment}
              >
                <DashboardContent 
                  userName={user?.name || 'Patient'}
                  patientId={user?.id || 'ABC123'}
                  healthMetrics={healthMetrics}
                  fitnessData={fitnessData || defaultFitnessData}
                  treatmentTasks={treatmentTasks}
                  appointments={formattedAppointments}
                  biologicalAge={biologicalAge}
                  chronologicalAge={chronologicalAge}
                  hasConnectedApps={hasConnectedApps}
                  onSyncData={handleSyncAllData}
                  onConfirmAppointment={handleConfirmAppointment}
                  onRescheduleAppointment={handleRescheduleAppointment}
                />
              </DashboardTabs>
            </SymptomProvider>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
