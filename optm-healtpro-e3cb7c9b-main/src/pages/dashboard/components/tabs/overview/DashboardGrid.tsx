
import React from 'react';
import { Suspense, lazy } from 'react';
import { Spinner } from '@/components/ui/spinner';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import TherapySchedules from '@/components/dashboard/TherapySchedules';
import ClinicMessages from '@/components/dashboard/ClinicMessages';
import ClinicReminders from '@/components/dashboard/ClinicReminders';
import MiniCalendar from '@/components/dashboard/MiniCalendar';
import { ErrorBoundaryWithFallback } from './ErrorBoundaryWithFallback';

// Use lazy loading for non-critical components
const LazyClinicDocuments = lazy(() => import('@/components/dashboard/ClinicDocuments'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <Spinner size="md" />
  </div>
);

interface DashboardGridProps {
  appointments: any[];
  therapySessions: any[];
  messages: any[];
  reminders: any[];
  documents: any[];
  calendarEvents: any;
  currentDate: Date;
  onViewAllAppointments: () => void;
  onViewPatient: (patientId: number) => void;
  onViewAllMessages: () => void;
  onAddReminder: () => void;
  onToggleReminder: (id: string) => void;
  onViewFullCalendar: () => void;
  onViewAllDocuments: () => void;
  onUpload: () => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  appointments,
  therapySessions,
  messages,
  reminders,
  documents,
  calendarEvents,
  currentDate,
  onViewAllAppointments,
  onViewPatient,
  onViewAllMessages,
  onAddReminder,
  onToggleReminder,
  onViewFullCalendar,
  onViewAllDocuments,
  onUpload
}) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8">
        <ErrorBoundaryWithFallback onRetry={handleRetry}>
          <UpcomingAppointments 
            appointments={appointments}
            onViewAll={onViewAllAppointments}
          />
        </ErrorBoundaryWithFallback>
      </div>
      
      <div className="md:col-span-4">
        <ErrorBoundaryWithFallback onRetry={handleRetry}>
          <MiniCalendar 
            currentDate={currentDate} 
            events={calendarEvents}
            onDateChange={() => {}} // Handle date change
            onViewFullCalendar={onViewFullCalendar}
          />
        </ErrorBoundaryWithFallback>
      </div>
      
      <div className="md:col-span-4">
        <ErrorBoundaryWithFallback onRetry={handleRetry}>
          <TherapySchedules 
            therapySessions={therapySessions}
            onViewPatient={onViewPatient}
          />
        </ErrorBoundaryWithFallback>
      </div>
      
      <div className="md:col-span-4">
        <ErrorBoundaryWithFallback onRetry={handleRetry}>
          <ClinicMessages 
            messages={messages}
            onViewAll={onViewAllMessages}
          />
        </ErrorBoundaryWithFallback>
      </div>
      
      <div className="md:col-span-4">
        <ErrorBoundaryWithFallback onRetry={handleRetry}>
          <ClinicReminders 
            reminders={reminders}
            onAddReminder={onAddReminder}
            onToggleReminder={onToggleReminder}
          />
        </ErrorBoundaryWithFallback>
      </div>
      
      <div className="md:col-span-12">
        <Suspense fallback={<LoadingFallback />}>
          <LazyClinicDocuments 
            documents={documents}
            onUpload={onUpload}
            onViewAll={onViewAllDocuments}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardGrid;
