
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Smartphone, Watch, Activity, Heart, Dumbbell, Bluetooth } from 'lucide-react';

const IntegrationSettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleConnect = (service: string) => {
    toast({
      title: `Connect to ${service}`,
      description: `Starting connection to ${service}...`,
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Integration Settings Saved",
      description: "Your connected health apps and devices have been updated.",
    });
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Health App Integrations</h2>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Connected Health Apps</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Apple Health</p>
                  <p className="text-xs text-muted-foreground">Last synced: 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="apple-health" defaultChecked />
                <Button variant="ghost" size="sm" onClick={() => handleConnect('Apple Health')}>Sync</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium">Google Fit</p>
                  <p className="text-xs text-muted-foreground">Not connected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="google-fit" />
                <Button variant="outline" size="sm" onClick={() => handleConnect('Google Fit')}>Connect</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-violet-100 p-2 rounded-full">
                  <Dumbbell className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-medium">Fitness Coach</p>
                  <p className="text-xs text-muted-foreground">Last synced: 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="fitness-coach" defaultChecked />
                <Button variant="ghost" size="sm" onClick={() => handleConnect('Fitness Coach')}>Sync</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Connected Devices</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Watch className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Apple Watch</p>
                  <p className="text-xs text-muted-foreground">Connected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="apple-watch" defaultChecked />
                <Button variant="ghost" size="sm">Disconnect</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Bluetooth className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Smart Scale</p>
                  <p className="text-xs text-muted-foreground">Not connected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="smart-scale" />
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Data Sharing Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="share-activity" className="cursor-pointer">Share Activity Data</Label>
              <Switch id="share-activity" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="share-vitals" className="cursor-pointer">Share Vital Signs</Label>
              <Switch id="share-vitals" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="share-sleep" className="cursor-pointer">Share Sleep Data</Label>
              <Switch id="share-sleep" defaultChecked />
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              These settings control what data is shared with your healthcare provider.
            </p>
          </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <Button onClick={handleSave}>
            <Smartphone className="mr-2 h-4 w-4" />
            Save Integration Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
