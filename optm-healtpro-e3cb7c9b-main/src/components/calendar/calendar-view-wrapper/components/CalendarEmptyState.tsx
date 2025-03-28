
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CalendarEmptyStateProps {
  onReload: () => void;
  errorMessage?: string;
}

const CalendarEmptyState: React.FC<CalendarEmptyStateProps> = ({ 
  onReload,
  errorMessage 
}) => {
  return (
    <Card className="shadow-sm overflow-hidden border border-border/30">
      <CardContent className="p-6 flex flex-col items-center justify-center h-[450px] text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        
        <Alert variant="destructive" className="mb-4 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Calendar Not Available</AlertTitle>
          <AlertDescription>
            {errorMessage || "Google Calendar connection is required to view your appointments."}
          </AlertDescription>
        </Alert>
        
        <p className="text-muted-foreground mb-4 max-w-md">
          Please connect your Google Calendar using the button above, or try refreshing if you've already connected.
        </p>
        
        <Button 
          onClick={onReload}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default CalendarEmptyState;
