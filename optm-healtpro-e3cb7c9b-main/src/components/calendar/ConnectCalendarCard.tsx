
import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ConnectCalendarCardProps {
  isConnecting: boolean;
  onConnect: () => Promise<void>;
}

const ConnectCalendarCard: React.FC<ConnectCalendarCardProps> = ({
  isConnecting,
  onConnect
}) => {
  return (
    <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[350px]">
      <Alert variant="destructive" className="mb-6 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Calendar not connected</AlertTitle>
        <AlertDescription>
          Please connect your Google Calendar first to view and manage appointments.
        </AlertDescription>
      </Alert>
      
      <div className="text-center max-w-sm">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Connect Google Calendar</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Connect your Google Calendar to manage appointments and sync your schedule
        </p>
        <Button 
          onClick={onConnect} 
          disabled={isConnecting}
          size="lg"
          className="w-full"
        >
          {isConnecting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Connecting...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Connect Calendar
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ConnectCalendarCard;
