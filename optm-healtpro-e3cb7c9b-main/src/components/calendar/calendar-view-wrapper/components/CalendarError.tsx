
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, RefreshCw } from 'lucide-react';

interface CalendarErrorProps {
  error: string | null;
  onReload: () => void;
}

const CalendarError: React.FC<CalendarErrorProps> = ({ error, onReload }) => {
  if (!error) return null;
  
  return (
    <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center z-10 p-4">
      <Calendar className="h-10 w-10 text-destructive mb-3" />
      <p className="text-destructive font-medium mb-2">{error}</p>
      <p className="text-muted-foreground text-sm mb-4 max-w-md text-center">
        There was a problem loading your calendar. This might be due to a connection issue or an invalid calendar URL.
      </p>
      <Button 
        onClick={onReload}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    </div>
  );
};

export default CalendarError;
