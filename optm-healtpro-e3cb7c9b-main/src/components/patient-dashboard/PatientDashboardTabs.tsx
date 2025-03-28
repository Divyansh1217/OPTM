
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, HeartPulse, Pill } from 'lucide-react';
import { toast } from 'sonner';
import PatientAppointments from './PatientAppointments';
import SecureMessaging from './SecureMessaging';
import { useDoctors } from '@/hooks/patient-dashboard/useDoctors';
import { useAppointments } from '@/hooks/dashboard/useAppointments';
import { Appointment, AppointmentWithProvider } from '@/types/appointments';

const PatientDashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const { doctors } = useDoctors();
  const { upcomingAppointments, handleConfirmAppointment, handleRescheduleAppointment } = useAppointments();

  // Transform appointments to the format expected by PatientAppointments
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
      specialty: 'General Medicine'
    }
  }));

  const handleMessageDoctor = (doctorId: string, doctorName: string) => {
    setActiveTab('messages');
    toast.info(`Opening conversation with Dr. ${doctorName}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="appointments" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Appointments</span>
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Messages</span>
        </TabsTrigger>
        <TabsTrigger value="healthStats" className="flex items-center gap-2">
          <HeartPulse className="h-4 w-4" />
          <span className="hidden sm:inline">Health Stats</span>
        </TabsTrigger>
        <TabsTrigger value="medications" className="flex items-center gap-2">
          <Pill className="h-4 w-4" />
          <span className="hidden sm:inline">Medications</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="appointments" className="mt-0 space-y-6">
        <PatientAppointments 
          appointments={formattedAppointments} 
          onMessageDoctor={handleMessageDoctor}
        />
      </TabsContent>

      <TabsContent value="messages" className="mt-0 space-y-6">
        <SecureMessaging doctors={doctors} />
      </TabsContent>

      <TabsContent value="healthStats" className="mt-0 space-y-6">
        <div className="text-center py-12 border rounded-lg">
          <HeartPulse className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Health Statistics</h3>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Your health statistics and monitoring information will be displayed here.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="medications" className="mt-0 space-y-6">
        <div className="text-center py-12 border rounded-lg">
          <Pill className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Medication Management</h3>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Your medication schedules and history will be displayed here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PatientDashboardTabs;
