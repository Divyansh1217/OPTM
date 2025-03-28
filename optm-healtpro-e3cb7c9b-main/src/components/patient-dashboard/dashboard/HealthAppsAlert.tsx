
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface HealthAppsAlertProps {
  hasConnectedApps: boolean;
}

const HealthAppsAlert: React.FC<HealthAppsAlertProps> = ({ hasConnectedApps }) => {
  if (hasConnectedApps) return null;
  
  return (
    <Alert variant="default" className="bg-primary/5 border border-primary/20">
      <AlertCircle className="h-4 w-4 text-primary" />
      <AlertTitle>No connected health apps</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>
          Connect your health apps to see more accurate health data.
        </span>
        <Button variant="outline" size="sm" asChild>
          <a href="/health-apps">Connect Apps</a>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default HealthAppsAlert;
