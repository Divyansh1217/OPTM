
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FitnessConnection } from '@/services/health';
import { RefreshCw, Check, AlertCircle, InfoIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GoogleFitConnect from '@/components/integrations/GoogleFitConnect';

interface HealthSyncProps {
  connections: FitnessConnection[];
  lastSyncTime: Date | null;
  onManualSync: () => Promise<void>;
  isSyncing: boolean;
  className?: string;
}

const HealthSync: React.FC<HealthSyncProps> = ({ 
  connections, 
  lastSyncTime, 
  onManualSync, 
  isSyncing,
  className 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    if (isSyncing) {
      setSyncStatus('syncing');
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          const increment = Math.random() * 15;
          const newValue = prev + increment;
          return newValue > 90 ? 90 : newValue; // Max at 90% until complete
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      // When sync is complete
      if (syncProgress > 0) {
        setSyncProgress(100);
        setSyncStatus('success');
        
        // Reset after showing complete
        const timeout = setTimeout(() => {
          setSyncProgress(0);
          setSyncStatus('idle');
        }, 2000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [isSyncing, syncProgress]);
  
  const handleSync = async () => {
    if (isRefreshing || isSyncing) return;
    
    setIsRefreshing(true);
    setSyncProgress(10); // Start progress at 10%
    setSyncStatus('syncing');
    
    try {
      await onManualSync();
      setSyncStatus('success');
      setSyncProgress(100);
    } catch (error) {
      console.error("Error during sync:", error);
      setSyncStatus('error');
    } finally {
      setIsRefreshing(false);
      
      // Reset after showing complete
      setTimeout(() => {
        if (syncStatus === 'success') {
          setSyncProgress(0);
          setSyncStatus('idle');
        }
      }, 2000);
    }
  };
  
  const formatDate = (date: Date | null): string => {
    if (!date) return 'Never';
    
    // Check if date is recent (within last 24 hours)
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      // For recent syncs, show relative time
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${Math.floor(diffHours)} hour${Math.floor(diffHours) !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  const hasConnectedProviders = connections.some(conn => conn.isConnected);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCw className="mr-2 h-5 w-5 text-primary/80" />
          Health Data Sync
        </CardTitle>
        <CardDescription>
          Manage your connected fitness providers and sync your health data in real-time.
        </CardDescription>
      </CardHeader>
      
      {syncStatus === 'syncing' && (
        <div className="px-6">
          <Progress value={syncProgress} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground text-center mb-4">
            Syncing your health data...
          </p>
        </div>
      )}
      
      {syncStatus === 'error' && (
        <div className="px-6 mb-4">
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error syncing your health data. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <CardContent className="grid gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium">Last Sync</p>
            {lastSyncTime && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {lastSyncTime && new Date().getTime() - lastSyncTime.getTime() < 5 * 60 * 1000 
                  ? 'Recent' 
                  : ''}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground flex items-center">
            {lastSyncTime ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                {formatDate(lastSyncTime)}
              </>
            ) : (
              <>
                <InfoIcon className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                Never synced
              </>
            )}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Connected Providers</p>
          {connections.length > 0 ? (
            <div className="space-y-2">
              {connections.map((connection) => (
                <div 
                  key={connection.id} 
                  className="flex justify-between items-center p-2 rounded-md border bg-card"
                >
                  <div className="flex items-center">
                    {connection.provider.toLowerCase().includes('google') && (
                      <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-blue-600">
                          <path 
                            fill="currentColor" 
                            d="M12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151ZM10.495 14.207C9.722 13.825 9.235 13.026 9.235 12.114C9.235 11.202 9.722 10.402 10.495 10.021C10.495 10.021 10.495 10.021 10.495 10.021V7.823C8.835 8.252 7.625 10.016 7.625 12.114C7.625 14.213 8.835 15.976 10.495 16.405V14.207C10.495 14.207 10.495 14.207 10.495 14.207ZM12.05 8.859C13.624 8.859 14.9 10.135 14.9 11.709C14.9 13.283 13.624 14.559 12.05 14.559C10.476 14.559 9.2 13.283 9.2 11.709C9.2 10.135 10.476 8.859 12.05 8.859ZM16.42 9.509L16.42 9.509V7.291C14.8 7.42 13.269 7.993 12 8.959C12.82 9.586 13.31 10.592 13.31 11.709C13.31 12.826 12.82 13.832 12 14.459C13.269 15.425 14.8 15.997 16.42 16.127V13.909C17.193 13.528 17.68 12.729 17.68 11.816C17.68 10.904 17.193 10.104 16.42 9.723L16.42 9.509ZM12.035 5.125C15.88 5.125 19 8.244 19 12.089C19 15.935 15.88 19.054 12.035 19.054C8.19 19.054 5.07 15.935 5.07 12.089C5.07 8.244 8.19 5.125 12.035 5.125Z" 
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{connection.provider}</p>
                      <p className="text-xs text-muted-foreground">
                        {connection.isConnected 
                          ? `Last synced: ${connection.lastSync ? formatDate(new Date(connection.lastSync)) : 'Never'}`
                          : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    {connection.isConnected ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Connected
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                        Disconnected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 border rounded-md bg-muted/20">
              <p className="text-sm text-muted-foreground mb-3">No providers connected</p>
              <GoogleFitConnect size="sm" variant="outline" />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        {!hasConnectedProviders ? (
          <GoogleFitConnect />
        ) : (
          <Button 
            onClick={handleSync} 
            disabled={isSyncing || isRefreshing}
            className="w-full"
          >
            <RefreshCw 
              className={`mr-2 h-4 w-4 ${(isSyncing || isRefreshing) ? 'animate-spin' : ''}`} 
              style={{animationDuration: (isSyncing || isRefreshing) ? '1s' : '0s'}} 
            />
            {isSyncing || isRefreshing ? 'Syncing Health Data...' : 'Sync Now'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HealthSync;
