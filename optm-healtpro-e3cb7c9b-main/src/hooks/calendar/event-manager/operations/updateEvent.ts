
import { toast } from 'sonner';
import { CalendarEvent } from '../../types';
import { getAppointmentColor } from '../utils/appointmentColors';
import { GOOGLE_CALENDAR_ID } from '../../useCalendarAuth';

// Number of sync retry attempts
const MAX_SYNC_RETRIES = 3;

export const updateEvent = async (
  eventId: string,
  eventData: Partial<CalendarEvent>,
  validateEventData: (data: Partial<CalendarEvent>) => boolean,
  onEventChange?: () => void,
  setIsEditing?: (value: boolean) => void,
  closeEditDialog?: () => void,
  currentUser?: any // Add current user for permission checks
): Promise<boolean> => {
  try {
    if (!validateEventData(eventData)) {
      throw new Error("Invalid appointment data");
    }
    
    // Role-based permission check
    if (currentUser && currentUser.role === 'patient') {
      // Check if this event belongs to the patient
      const patientId = (eventData as any).patientId;
      const patientName = eventData.patientName;
      
      if (patientId && patientId !== currentUser.patientId && 
          (!patientName || !patientName.includes(currentUser.name))) {
        toast.error("Access denied", {
          description: "You don't have permission to update this appointment",
          duration: 3000
        });
        return false;
      }
      
      // Ensure patient name is preserved
      if (!eventData.patientName || !eventData.patientName.includes(currentUser.name)) {
        eventData.patientName = currentUser.name;
      }
    }
    
    // Add color based on type if updating type
    if (eventData.type) {
      eventData.color = getAppointmentColor(eventData.type);
    }
    
    // In a real app, this would be an API call
    console.log('Updating event:', eventId, {
      title: eventData.title,
      start: eventData.start instanceof Date ? eventData.start.toISOString() : eventData.start,
      end: eventData.end instanceof Date ? eventData.end.toISOString() : eventData.end,
      type: eventData.type,
      patientName: eventData.patientName,
      location: eventData.location,
      status: eventData.status || 'scheduled',
      color: eventData.color
    });
    
    // For debugging: log the calendar being used
    console.log(`Updating event in calendar: ${GOOGLE_CALENDAR_ID}`);
    
    let googleCalendarSyncSuccess = false;
    let retryCount = 0;
    
    // Retry loop for Google Calendar sync
    while (!googleCalendarSyncSuccess && retryCount < MAX_SYNC_RETRIES) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real implementation, we would:
        // 1. Get the Google Calendar event ID associated with this event
        // 2. Use the Google Calendar API to update the event
        // 3. Handle the response and any errors
        
        // Mock successful update
        googleCalendarSyncSuccess = true;
        console.log('Successfully updated in Google Calendar');
        break;
      } catch (googleError) {
        retryCount++;
        console.error(`Google Calendar update error (attempt ${retryCount}/${MAX_SYNC_RETRIES}):`, googleError);
        
        if (retryCount >= MAX_SYNC_RETRIES) {
          // Final attempt failed
          throw new Error('Failed to sync update with Google Calendar after multiple attempts');
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, retryCount)));
      }
    }
    
    // Dispatch a custom event to notify about appointment update
    window.dispatchEvent(new CustomEvent('appointment-updated', { 
      detail: { id: eventId, ...eventData } 
    }));
    
    // Dispatch a calendar-updated event
    window.dispatchEvent(new Event('calendar-updated'));
    
    // Force a refresh of the calendar data to ensure the updated appointment shows up in all places
    if (onEventChange) {
      console.log("Triggering calendar refresh after update");
      onEventChange();
      
      // Additional delay to ensure all components refresh
      setTimeout(() => {
        window.dispatchEvent(new Event('calendar-updated'));
        onEventChange(); // Call again for good measure
      }, 500);
    }
    
    if (googleCalendarSyncSuccess) {
      toast.success('Appointment updated successfully', {
        description: 'Your appointment details have been updated',
        duration: 3000
      });
    } else {
      toast.error('Google Calendar sync failed', {
        description: 'The appointment was updated locally, but failed to sync with Google Calendar.',
        duration: 5000
      });
    }
    
    return googleCalendarSyncSuccess;
  } catch (error) {
    console.error('Error updating event:', error);
    
    toast.error('Failed to update appointment', {
      description: error instanceof Error ? error.message : 'There was an error updating your appointment. Please try again.',
      duration: 3000
    });
    
    return false;
  } finally {
    if (setIsEditing) setIsEditing(false);
    if (closeEditDialog) closeEditDialog();
  }
};
