
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LinkIcon, RefreshCw, Trash2 } from 'lucide-react';
import { FitnessProvider } from '@/hooks/useFitnessIntegration';

interface FitnessIntegrationsProps {
  providers: FitnessProvider[];
  onConnect: (providerId: string) => Promise<boolean>;
  onDisconnect: (providerId: string) => Promise<boolean>;
  onRefresh: (providerId: string) => Promise<boolean>;
}

const FitnessIntegrations: React.FC<FitnessIntegrationsProps> = ({
  providers,
  onConnect,
  onDisconnect,
  onRefresh
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Data Integrations</CardTitle>
        <CardDescription>
          Connect your health and fitness apps to sync your data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <div 
            key={provider.id} 
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="flex items-center space-x-3">
              {provider.logo && (
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                  <img 
                    src={provider.logo} 
                    alt={provider.name} 
                    className="h-6 w-6" 
                  />
                </div>
              )}
              <div>
                <h3 className="font-medium">{provider.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {provider.isConnected 
                    ? `Last synced: ${provider.lastSynced 
                        ? new Date(provider.lastSynced).toLocaleString() 
                        : 'Never'}`
                    : 'Not connected'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {provider.isConnected ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onRefresh(provider.id)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Sync
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDisconnect(provider.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onConnect(provider.id)}
                >
                  <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FitnessIntegrations;
