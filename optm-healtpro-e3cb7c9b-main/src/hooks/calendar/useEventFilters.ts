
import { useCallback } from 'react';
import { CalendarEvent } from './types';

export function useEventFilters(events: CalendarEvent[]) {
  // Get events for a specific date
  const getEventsForDate = useCallback((date: Date) => {
    return events.filter(event => {
      const eventDate = event.start instanceof Date ? event.start : new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  }, [events]);

  // Get events for a specific hour on a specific date
  const getEventsForHour = useCallback((date: Date, hour: number) => {
    return events.filter(event => {
      const eventStart = event.start instanceof Date ? event.start : new Date(event.start);
      return (
        eventStart.getDate() === date.getDate() &&
        eventStart.getMonth() === date.getMonth() &&
        eventStart.getFullYear() === date.getFullYear() &&
        eventStart.getHours() === hour
      );
    });
  }, [events]);

  return {
    getEventsForDate,
    getEventsForHour
  };
}
