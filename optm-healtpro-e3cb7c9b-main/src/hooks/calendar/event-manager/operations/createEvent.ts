
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { CalendarEvent } from '../../types';
import { getAppointmentColor } from '../utils/appointmentColors';
import { GOOGLE_CALENDAR_ID } from '../../useCalendarAuth';

// Number of sync retry attempts
const MAX_SYNC_RETRIES = 3;

export const createEvent = async (
  eventData: Partial<CalendarEvent>,
  validateEventData: (data: Partial<CalendarEvent>) => boolean,
  onEventChange?: () => void,
  setIsCreating?: (value: boolean) => void,
  currentUser?: any // Pass the current user from useAuth for permissions
): Promise<boolean> => {
  try {
    if (!validateEventData(eventData)) {
      throw new Error("Invalid appointment data");
    }
    
    // Check if user has permission to create this type of event
    if (currentUser && currentUser.role === 'patient') {
      // Patients can only create appointments for themselves
      // Ensure the patient name matches their own name
      if (!eventData.patientName || !eventData.patientName.includes(currentUser.name)) {
        eventData.patientName = currentUser.name;
        console.log("Auto-assigning patient name to current user:", currentUser.name);
      }
      
      // Add patient metadata for filtering
      (eventData as any).patientId = currentUser.patientId || currentUser.id;
    }
    
    // Ensure start and end dates are properly formatted as Date objects
    if (eventData.start && !(eventData.start instanceof Date)) {
      eventData.start = new Date(eventData.start);
    }
    
    if (eventData.end && !(eventData.end instanceof Date)) {
      eventData.end = new Date(eventData.end);
    }
    
    // Add a unique ID to the event
    const completeEventData: CalendarEvent = {
      id: uuidv4(),
      title: eventData.title || 'Untitled Event',
      start: eventData.start as Date,
      end: eventData.end as Date,
      allDay: eventData.allDay || false,
      description: eventData.description || '',
      location: eventData.location || '',
      patientName: eventData.patientName || '',
      type: eventData.type || '',
      status: 'scheduled',
      color: getAppointmentColor(eventData.type || ''),
      ...(eventData as any)
    };
    
    console.log('Creating event with data:', completeEventData);
    
    // In a real app, this would be an API call to your backend
    // which would then use Google Calendar API to create the event
    let googleCalendarSyncSuccess = false;
    let retryCount = 0;
    
    // Retry loop for Google Calendar sync
    while (!googleCalendarSyncSuccess && retryCount < MAX_SYNC_RETRIES) {
      try {
        // Simulate API call to create event in Google Calendar
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // This is where we would make the actual API call to Google Calendar
        // For demo purposes, we're simulating the Google Calendar API call
        console.log('Syncing appointment to Google Calendar:', {
          summary: completeEventData.title,
          description: completeEventData.description,
          start: { 
            dateTime: completeEventData.start instanceof Date 
              ? completeEventData.start.toISOString() 
              : new Date(completeEventData.start).toISOString() 
          },
          end: { 
            dateTime: completeEventData.end instanceof Date 
              ? completeEventData.end.toISOString() 
              : new Date(completeEventData.end).toISOString() 
          },
          location: completeEventData.location,
          colorId: completeEventData.color
        });
        
        // In a real implementation:
        // 1. We would use the Google Calendar API via fetch/axios
        // 2. We would handle the response properly
        // 3. We would store the Google Calendar event ID for future updates
        
        // Mock a successful response
        googleCalendarSyncSuccess = true;
        
        // For debugging: log the calendar being used
        console.log(`Event created in calendar: ${GOOGLE_CALENDAR_ID}`);
        
        // Broadcast event creation to update the UI
        window.dispatchEvent(new CustomEvent('calendar-data-updated', {
          detail: { 
            action: 'create', 
            appointment: completeEventData,
            timestamp: new Date().toISOString() 
          }
        }));
        
        console.log('Successfully synced with Google Calendar');
        break;
      } catch (googleError) {
        retryCount++;
        console.error(`Google Calendar sync error (attempt ${retryCount}/${MAX_SYNC_RETRIES}):`, googleError);
        
        if (retryCount >= MAX_SYNC_RETRIES) {
          // Final attempt failed
          throw new Error('Failed to sync with Google Calendar after multiple attempts');
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, retryCount)));
      }
    }
    
    // Trigger calendar refresh to update the UI
    if (onEventChange) {
      setTimeout(() => {
        console.log("Triggering calendar refresh after create");
        onEventChange();
        
        // Also dispatch the calendar-updated event to ensure iframe gets refreshed
        window.dispatchEvent(new Event('calendar-updated'));
      }, 500);
    }
    
    // Show appropriate success/error message
    if (googleCalendarSyncSuccess) {
      toast.success(`Appointment created: ${completeEventData.title}`, {
        description: `${new Date(completeEventData.start).toLocaleString()} - ${new Date(completeEventData.end).toLocaleTimeString()}`,
        duration: 3000
      });
    } else {
      toast.error('Google Calendar sync failed', {
        description: 'The appointment was saved locally, but failed to sync with Google Calendar. Please try again.',
        duration: 5000
      });
    }
    
    return googleCalendarSyncSuccess;
  } catch (error) {
    console.error('Error creating event:', error);
    
    toast.error('Failed to create appointment', {
      description: error instanceof Error ? error.message : 'There was an error creating your appointment. Please try again.',
      duration: 5000
    });
    
    return false;
  } finally {
    if (setIsCreating) setIsCreating(false);
  }
};
