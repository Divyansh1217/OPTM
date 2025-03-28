
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarView from '../CalendarView';
import { CalendarEvent } from '@/hooks/calendar/types';

interface CalendarViewContentProps {
  selectedView: 'day' | 'week' | 'month';
  setSelectedView: (view: 'day' | 'week' | 'month') => void;
  calendarData: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventsChange: () => void;
  isLoading: boolean;
  calendarViewRef?: React.RefObject<any>;
}

const CalendarViewContent: React.FC<CalendarViewContentProps> = ({
  selectedView,
  setSelectedView,
  calendarData,
  selectedDate,
  onDateSelect,
  onEventsChange,
  isLoading,
  calendarViewRef
}) => {
  return (
    <Card className="shadow-sm overflow-hidden border border-border/30 hover:shadow-md transition-all duration-200">
      <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
        <div className="bg-muted/30 border-b px-3 py-2 md:px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base md:text-lg font-semibold text-foreground">Calendar</h2>
            <TabsList className="bg-background/50">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <CardContent className="p-0">
          <TabsContent value="day" className="m-0">
            <CalendarView
              ref={calendarViewRef}
              view="day"
              events={calendarData}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              onEventsChange={onEventsChange}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="week" className="m-0">
            <CalendarView
              ref={calendarViewRef}
              view="week"
              events={calendarData}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              onEventsChange={onEventsChange}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="month" className="m-0">
            <CalendarView
              ref={calendarViewRef}
              view="month"
              events={calendarData}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              onEventsChange={onEventsChange}
              isLoading={isLoading}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default CalendarViewContent;
