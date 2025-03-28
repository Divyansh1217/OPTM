
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAppointmentStatus() {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateAppointmentStatus = useCallback(async (
    appointmentId: string, 
    newStatus: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
  ) => {
    if (!appointmentId) return false;
    
    try {
      setIsUpdating(true);
      
      // Call the Supabase function to update appointment status
      const { data, error } = await supabase.rpc(
        'update_appointment_status',
        {
          appointment_id: appointmentId,
          new_status: newStatus
        }
      );
      
      if (error) throw error;
      
      if (data) {
        toast.success(`Appointment ${newStatus} successfully`);
        return true;
      } else {
        toast.error(`Unable to update appointment status. Please try again.`);
        return false;
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast.error('Failed to update appointment status');
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  // Create specific methods for each status update
  const handleConfirmAppointment = useCallback((appointmentId: string) => {
    return updateAppointmentStatus(appointmentId, 'confirmed');
  }, [updateAppointmentStatus]);

  const handleCancelAppointment = useCallback((appointmentId: string) => {
    return updateAppointmentStatus(appointmentId, 'cancelled');
  }, [updateAppointmentStatus]);

  const handleCompleteAppointment = useCallback((appointmentId: string) => {
    return updateAppointmentStatus(appointmentId, 'completed');
  }, [updateAppointmentStatus]);

  return {
    isUpdating,
    updateAppointmentStatus,
    handleConfirmAppointment,
    handleCancelAppointment,
    handleCompleteAppointment
  };
}
