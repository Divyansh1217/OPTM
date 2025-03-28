
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface LoadingStateProps {
  message?: string;
}

export const PatientLoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading patient data..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" className="mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

interface ErrorStateProps {
  onRetry: () => void;
}

export const PatientErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h3 className="text-lg font-medium mb-2">Could not load patients</h3>
      <p className="text-muted-foreground mb-4">There was a problem loading the patient data</p>
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  );
};
