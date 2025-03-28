import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { AppointmentsDashboard } from '@/components/dashboard/appointments';

const AppointmentsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Sample data for appointments
  const upcomingAppointments = [
    {
      id: '1',
      date: 'June 20, 2023',
      time: '10:30 AM',
      doctor: 'Dr. Nikolas Pascal',
      type: 'Follow-up'
    },
    {
      id: '2',
      date: 'July 5, 2023',
      time: '02:00 PM',
      doctor: 'Dr. Nikolas Pascal',
      type: 'Physical Therapy'
    }
  ];
  
  // Function to handle appointment confirmation
  const handleConfirmAppointment = (id: string) => {
    toast({
      title: "Appointment Confirmed",
      description: "Your appointment has been confirmed.",
    });
  };

  // Function to handle appointment rescheduling
  const handleRescheduleAppointment = (id: string) => {
    toast({
      title: "Reschedule Requested",
      description: "Your request to reschedule has been sent.",
    });
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 pl-10 lg:pl-0">
            <h1 className="text-2xl font-bold">Your Appointments</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your upcoming appointments
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <AppointmentsDashboard 
              unreadMessages={3}
              nextAppointment={{
                date: 'June 20, 2023',
                time: '10:30 AM',
                doctor: 'Dr. Nikolas Pascal',
                type: 'Follow-up Consultation'
              }}
            />
            
            <h3 className="text-xl font-semibold mt-10 mb-4">Scheduled Appointments</h3>
            <div className="glass-morphism rounded-2xl p-6">
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-4 border rounded-lg bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-base">{appointment.type}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end md:self-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleConfirmAppointment(appointment.id)}
                        >
                          Confirm
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">No upcoming appointments scheduled</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentsPage;
