
import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CalendarViewProps } from './types';

const WeekView: React.FC<CalendarViewProps> = ({
  visibleDates,
  visibleHours,
  getEventsForHour,
  onEventClick,
  isToday
}) => {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm h-full">
      {/* Header with days of the week */}
      <div className="grid grid-cols-8 border-b bg-muted/20">
        <div className="p-2 text-center border-r"></div>
        {visibleDates.map((date, index) => (
          <div 
            key={index} 
            className={cn(
              "p-2 text-center font-medium", 
              isToday(date) ? "bg-primary/10" : ""
            )}
          >
            <div className="text-xs md:text-sm">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}</div>
            <div className={cn(
              "text-sm mx-auto flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full transition-colors", 
              isToday(date) ? "bg-primary text-primary-foreground" : ""
            )}>
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
      
      {/* Time grid with events - wrapped in scrollable container */}
      <div className="overflow-y-auto max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-22rem)]">
        <div className="grid grid-cols-1 divide-y">
          {visibleHours.map(hour => (
            <div key={hour} className="grid grid-cols-8">
              {/* Time column */}
              <div className="p-2 text-xs text-center border-r text-muted-foreground bg-muted/5 sticky left-0">
                {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour-12} PM` : `${hour} AM`}
              </div>

              {/* Days columns with events */}
              {visibleDates.map((date, dayIndex) => {
                const events = getEventsForHour(date, hour);
                return (
                  <div key={dayIndex} className="p-1 min-h-[60px] relative border-r last:border-r-0 hover:bg-muted/5 transition-colors">
                    {events.map((event, eventIndex) => {
                      // Convert event.start and event.end to Date objects if they're strings
                      const startDate = event.start instanceof Date ? event.start : new Date(event.start);
                      const endDate = event.end instanceof Date ? event.end : new Date(event.end);
                      
                      return (
                        <div
                          key={eventIndex}
                          onClick={() => onEventClick(event)}
                          className={cn(
                            "rounded-md p-1 mb-1 text-xs cursor-pointer transition-colors overflow-hidden",
                            event.isAvailable 
                              ? "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30" 
                              : "bg-primary/80 text-primary-foreground hover:bg-primary"
                          )}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="truncate flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-current"></span>
                            {formatDate(startDate, 'h:mm a')} - {formatDate(endDate, 'h:mm a')}
                          </div>
                          {event.status && (
                            <Badge variant="outline" className="mt-1 text-[10px] h-4 px-1">
                              {event.status}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
