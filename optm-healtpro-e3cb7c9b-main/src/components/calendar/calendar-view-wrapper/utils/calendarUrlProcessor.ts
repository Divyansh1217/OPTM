
/**
 * Utility functions for processing calendar URLs
 */
import { GOOGLE_CALENDAR_ID } from '@/hooks/calendar/useCalendarAuth';

/**
 * Process an iCal URL to make it displayable in an iframe
 */
export const getDisplayUrl = (url: string): string | null => {
  try {
    if (!url) {
      console.error("No calendar URL provided");
      return null;
    }
    
    console.log("Processing calendar URL:", url);
    
    // If the URL is already an embed URL, use it as is
    if (url.includes('calendar/embed')) {
      return url;
    }
    
    // Handle exact calendar ID from the user-provided credentials
    if (url.includes(GOOGLE_CALENDAR_ID) || url.includes(encodeURIComponent(GOOGLE_CALENDAR_ID))) {
      console.log("Found matching calendar ID in URL, using direct embed URL");
      return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GOOGLE_CALENDAR_ID)}&ctz=UTC`;
    }
    
    // Handle calendar.google.com URLs directly
    if (url.includes('calendar.google.com')) {
      // If it's already in a reasonable format
      if (url.includes('/ical/')) {
        // Extract the calendar ID from the iCal URL
        const match = url.match(/calendar\/ical\/([^\/]+)/);
        if (match && match[1]) {
          const calendarId = decodeURIComponent(match[1]);
          console.log("Extracted calendar ID from iCal URL:", calendarId);
          return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=UTC`;
        }
      }
      
      // Handle basic.ics URLs
      if (url.includes('/basic.ics')) {
        const idMatch = url.match(/([a-zA-Z0-9_-]+(?:%40|@)group\.calendar\.google\.com)/i);
        if (idMatch && idMatch[1]) {
          const calendarId = idMatch[1].replace('%40', '@');
          console.log("Extracted calendar ID from basic.ics URL:", calendarId);
          return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=UTC`;
        }
      }
    }
    
    // Fallback method: try to extract an email-like ID
    const emailMatch = url.match(/([a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_.-]+)/i);
    if (emailMatch && emailMatch[1]) {
      console.log("Extracted email-like calendar ID:", emailMatch[1]);
      return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(emailMatch[1])}&ctz=UTC`;
    }
    
    // Another fallback: look for a long alphanumeric string that might be a calendar ID
    const idMatch = url.match(/([a-zA-Z0-9]{20,})/);
    if (idMatch && idMatch[1]) {
      console.log("Extracted long alphanumeric calendar ID:", idMatch[1]);
      return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(idMatch[1])}%40group.calendar.google.com&ctz=UTC`;
    }
    
    // Simple conversion for ical URLs
    if (url.endsWith('.ics')) {
      // Remove the .ics extension and add the embed parameters
      const baseUrl = url.replace('.ics', '');
      console.log("Processing .ics URL to embed format");
      return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(baseUrl)}&ctz=UTC`;
    }
    
    // Last resort: direct embed with the URL as the src parameter
    console.log("Using URL directly as embed parameter");
    return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(url)}&ctz=UTC`;
  } catch (err) {
    console.error("Error processing calendar URL:", err);
    return null;
  }
};

/**
 * Alternative method to try if main method fails
 */
export const getFallbackDisplayUrl = (publicCalendarUrl: string): string | null => {
  try {
    // Check for the specific calendar ID
    if (publicCalendarUrl.includes(GOOGLE_CALENDAR_ID)) {
      console.log("Using fallback with exact calendar ID");
      return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GOOGLE_CALENDAR_ID)}&ctz=UTC`;
    }
    
    // Extract calendar ID using a different pattern
    const idMatch = publicCalendarUrl.match(/([a-zA-Z0-9]{20,})/);
    if (idMatch && idMatch[1]) {
      const calId = idMatch[1];
      console.log("Using fallback with extracted calendar ID:", calId);
      return `https://calendar.google.com/calendar/embed?src=${calId}%40group.calendar.google.com&ctz=UTC`;
    }
    
    // Direct embed fallback
    if (publicCalendarUrl) {
      console.log("Using direct URL fallback");
      return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(publicCalendarUrl)}&ctz=UTC`;
    }
    
    return null;
  } catch (err) {
    console.error("Error in fallback URL generation:", err);
    return null;
  }
};
