
import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface HealthSyncButtonProps {
  hasConnectedApps: boolean;
  onSyncData: () => Promise<void>;
  lastSyncTime?: Date | null;
  className?: string;
}

const HealthSyncButton: React.FC<HealthSyncButtonProps> = ({
  hasConnectedApps,
  onSyncData,
  lastSyncTime,
  className
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [timeSinceLastSync, setTimeSinceLastSync] = useState<string>('');
  
  // Update the time since last sync every minute
  useEffect(() => {
    if (!lastSyncTime) {
      setTimeSinceLastSync('Never synced');
      return;
    }
    
    const updateTimeSinceLastSync = () => {
      const now = new Date();
      const diff = now.getTime() - lastSyncTime.getTime();
      const diffMinutes = Math.floor(diff / (1000 * 60));
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffDays > 0) {
        setTimeSinceLastSync(`${diffDays} day${diffDays !== 1 ? 's' : ''} ago`);
      } else if (diffHours > 0) {
        setTimeSinceLastSync(`${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`);
      } else if (diffMinutes > 0) {
        setTimeSinceLastSync(`${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`);
      } else {
        setTimeSinceLastSync('Just now');
      }
    };
    
    updateTimeSinceLastSync();
    const intervalId = setInterval(updateTimeSinceLastSync, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, [lastSyncTime]);
  
  if (!hasConnectedApps) return null;
  
  const handleSyncClick = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncState('syncing');
    try {
      await onSyncData();
      setSyncState('success');
      toast.success("Health data synced successfully!", {
        description: "Your latest health data from Google Fit has been updated.",
        duration: 3000
      });
      
      // Reset to idle after 2 seconds
      setTimeout(() => {
        setSyncState('idle');
      }, 2000);
    } catch (error) {
      console.error('Error syncing health data:', error);
      setSyncState('error');
      toast.error("There was an error syncing your health data", {
        description: "Please check your connection and try again.",
        duration: 5000
      });
      
      // Reset to idle after 3 seconds on error
      setTimeout(() => {
        setSyncState('idle');
      }, 3000);
    } finally {
      setIsSyncing(false);
    }
  };
  
  return (
    <div className={cn("flex justify-end mb-2", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "text-xs gap-1.5 relative",
                syncState === 'success' && "border-green-500 text-green-600",
                syncState === 'error' && "border-red-500 text-red-600"
              )}
              onClick={handleSyncClick}
              disabled={isSyncing}
            >
              {syncState === 'syncing' ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Syncing health data...
                </>
              ) : syncState === 'success' ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Sync Complete
                </>
              ) : syncState === 'error' ? (
                <>
                  <AlertCircle className="h-3.5 w-3.5" />
                  Sync Failed
                </>
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Sync Google Fit Data
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {lastSyncTime 
              ? `Last synced: ${timeSinceLastSync}` 
              : "Your health data has never been synced. Click to sync now."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HealthSyncButton;
