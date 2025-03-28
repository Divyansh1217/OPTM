
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'appointment' | 'meeting' | 'reminder';
}

interface MiniCalendarProps {
  currentDate: Date;
  events: Record<string, CalendarEvent[]>;
  className?: string;
  onDateChange?: (date: Date) => void;
  onViewFullCalendar?: () => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  currentDate,
  events,
  className,
  onDateChange,
  onViewFullCalendar,
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const previousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange && onDateChange(newDate);
  };
  
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange && onDateChange(newDate);
  };
  
  const formatDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'appointment': return 'bg-blue-500';
      case 'meeting': return 'bg-purple-500';
      case 'reminder': return 'bg-yellow-500';
    }
  };
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Calendar</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-9" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateKey = formatDateKey(day);
            const hasEvents = events[dateKey] && events[dateKey].length > 0;
            const isToday = day === new Date().getDate() && 
                           month === new Date().getMonth() && 
                           year === new Date().getFullYear();
            
            return (
              <div 
                key={day}
                className={cn(
                  "h-9 flex flex-col items-center justify-center rounded-md relative cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                  isToday && "bg-primary/10 font-bold text-primary"
                )}
              >
                <span className="text-sm">{day}</span>
                {hasEvents && (
                  <div className="flex gap-0.5 absolute -bottom-1">
                    {events[dateKey].slice(0, 3).map((event, i) => (
                      <div 
                        key={`${event.id}-${i}`}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          getEventTypeColor(event.type)
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Today's Events</h4>
          {events[formatDateKey(new Date().getDate())]?.length ? (
            events[formatDateKey(new Date().getDate())].map((event) => (
              <div 
                key={event.id}
                className="flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-800/50"
              >
                <div className={cn("w-2 h-2 rounded-full", getEventTypeColor(event.type))} />
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No events scheduled for today</p>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={onViewFullCalendar}
        >
          View Full Calendar
        </Button>
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;
