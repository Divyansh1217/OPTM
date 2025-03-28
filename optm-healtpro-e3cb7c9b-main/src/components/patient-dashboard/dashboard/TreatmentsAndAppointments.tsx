
import React, { Suspense } from 'react';
import { ComponentSkeleton } from './ComponentSkeleton';
import { AppointmentWithProvider } from '@/types/appointments';
import { TreatmentTask } from '@/types/treatment';

const EnhancedTreatmentTasks = React.lazy(() => import('@/components/patient-dashboard/EnhancedTreatmentTasks'));
const EnhancedAppointmentsList = React.lazy(() => import('@/components/patient-dashboard/EnhancedAppointmentsList'));

interface TreatmentsAndAppointmentsProps {
  treatmentTasks: TreatmentTask[];
  appointments: AppointmentWithProvider[];
  onConfirmAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string) => void;
}

const TreatmentsAndAppointments: React.FC<TreatmentsAndAppointmentsProps> = ({
  treatmentTasks,
  appointments,
  onConfirmAppointment,
  onRescheduleAppointment
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Suspense fallback={<ComponentSkeleton />}>
          <EnhancedTreatmentTasks tasks={treatmentTasks || []} />
        </Suspense>
      </div>
      
      <Suspense fallback={<ComponentSkeleton />}>
        <EnhancedAppointmentsList 
          appointments={appointments} 
          onConfirm={onConfirmAppointment}
          onReschedule={onRescheduleAppointment}
        />
      </Suspense>
    </div>
  );
};

export default TreatmentsAndAppointments;
