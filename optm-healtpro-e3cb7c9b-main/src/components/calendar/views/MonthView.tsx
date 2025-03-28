
import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { CalendarViewProps } from './types';

const MonthView: React.FC<CalendarViewProps> = ({
  visibleDates,
  selectedDate,
  getEventsForDate,
  onDateSelect,
  isToday
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-7 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 grid-rows-6 divide-x divide-y">
        {visibleDates.map((date, index) => {
          const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
          const dateEvents = getEventsForDate(date);
          const availableCount = dateEvents.filter(e => e.isAvailable).length;
          const bookedCount = dateEvents.filter(e => !e.isAvailable).length;
          
          return (
            <div 
              key={index} 
              className={cn(
                "min-h-[100px] p-1",
                isCurrentMonth ? "" : "bg-gray-50",
                isToday(date) ? "bg-primary/10" : ""
              )}
              onClick={() => onDateSelect(date)}
            >
              <div className={cn(
                "text-right p-1",
                isCurrentMonth ? "" : "text-muted-foreground"
              )}>
                <span className={cn(
                  "inline-block w-6 h-6 text-center",
                  isToday(date) ? "bg-primary text-primary-foreground rounded-full" : ""
                )}>
                  {date.getDate()}
                </span>
              </div>
              
              {dateEvents.length > 0 && (
                <div className="mt-1 space-y-1">
                  {availableCount > 0 && (
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded truncate">
                      {availableCount} available
                    </div>
                  )}
                  {bookedCount > 0 && (
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate">
                      {bookedCount} booked
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
