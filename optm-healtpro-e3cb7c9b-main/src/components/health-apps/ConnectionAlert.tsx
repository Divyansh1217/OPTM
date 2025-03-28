
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoogleFitConnect from '@/components/integrations/GoogleFitConnect';

interface ConnectionAlertProps {
  showDebugInfo: boolean;
  setShowDebugInfo: (show: boolean) => void;
}

const ConnectionAlert: React.FC<ConnectionAlertProps> = ({
  showDebugInfo,
  setShowDebugInfo
}) => {
  return (
    <Alert className="mb-6 border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
      <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-800 dark:text-blue-300">Connect with Google Fit</AlertTitle>
      <AlertDescription className="flex justify-between items-center flex-col md:flex-row gap-2">
        <span className="text-blue-700 dark:text-blue-400">
          Connect your Google Fit account to sync your health data. Your data is securely stored and will be
          visible only to you and your healthcare providers.
        </span>
        <div className="flex gap-2">
          <GoogleFitConnect 
            variant="outline" 
            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700" 
          />
          {!showDebugInfo && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDebugInfo(true)}
              className="text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
            >
              Show Debug Info
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionAlert;
