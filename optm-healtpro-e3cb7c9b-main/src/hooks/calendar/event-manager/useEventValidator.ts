
import { CalendarEvent } from '../types';

export const useEventValidator = () => {
  /**
   * Validates event data before creating or updating
   */
  const validateEventData = (data: Partial<CalendarEvent>): boolean => {
    try {
      // Check required fields
      if (!data.title || data.title.trim() === '') {
        console.error("Event validation failed: Missing title");
        return false;
      }

      // Verify start and end times are present and valid
      if (!data.start || !data.end) {
        console.error("Event validation failed: Missing start or end time");
        return false;
      }

      // Convert to Date objects if they're strings
      const startDate = data.start instanceof Date ? data.start : new Date(data.start);
      const endDate = data.end instanceof Date ? data.end : new Date(data.end);

      // Verify dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Event validation failed: Invalid date format");
        return false;
      }

      // Verify end time is after start time
      if (endDate <= startDate) {
        console.error("Event validation failed: End time must be after start time");
        return false;
      }
      
      // For non-all-day events, verify reasonable duration (less than 24 hours)
      if (!data.allDay && (endDate.getTime() - startDate.getTime() > 24 * 60 * 60 * 1000)) {
        console.error("Event validation failed: Event duration exceeds 24 hours");
        return false;
      }

      // Verify type is valid if present
      if (data.type && typeof data.type === 'string') {
        // Any additional validation for appointment type could go here
      }

      return true;
    } catch (error) {
      console.error("Event validation error:", error);
      return false;
    }
  };

  return { validateEventData };
};
