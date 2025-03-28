
import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface CalendarHeaderProps {
  isLoading: boolean;
  isAuthorized: boolean;
  isConnecting: boolean;
  onRefresh: () => Promise<void>;
  onCreateAppointment: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  isLoading,
  isAuthorized,
  isConnecting,
  onRefresh,
  onCreateAppointment
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Appointments Calendar</h2>
        <p className="text-muted-foreground">
          Manage and schedule patient appointments
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh} 
          disabled={isLoading || !isAuthorized || isConnecting}
        >
          {isLoading ? <Spinner size="sm" className="mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
        <Button onClick={onCreateAppointment}>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
