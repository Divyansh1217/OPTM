
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  CalendarX, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AppointmentWithProvider } from '@/types/appointments';
import { format, parseISO, isValid } from 'date-fns';
import { useAppointmentStatus } from '@/hooks/calendar/useAppointmentStatus';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PatientAppointmentsProps {
  appointments: AppointmentWithProvider[];
  onMessageDoctor?: (doctorId: string, doctorName: string) => void;
}

const PatientAppointments: React.FC<PatientAppointmentsProps> = ({ 
  appointments, 
  onMessageDoctor 
}) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithProvider | null>(null);

  const formatAppointmentDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return 'Invalid date';
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const confirmAppointment = async (appointmentId: string) => {
    try {
      // Update appointment status to 'confirmed' using RPC function
      const { data, error } = await supabase.rpc(
        'update_appointment_status',
        {
          appointment_id: appointmentId,
          new_status: 'confirmed'
        }
      );
      
      if (error) throw error;
      
      if (data) {
        toast.success('Appointment confirmed!', {
          description: 'Your doctor has been notified of your confirmation.',
        });
      } else {
        toast.error('Unable to confirm appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Failed to confirm appointment');
    }
  };

  const openRescheduleDialog = (appointment: AppointmentWithProvider) => {
    setSelectedAppointment(appointment);
    setRescheduleDialogOpen(true);
  };

  const handleRescheduleRequest = async () => {
    if (!selectedAppointment) return;
    
    try {
      // For now, we're just changing the status to indicate a reschedule request
      // In a real app, this would trigger a workflow to find a new time
      const { data, error } = await supabase.rpc(
        'update_appointment_status',
        {
          appointment_id: selectedAppointment.id,
          new_status: 'cancelled'
        }
      );
      
      if (error) throw error;
      
      if (data) {
        toast.success('Reschedule request sent', {
          description: 'Your doctor will be notified and contact you with available times.',
        });
      } else {
        toast.error('Unable to request reschedule. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting reschedule:', error);
      toast.error('Failed to request reschedule');
    } finally {
      setRescheduleDialogOpen(false);
    }
  };

  const initiateMessageToDoctor = (providerId: string, providerName: string) => {
    if (onMessageDoctor) {
      onMessageDoctor(providerId, providerName);
    } else {
      toast.info('Messaging feature coming soon!');
    }
  };

  const currentDate = new Date();
  
  const upcomingAppointments = appointments.filter(
    app => new Date(app.date) >= currentDate && app.status !== 'cancelled'
  );
  
  const pastAppointments = appointments.filter(
    app => new Date(app.date) < currentDate || app.status === 'cancelled'
  );

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          My Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upcoming" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Past ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="border rounded-lg p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{appointment.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatAppointmentDate(appointment.date)} at {appointment.time}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Dr. {appointment.provider.name}
                        <span className="text-xs text-muted-foreground ml-2">
                          ({appointment.provider.specialty})
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {appointment.location}
                      </p>
                    </div>
                    <Badge 
                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {appointment.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {appointment.status === 'scheduled' && (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => confirmAppointment(appointment.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => openRescheduleDialog(appointment)}
                        >
                          <CalendarX className="h-4 w-4 mr-2" />
                          Reschedule
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="flex-1"
                      onClick={() => initiateMessageToDoctor(
                        appointment.provider.id, 
                        appointment.provider.name
                      )}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastAppointments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No past appointments</p>
              </div>
            ) : (
              pastAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="border rounded-lg p-4 transition-shadow hover:shadow-md opacity-80"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{appointment.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatAppointmentDate(appointment.date)} at {appointment.time}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Dr. {appointment.provider.name}
                        <span className="text-xs text-muted-foreground ml-2">
                          ({appointment.provider.specialty})
                        </span>
                      </p>
                    </div>
                    <Badge 
                      variant={
                        appointment.status === 'completed' ? 'default' : 
                        appointment.status === 'cancelled' ? 'destructive' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {appointment.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="flex-1"
                      onClick={() => initiateMessageToDoctor(
                        appointment.provider.id, 
                        appointment.provider.name
                      )}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="py-4">
              <p className="mb-4">
                Please confirm that you would like to request rescheduling of your 
                {selectedAppointment.type} appointment with Dr. {selectedAppointment.provider.name}.
              </p>
              <p className="text-sm text-muted-foreground">
                Your doctor or a receptionist will contact you to arrange a new appointment time.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRescheduleRequest}>
              Request Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PatientAppointments;
