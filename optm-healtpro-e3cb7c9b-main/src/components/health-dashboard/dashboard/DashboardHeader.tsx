
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import GoogleFitConnect from '@/components/integrations/GoogleFitConnect';

interface DashboardHeaderProps {
  hasGoogleFitConnected: boolean;
  isSyncing: boolean;
  onSyncClick: () => Promise<void>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  hasGoogleFitConnected,
  isSyncing,
  onSyncClick
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold">Health Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Track and monitor your health metrics from Google Fit
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {hasGoogleFitConnected ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSyncClick}
            disabled={isSyncing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        ) : (
          <GoogleFitConnect size="sm" />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
