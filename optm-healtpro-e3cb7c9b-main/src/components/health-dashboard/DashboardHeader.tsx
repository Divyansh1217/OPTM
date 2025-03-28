
import React from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CardTitle } from '@/components/ui/card';

interface DashboardHeaderProps {
  lastSynced?: string;
  isLoading: boolean;
  onSyncClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  lastSynced,
  isLoading,
  onSyncClick
}) => {
  const formatLastSynced = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return format(date, 'PPp');
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <CardTitle>Health Dashboard</CardTitle>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          Last synced: {formatLastSynced(lastSynced)}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSyncClick}
          disabled={isLoading}
          className="h-8"
        >
          {isLoading ? 'Syncing...' : 'Sync Now'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
