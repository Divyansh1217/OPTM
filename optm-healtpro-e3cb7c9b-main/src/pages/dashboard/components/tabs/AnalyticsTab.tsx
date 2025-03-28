
import React from 'react';
import { Activity } from 'lucide-react';

const AnalyticsTab: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      <p className="text-muted-foreground mb-6">
        View patient analytics and treatment outcomes
      </p>
      
      <div className="border border-dashed rounded-lg py-12 flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Analytics features will be available soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
