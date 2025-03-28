
import { toast } from 'sonner';
import { GOOGLE_CALENDAR_ID } from '../../useCalendarAuth';

// Number of sync retry attempts
const MAX_SYNC_RETRIES = 3;

export const deleteEvent = async (
  eventId: string,
  onEventChange?: () => void,
  closeEditDialog?: () => void
): Promise<boolean> => {
  try {
    // In a real app, this would be an API call
    console.log('Deleting event:', eventId);
    console.log(`Deleting from calendar: ${GOOGLE_CALENDAR_ID}`);
    
    let googleCalendarSyncSuccess = false;
    let retryCount = 0;
    
    // Retry loop for Google Calendar sync
    while (!googleCalendarSyncSuccess && retryCount < MAX_SYNC_RETRIES) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real implementation, we would:
        // 1. Get the Google Calendar event ID associated with this event
        // 2. Use the Google Calendar API to delete the event
        // 3. Handle the response and any errors
        
        console.log('Removing appointment from Google Calendar for ID:', eventId);
        
        // Mock successful deletion
        googleCalendarSyncSuccess = true;
        console.log('Successfully deleted from Google Calendar');
        break;
      } catch (googleError) {
        retryCount++;
        console.error(`Google Calendar deletion error (attempt ${retryCount}/${MAX_SYNC_RETRIES}):`, googleError);
        
        if (retryCount >= MAX_SYNC_RETRIES) {
          // Final attempt failed
          throw new Error('Failed to delete from Google Calendar after multiple attempts');
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, retryCount)));
      }
    }
    
    // Dispatch a custom event to notify about appointment deletion
    window.dispatchEvent(new CustomEvent('appointment-deleted', { 
      detail: { id: eventId } 
    }));
    
    // Dispatch a calendar-updated event
    window.dispatchEvent(new Event('calendar-updated'));
    
    if (googleCalendarSyncSuccess) {
      toast.success('Appointment deleted successfully', {
        description: 'The appointment has been removed from your calendar',
        duration: 3000
      });
    } else {
      toast.error('Google Calendar sync failed', {
        description: 'The appointment was deleted locally, but failed to remove from Google Calendar.',
        duration: 5000
      });
    }
    
    // Notify parent components that events have changed
    if (onEventChange) {
      console.log("Triggering calendar refresh after delete");
      onEventChange();
      
      // Additional delay to ensure all components refresh
      setTimeout(() => {
        window.dispatchEvent(new Event('calendar-updated'));
      }, 300);
    }
    
    return googleCalendarSyncSuccess;
  } catch (error) {
    console.error('Error deleting event:', error);
    
    toast.error('Failed to delete appointment', {
      description: error instanceof Error ? error.message : 'There was an error deleting the appointment. Please try again.',
      duration: 3000
    });
    
    return false;
  } finally {
    if (closeEditDialog) closeEditDialog();
  }
};
