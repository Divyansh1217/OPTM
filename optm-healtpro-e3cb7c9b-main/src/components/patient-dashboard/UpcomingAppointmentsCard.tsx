
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, isValid, parseISO } from 'date-fns';

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  location: string;
  status: string;
  doctor?: string;
  provider?: {
    id: string;
    name: string;
    specialty: string;
  };
}

// More flexible type to allow for dashboard-layout components
type LegacyAppointment = {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status?: string;
  location?: string;
};

interface UpcomingAppointmentsCardProps {
  appointments?: Appointment[];
  upcomingAppointments?: LegacyAppointment[];
  onViewAll?: () => void;
  onConfirmAppointment?: (id: string) => void;
  onRescheduleAppointment?: (id: string) => void;
}

const UpcomingAppointmentsCard: React.FC<UpcomingAppointmentsCardProps> = ({
  appointments,
  upcomingAppointments,
  onViewAll,
  onConfirmAppointment,
  onRescheduleAppointment
}) => {
  // Convert legacy appointments to the Appointment format if needed
  const normalizedAppointments: Appointment[] = React.useMemo(() => {
    if (appointments && appointments.length > 0) {
      return appointments;
    } else if (upcomingAppointments && upcomingAppointments.length > 0) {
      return upcomingAppointments.map(appt => ({
        id: appt.id,
        type: appt.type,
        date: appt.date,
        time: appt.time,
        doctor: appt.doctor,
        location: appt.location || 'Main Clinic',
        status: appt.status || 'scheduled'
      }));
    }
    return [];
  }, [appointments, upcomingAppointments]);
  
  const formatAppointmentDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return 'Invalid date';
      return format(date, 'EEE, MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {normalizedAppointments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming appointments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {normalizedAppointments.slice(0, 3).map((appointment) => (
              <div 
                key={appointment.id}
                className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">{appointment.type}</h4>
                    <Badge 
                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatAppointmentDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>
                      {appointment.provider 
                        ? `Dr. ${appointment.provider.name} (${appointment.provider.specialty})` 
                        : appointment.doctor || 'Unknown Doctor'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Action buttons for appointments */}
            {(onConfirmAppointment || onRescheduleAppointment) && normalizedAppointments.length > 0 && (
              <div className="space-y-2 mt-4">
                {onConfirmAppointment && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onConfirmAppointment(normalizedAppointments[0].id)}
                  >
                    Confirm Appointment
                  </Button>
                )}
                
                {onRescheduleAppointment && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onRescheduleAppointment(normalizedAppointments[0].id)}
                  >
                    Reschedule
                  </Button>
                )}
              </div>
            )}
            
            {/* View All button */}
            {normalizedAppointments.length > 3 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2"
                onClick={onViewAll}
              >
                View All Appointments
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsCard;
