
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppointmentsList from '@/components/calendar/AppointmentsList';
import { UpcomingAppointment } from '@/hooks/calendar/useCalendarIntegration';
import { Calendar } from 'lucide-react';
import { User } from '@/contexts/auth/types';

interface AppointmentsCardProps {
  isLoading: boolean;
  isAuthorized: boolean;
  appointments: UpcomingAppointment[];
  onRefresh?: () => Promise<void>;
  publicCalendarUrl?: string;
  currentUser?: User;
}

const AppointmentsCard: React.FC<AppointmentsCardProps> = ({
  isLoading,
  isAuthorized,
  appointments,
  onRefresh,
  currentUser
}) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 h-full overflow-hidden">
      <CardHeader className="pb-2 border-b border-border/20 flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Calendar</CardTitle>
            <CardDescription className="text-xs">
              Your appointment schedule
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-4 max-h-[calc(100vh-22rem)] overflow-y-auto">
        <AppointmentsList 
          appointments={appointments} 
          isLoading={isLoading} 
          isAuthorized={isAuthorized} 
          currentUser={currentUser}
        />
      </CardContent>
    </Card>
  );
};

export default AppointmentsCard;
