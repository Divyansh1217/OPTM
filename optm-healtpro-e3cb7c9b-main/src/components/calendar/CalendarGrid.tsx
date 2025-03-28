
import React, { RefObject } from 'react';
import { CalendarEvent, UpcomingAppointment } from '@/hooks/calendar/types';
import CalendarViewWrapper from '@/components/calendar/CalendarViewWrapper';
import AppointmentsCard from '@/components/calendar/AppointmentsCard';
import { User } from '@/contexts/auth/types';
import { toast } from 'sonner';

interface CalendarGridProps {
  isAuthorized: boolean;
  isLoading: boolean;
  selectedView: 'day' | 'week' | 'month';
  setSelectedView: (view: 'day' | 'week' | 'month') => void;
  calendarData: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onConnectCalendar: () => Promise<boolean>;
  isConnecting: boolean;
  onEventsChange: () => void;
  calendarViewRef: RefObject<any>;
  publicCalendarUrl?: string;
  reloadCalendarIframe: () => void;
  validAppointments: UpcomingAppointment[];
  refreshCalendar: () => Promise<void>;
  currentUser?: User;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  isAuthorized,
  isLoading,
  selectedView,
  setSelectedView,
  calendarData,
  selectedDate,
  onDateSelect,
  onConnectCalendar,
  isConnecting,
  onEventsChange,
  calendarViewRef,
  publicCalendarUrl,
  reloadCalendarIframe,
  validAppointments,
  refreshCalendar,
  currentUser
}) => {
  // Handle connection with feedback
  const handleConnectCalendar = async () => {
    try {
      const success = await onConnectCalendar();
      
      if (success) {
        console.log("Calendar connected successfully");
        // The toast is now handled in the useCalendarAuth hook
      }
      
      // Don't return the boolean, just return void to match the expected type
      return;
    } catch (error) {
      console.error("Error connecting calendar:", error);
      toast.error('Connection failed', {
        description: 'Could not connect to Google Calendar. Please try again.'
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2">
        <CalendarViewWrapper 
          isAuthorized={isAuthorized}
          isLoading={isLoading}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          calendarData={calendarData}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onConnectCalendar={handleConnectCalendar}
          isConnecting={isConnecting}
          onEventsChange={onEventsChange}
          calendarViewRef={calendarViewRef}
          publicCalendarUrl={publicCalendarUrl}
          reloadCalendarIframe={reloadCalendarIframe}
        />
      </div>

      <div className="h-full">
        <AppointmentsCard 
          isLoading={isLoading}
          isAuthorized={isAuthorized}
          appointments={validAppointments}
          onRefresh={refreshCalendar}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default CalendarGrid;
