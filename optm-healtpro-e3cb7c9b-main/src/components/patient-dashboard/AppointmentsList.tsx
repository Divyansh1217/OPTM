import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';
import { AppointmentWithProvider } from '@/types/appointments';

interface AppointmentsListProps {
  appointments: AppointmentWithProvider[];
  onConfirm: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ 
  appointments, 
  onConfirm, 
  onReschedule 
}) => {
  // Default appointments if none provided
  const defaultAppointments: AppointmentWithProvider[] = [
    {
      id: '1',
      patientId: 'p1',
      providerId: 'dr1',
      date: new Date(Date.now() + 86400000 * 2).toISOString(),
      time: '09:30',
      status: 'scheduled',
      type: 'Follow-up',
      location: 'North Clinic, Room 305',
      notes: 'Discuss recent lab results',
      provider: {
        id: 'dr1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Orthopedics',
        avatarUrl: '/lovable-uploads/doctor-johnson.png'
      }
    },
    {
      id: '2',
      patientId: 'p1',
      providerId: 'dr2',
      date: new Date(Date.now() + 86400000 * 7).toISOString(),
      time: '14:15',
      status: 'scheduled',
      type: 'Physical Therapy',
      location: 'East Wing Rehabilitation Center',
      notes: 'Follow-up on therapy progress',
      provider: {
        id: 'dr2',
        name: 'Dr. Michael Chen',
        specialty: 'Physical Therapy',
        avatarUrl: '/lovable-uploads/doctor-chen.png'
      }
    }
  ];

  const appointmentsToDisplay = appointments && appointments.length > 0 
    ? appointments 
    : defaultAppointments;

  // Format the appointment date
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointmentsToDisplay.map((appointment) => (
          <div key={appointment.id} className="rounded-md border p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{appointment.type}</h4>
                <p className="text-sm text-muted-foreground">{appointment.provider.name}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                appointment.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                  : appointment.status === 'cancelled'
                  ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              }`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span>{formatAppointmentDate(appointment.date)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center text-sm col-span-2">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span className="truncate">{appointment.location}</span>
              </div>
            </div>
            
            {appointment.status === 'scheduled' && (
              <div className="flex space-x-2 mt-3">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full gap-1"
                  onClick={() => onConfirm(appointment.id)}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Confirm</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-1"
                  onClick={() => onReschedule(appointment.id)}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Reschedule</span>
                </Button>
              </div>
            )}
          </div>
        ))}
        
        {appointmentsToDisplay.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming appointments</p>
            <Button variant="outline" size="sm" className="mt-2">
              Schedule an appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
