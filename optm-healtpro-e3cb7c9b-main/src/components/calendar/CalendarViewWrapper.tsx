
import React from 'react';
import { Card } from '@/components/ui/card';
import ConnectCalendarCard from './ConnectCalendarCard';
import CalendarViewContent from './calendar-view-wrapper/CalendarViewContent';
import CalendarIframe from './calendar-view-wrapper/CalendarIframe';
import { CalendarEvent } from '@/hooks/calendar/types';

interface CalendarViewWrapperProps {
  isAuthorized: boolean;
  isLoading: boolean;
  selectedView: 'day' | 'week' | 'month';
  setSelectedView: (view: 'day' | 'week' | 'month') => void;
  calendarData: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onConnectCalendar: () => Promise<void>;
  isConnecting: boolean;
  onEventsChange?: () => void;
  calendarViewRef?: React.RefObject<any>;
  publicCalendarUrl?: string;
  reloadCalendarIframe?: () => void;
}

const CalendarViewWrapper: React.FC<CalendarViewWrapperProps> = ({
  isAuthorized,
  isLoading,
  selectedView,
  setSelectedView,
  calendarData,
  selectedDate,
  onDateSelect,
  onConnectCalendar,
  isConnecting,
  onEventsChange = () => {},
  calendarViewRef,
  publicCalendarUrl,
  reloadCalendarIframe
}) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 h-full">
      {!isAuthorized ? (
        <Card className="shadow-sm hover:shadow-md transition-all duration-200">
          <ConnectCalendarCard 
            onConnect={onConnectCalendar}
            isConnecting={isConnecting}
          />
        </Card>
      ) : (
        <>
          <CalendarViewContent 
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            calendarData={calendarData}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            onEventsChange={onEventsChange}
            isLoading={isLoading}
            calendarViewRef={calendarViewRef}
          />
          
          {publicCalendarUrl && (
            <CalendarIframe 
              publicCalendarUrl={publicCalendarUrl} 
              reloadCalendarIframe={reloadCalendarIframe}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CalendarViewWrapper;
