
import { useState, useEffect, useCallback } from 'react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';

interface CalendarDatesResult {
  visibleDates: Date[];
  visibleHours: number[];
  navigateToPrevious: () => void;
  navigateToNext: () => void;
  navigateToToday: () => void;
  isToday: (date: Date) => boolean;
}

export const useCalendarDates = (
  view: 'day' | 'week' | 'month',
  selectedDate: Date,
  onDateSelect: (date: Date) => void
): CalendarDatesResult => {
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  
  // Generate hours from 0 to 23 for day and week views
  const visibleHours = Array.from({ length: 24 }, (_, i) => i);
  
  // Check if a date is today
  const isToday = useCallback((date: Date) => {
    return isSameDay(date, new Date());
  }, []);
  
  // Navigate to previous period
  const navigateToPrevious = useCallback(() => {
    switch (view) {
      case 'day':
        onDateSelect(subDays(selectedDate, 1));
        break;
      case 'week':
        onDateSelect(subWeeks(selectedDate, 1));
        break;
      case 'month':
        onDateSelect(subMonths(selectedDate, 1));
        break;
    }
  }, [view, selectedDate, onDateSelect]);
  
  // Navigate to next period
  const navigateToNext = useCallback(() => {
    switch (view) {
      case 'day':
        onDateSelect(addDays(selectedDate, 1));
        break;
      case 'week':
        onDateSelect(addWeeks(selectedDate, 1));
        break;
      case 'month':
        onDateSelect(addMonths(selectedDate, 1));
        break;
    }
  }, [view, selectedDate, onDateSelect]);
  
  // Navigate to today
  const navigateToToday = useCallback(() => {
    onDateSelect(new Date());
  }, [onDateSelect]);
  
  // Update visible dates when view or selected date changes
  useEffect(() => {
    let dates: Date[] = [];
    
    switch (view) {
      case 'day':
        dates = [selectedDate];
        break;
      case 'week':
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
        dates = eachDayOfInterval({ start: weekStart, end: weekEnd });
        break;
      case 'month':
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);
        
        // Include days from previous and next months to fill the calendar grid
        const firstDay = startOfWeek(monthStart, { weekStartsOn: 0 });
        const lastDay = endOfWeek(monthEnd, { weekStartsOn: 0 });
        
        dates = eachDayOfInterval({ start: firstDay, end: lastDay });
        break;
    }
    
    setVisibleDates(dates);
  }, [view, selectedDate]);
  
  return {
    visibleDates,
    visibleHours,
    navigateToPrevious,
    navigateToNext,
    navigateToToday,
    isToday
  };
};
