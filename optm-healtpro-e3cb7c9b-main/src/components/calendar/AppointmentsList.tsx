
import React from 'react';
import { CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { UpcomingAppointment } from '@/hooks/calendar/types';
import AppointmentStatusIndicator from '@/components/calendar/AppointmentStatusIndicator';
import { format, isValid } from 'date-fns';
import { User } from '@/contexts/auth/types';

interface AppointmentsListProps {
  appointments: UpcomingAppointment[];
  isLoading: boolean;
  isAuthorized: boolean;
  currentUser?: User;
}

const AppointmentSkeleton = () => (
  <div className="py-2 px-1">
    <Skeleton className="h-5 w-2/3 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-4 w-1/3" />
  </div>
);

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  isLoading,
  isAuthorized,
  currentUser
}) => {
  if (!isAuthorized) {
    return (
      <div className="py-8 text-center">
        <CalendarClock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">
          Connect your calendar to see your appointments
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <AppointmentSkeleton />
        <AppointmentSkeleton />
        <AppointmentSkeleton />
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="py-8 text-center">
        <CalendarClock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">No upcoming appointments</p>
        <Button variant="outline" size="sm" className="mt-4">
          Book an Appointment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        // Format the appointment date
        const appointmentDate = appointment.date instanceof Date ? 
          appointment.date : 
          new Date(appointment.date);

        const formattedDate = isValid(appointmentDate) ? 
          format(appointmentDate, 'PPP') : 
          'Invalid date';

        return (
          <div 
            key={appointment.id}
            className="p-3 rounded-md border border-border/40 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-sm">
                {currentUser?.role === 'patient' ? 
                  appointment.type : 
                  `${appointment.patientName} - ${appointment.type}`
                }
              </h4>
              <AppointmentStatusIndicator status={appointment.status} />
            </div>
            
            <div className="text-xs text-muted-foreground mb-1">
              {formattedDate} • {appointment.time} - {appointment.endTime}
            </div>
            
            {appointment.location && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Location:</span> {appointment.location}
              </div>
            )}
            
            {appointment.notes && (
              <div className="text-xs text-muted-foreground mt-2 bg-muted/30 p-1.5 rounded">
                {appointment.notes}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentsList;
