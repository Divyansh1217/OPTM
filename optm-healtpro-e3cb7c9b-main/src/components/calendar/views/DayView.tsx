
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/hooks/calendar/types';
import { Button } from '@/components/ui/button';
import { CalendarViewProps } from './types';
import { format } from 'date-fns';

const DayView: React.FC<CalendarViewProps> = ({
  selectedDate,
  visibleHours,
  getEventsForHour,
  onEventClick
}) => {
  const formatEventTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "h:mm a");
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-1 divide-y">
        {visibleHours.map(hour => {
          const eventsForHour = getEventsForHour(selectedDate, hour);
          return (
            <div key={hour} className="min-h-[100px]">
              <div className="flex">
                <div className="border-r p-2 w-20 text-sm text-muted-foreground">
                  {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour-12} PM` : `${hour} AM`}
                </div>
                <div className="flex-1 p-1">
                  {eventsForHour.map(event => (
                    <div 
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={cn(
                        "p-2 mb-1 rounded text-sm cursor-pointer",
                        event.isAvailable ? "bg-green-100 hover:bg-green-200 text-green-800" : 
                          "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      )}
                    >
                      <div className="font-medium">
                        {event.isAvailable ? 'Available' : 'Booked'}
                      </div>
                      <div className="text-xs">
                        {formatEventTime(event.start)} - {formatEventTime(event.end)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
