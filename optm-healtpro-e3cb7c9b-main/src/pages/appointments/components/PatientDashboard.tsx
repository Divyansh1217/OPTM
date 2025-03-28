
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { PatientAppointments, SecureMessaging, PatientDashboardTabs } from '@/components/patient-dashboard';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useDoctors } from '@/hooks/patient-dashboard/useDoctors';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { doctors } = useDoctors();

  // Fetch patient appointments from Supabase
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            id,
            appointment_type,
            date,
            duration,
            status,
            notes,
            location,
            doctor_id
          `)
          .eq('patient_id', user.id)
          .order('date', { ascending: true });
        
        if (error) throw error;
        
        // Transform the appointment data to include formatted time
        const formattedAppointments = data.map(appointment => {
          const appointmentDate = new Date(appointment.date);
          
          // Format time (HH:MM)
          const hours = appointmentDate.getHours().toString().padStart(2, '0');
          const minutes = appointmentDate.getMinutes().toString().padStart(2, '0');
          const time = `${hours}:${minutes}`;
          
          // Find the doctor for this appointment
          const doctor = doctors.find(d => d.id === appointment.doctor_id) || {
            id: appointment.doctor_id,
            name: 'Unknown Doctor',
            specialty: 'Medical Professional'
          };
          
          return {
            id: appointment.id,
            patientId: user.id,
            providerId: appointment.doctor_id,
            date: appointment.date,
            time,
            status: appointment.status,
            type: appointment.appointment_type,
            location: appointment.location || 'Main Clinic',
            notes: appointment.notes,
            provider: doctor
          };
        });
        
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Could not load your appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    
    // Set up real-time subscription for appointment updates
    const appointmentsSubscription = supabase
      .channel('appointments-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments',
          filter: `patient_id=eq.${user?.id}`
        }, 
        (payload) => {
          console.log('Appointment update received:', payload);
          // Refresh appointments when there's a change
          fetchAppointments();
          
          if (payload.eventType === 'UPDATE') {
            toast.info('An appointment has been updated');
          } else if (payload.eventType === 'INSERT') {
            toast.info('A new appointment has been scheduled for you');
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(appointmentsSubscription);
    };
  }, [user, doctors]);

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      // Call the Supabase function to update appointment status
      const { data, error } = await supabase.rpc(
        'update_appointment_status',
        {
          appointment_id: appointmentId,
          new_status: 'confirmed'
        }
      );
      
      if (error) throw error;
      
      if (data) {
        toast.success('Appointment confirmed successfully');
        
        // Update local state
        setAppointments(prevAppointments => 
          prevAppointments.map(app => 
            app.id === appointmentId ? { ...app, status: 'confirmed' } : app
          )
        );
      } else {
        toast.error('Unable to confirm appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Failed to confirm appointment');
    }
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    // In a real app, this would open a date/time picker
    // For now, we'll just show a notification
    toast.info('Reschedule feature coming soon', {
      description: 'Your doctor will be notified of your request to reschedule.'
    });
  };

  const handleMessageDoctor = (doctorId: string, doctorName: string) => {
    // This function would typically focus on the messaging tab
    // and select the specific doctor to message
    toast.info(`Opening conversation with Dr. ${doctorName}`);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      
      <PatientDashboardTabs />
      
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <PatientAppointments 
          appointments={appointments} 
          onMessageDoctor={handleMessageDoctor} 
        />
        
        <SecureMessaging doctors={doctors} />
      </div>
    </div>
  );
};

export default PatientDashboard;
