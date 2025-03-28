
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

const DashboardLoading: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
        <Spinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Loading dashboard...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
