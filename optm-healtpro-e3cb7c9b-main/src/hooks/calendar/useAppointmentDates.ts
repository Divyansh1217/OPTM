
import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { format, parse, addMinutes } from 'date-fns';

export function useAppointmentDates(initialDate: Date = new Date()) {
  const [date, setDate] = useState<Date>(initialDate);
  const [startTime, setStartTime] = useState<string>('9:00 AM');
  const [endTime, setEndTime] = useState<string>('9:30 AM');
  const prevDateRef = useRef<Date>(initialDate);

  // Only update times when date changes significantly
  useEffect(() => {
    // Skip if date didn't change or it's the initial render
    if (prevDateRef.current && 
        date.getDate() === prevDateRef.current.getDate() && 
        date.getMonth() === prevDateRef.current.getMonth() && 
        date.getFullYear() === prevDateRef.current.getFullYear()) {
      return;
    }
    
    prevDateRef.current = date;
    
    // We keep the same times when date changes, just reset to current selected times
    setStartTime(startTime || '9:00 AM');
    setEndTime(endTime || '9:30 AM');
  }, [date, startTime, endTime]);

  // Memoize format function to prevent unnecessary re-renders
  const formatDate = useCallback((date: Date): string => {
    try {
      return format(date, 'PPP');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  }, []);

  // Improved error handling for time parsing
  const parseTime = useCallback((timeStr: string, dateVal: Date): Date => {
    if (!timeStr || !dateVal) {
      console.warn('Invalid time or date input:', { timeStr, dateVal });
      return new Date();
    }

    try {
      const datePart = format(dateVal, 'yyyy-MM-dd');
      const parsedDate = parse(`${datePart} ${timeStr}`, 'yyyy-MM-dd h:mm a', new Date());
      
      // Validate that the parsed date is valid
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date result');
      }
      
      return parsedDate;
    } catch (error) {
      console.error('Error parsing time:', error, { timeStr, dateVal });
      toast.error('Invalid time format');
      return new Date();
    }
  }, []);

  // Memoize appointment times getter to prevent recalculation
  const getAppointmentTimes = useCallback(() => {
    const start = parseTime(startTime, date);
    const end = parseTime(endTime, date);
    return { start, end };
  }, [date, startTime, endTime, parseTime]);

  // Improved validation with better error handling
  const validateTimeRange = useCallback(() => {
    try {
      const { start, end } = getAppointmentTimes();
      
      // Check if dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return {
          isValid: false,
          errorMessage: 'Invalid date/time format'
        };
      }
      
      if (start >= end) {
        return {
          isValid: false,
          errorMessage: 'End time must be after start time'
        };
      }
      
      const durationMs = end.getTime() - start.getTime();
      const durationHours = durationMs / (1000 * 60 * 60);
      
      if (durationHours > 4) {
        return {
          isValid: false,
          errorMessage: 'Appointment duration should not exceed 4 hours'
        };
      }
      
      return { isValid: true };
    } catch (error) {
      console.error('Error validating time range:', error);
      return {
        isValid: false,
        errorMessage: 'Invalid time format'
      };
    }
  }, [getAppointmentTimes]);

  // More robust auto-end time setter
  const setAutoEndTime = useCallback(() => {
    try {
      if (!startTime || !date) {
        return;
      }
      
      const start = parseTime(startTime, date);
      
      // Validate parsed start time
      if (isNaN(start.getTime())) {
        console.warn('Invalid start time, cannot set auto end time');
        return;
      }
      
      const end = addMinutes(start, 30);
      const endTimeStr = format(end, 'h:mm a');
      
      // Only set if it's different to avoid loop
      if (endTimeStr !== endTime) {
        setEndTime(endTimeStr);
      }
    } catch (error) {
      console.error('Error setting auto end time:', error);
    }
  }, [date, startTime, endTime, parseTime]);

  return {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    formatDate,
    parseTime,
    getAppointmentTimes,
    validateTimeRange,
    setAutoEndTime
  };
}
