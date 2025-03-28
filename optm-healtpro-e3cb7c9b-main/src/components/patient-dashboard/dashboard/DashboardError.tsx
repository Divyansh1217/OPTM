
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface DashboardErrorProps {
  onRetry: () => void;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ onRetry }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-4">We encountered a problem loading your dashboard</p>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
};

export default DashboardError;
