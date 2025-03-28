
import React from 'react';
import { Moon } from 'lucide-react';

const NoSleepData: React.FC = () => {
  return (
    <div className="text-center py-8">
      <Moon className="h-12 w-12 text-blue-500 mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-medium text-muted-foreground">No Sleep Data</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Wear your device during sleep to track your sleep patterns
      </p>
    </div>
  );
};

export default NoSleepData;
