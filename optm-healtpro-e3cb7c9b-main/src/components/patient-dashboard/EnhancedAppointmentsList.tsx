
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppointmentWithProvider } from '@/types/appointments';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Video, 
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedAppointmentsListProps {
  appointments: AppointmentWithProvider[];
  onConfirm: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
}

const EnhancedAppointmentsList: React.FC<EnhancedAppointmentsListProps> = ({
  appointments,
  onConfirm,
  onReschedule
}) => {
  const getAppointmentTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'virtual':
        return <Video className="h-4 w-4 text-indigo-500" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-teal-500" />;
    }
  };
  
  const getAppointmentStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'text-green-500 bg-green-100 border-green-200';
      case 'scheduled':
        return 'text-amber-500 bg-amber-100 border-amber-200';
      case 'cancelled':
        return 'text-red-500 bg-red-100 border-red-200';
      case 'completed':
        return 'text-blue-500 bg-blue-100 border-blue-200';
      case 'rescheduled':
        return 'text-purple-500 bg-purple-100 border-purple-200';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };
  
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    const isTomorrow = date.setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0);
    
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return `${month} ${day}`;
  };
  
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedAppointments.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No upcoming appointments</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Schedule an appointment to see your doctor.
            </p>
            <Button className="mt-4" variant="outline">
              Schedule Appointment
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getAppointmentTypeIcon(appointment.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.type} Appointment</h3>
                      <p className="text-sm text-muted-foreground">
                        with Dr. {appointment.provider.name}
                      </p>
                    </div>
                  </div>
                  <Badge className={cn("font-normal", getAppointmentStatusColor(appointment.status))}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{getFormattedDate(appointment.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.provider.specialty}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.location}</span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-3 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{appointment.notes}</p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-end gap-2">
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onReschedule(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onConfirm(appointment.id)}
                      >
                        Confirm
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedAppointmentsList;
