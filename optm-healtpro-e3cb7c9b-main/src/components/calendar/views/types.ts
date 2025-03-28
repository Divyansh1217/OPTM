
import { CalendarEvent } from '@/hooks/calendar/types';

export interface CalendarViewProps {
  events?: CalendarEvent[];
  selectedDate: Date;
  visibleDates?: Date[];
  visibleHours?: number[];
  isLoading?: boolean;
  getEventsForDate?: (date: Date) => CalendarEvent[];
  getEventsForHour?: (date: Date, hour: number) => CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateSelect?: (date: Date) => void;
  isToday?: (date: Date) => boolean;
}
