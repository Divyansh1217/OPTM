
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Appointment } from '@/types/appointments';

export function useAppointments() {
  const { user } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // For a real app, this would query Supabase
      // For now, using mock data
      
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          date: '2023-06-20T10:30:00',
          time: '10:30 AM',
          doctor: 'Dr. Nikolas Pascal',
          patientId: 'p1',
          providerId: 'dr1',
          type: 'Follow-up',
          status: 'scheduled',
          location: 'Main Clinic',
          notes: 'Discuss recent lab results',
          provider: {
            id: 'dr1',
            name: 'Dr. Nikolas Pascal',
            specialty: 'General Medicine',
            avatarUrl: '/lovable-uploads/doctor-pascal.png'
          }
        },
        {
          id: '2',
          date: '2023-07-05T14:00:00',
          time: '02:00 PM',
          doctor: 'Dr. Nikolas Pascal',
          patientId: 'p1',
          providerId: 'dr2',
          type: 'Physical Therapy',
          status: 'scheduled',
          location: 'Rehabilitation Center',
          notes: 'Bring previous exercise plan',
          provider: {
            id: 'dr2',
            name: 'Dr. Nikolas Pascal',
            specialty: 'Physical Therapy',
            avatarUrl: '/lovable-uploads/doctor-pascal.png'
          }
        },
        {
          id: '3',
          date: '2023-05-15T09:00:00',
          time: '09:00 AM',
          doctor: 'Dr. Sarah Johnson',
          patientId: 'p1',
          providerId: 'dr3',
          type: 'Annual Check-up',
          status: 'completed',
          location: 'Main Clinic',
          notes: 'Annual physical completed',
          provider: {
            id: 'dr3',
            name: 'Dr. Sarah Johnson',
            specialty: 'Internal Medicine',
            avatarUrl: '/lovable-uploads/doctor-johnson.png'
          }
        }
      ];
      
      // Split into upcoming and past
      const now = new Date();
      const upcoming = mockAppointments.filter(
        appt => new Date(appt.date) > now && appt.status !== 'cancelled'
      );
      const past = mockAppointments.filter(
        appt => new Date(appt.date) < now || appt.status === 'cancelled'
      );
      
      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
      
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch appointments'));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleConfirmAppointment = useCallback(async (id: string) => {
    try {
      // In a real app, this would call a Supabase RPC function
      toast.success('Appointment confirmed successfully');
      
      // Update local state
      setUpcomingAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status: 'confirmed' } : app)
      );
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Failed to confirm appointment');
    }
  }, []);

  const handleRescheduleAppointment = useCallback((id: string) => {
    // In a real app, this would open a date picker dialog
    toast.info('Reschedule feature coming soon');
  }, []);

  return {
    upcomingAppointments,
    pastAppointments,
    isLoading,
    error,
    handleConfirmAppointment,
    handleRescheduleAppointment,
    refresh: fetchAppointments
  };
}
