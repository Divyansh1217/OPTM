
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AppointmentDateTimeProps {
  startDate: Date;
  endDate: Date;
}

const AppointmentDateTime: React.FC<AppointmentDateTimeProps> = ({
  startDate,
  endDate
}) => {
  const formatTime = (date: Date) => {
    return formatDate(date, "h:mm a");
  };

  // Calculate duration in minutes
  const getDurationInMinutes = () => {
    return Math.round((endDate.getTime() - startDate.getTime()) / 60000);
  };

  return (
    <>
      <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <div>
          <div className="font-medium">{formatDate(startDate, "EEEE, MMMM d, yyyy")}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <div>
          <div className="font-medium">
            {formatTime(startDate)} - {formatTime(endDate)}
          </div>
          <div className="text-sm text-muted-foreground">
            {getDurationInMinutes()} minutes
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDateTime;
