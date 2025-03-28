
import React from 'react';
import { CalendarEvent } from '@/hooks/calendar/types';
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';

interface CalendarViewRendererProps {
  view: 'day' | 'week' | 'month';
  selectedDate: Date;
  visibleDates: Date[];
  visibleHours: number[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForHour: (date: Date, hour: number) => CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (date: Date) => void;
  isToday: (date: Date) => boolean;
}

const CalendarViewRenderer: React.FC<CalendarViewRendererProps> = ({
  view,
  selectedDate,
  visibleDates,
  visibleHours,
  getEventsForDate,
  getEventsForHour,
  onEventClick,
  onDateSelect,
  isToday
}) => {
  switch (view) {
    case 'day':
      return (
        <DayView
          selectedDate={selectedDate}
          visibleHours={visibleHours}
          getEventsForHour={getEventsForHour}
          onEventClick={onEventClick}
        />
      );
    case 'week':
      return (
        <WeekView
          selectedDate={selectedDate}
          visibleDates={visibleDates}
          visibleHours={visibleHours}
          getEventsForHour={getEventsForHour}
          onEventClick={onEventClick}
          isToday={isToday}
        />
      );
    case 'month':
      return (
        <MonthView
          visibleDates={visibleDates}
          selectedDate={selectedDate}
          getEventsForDate={getEventsForDate}
          onDateSelect={onDateSelect}
          isToday={isToday}
        />
      );
    default:
      return null;
  }
};

export default CalendarViewRenderer;
