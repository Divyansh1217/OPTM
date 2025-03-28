
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Layout, LayoutGrid, GalleryVertical, Columns, Rows, Save } from 'lucide-react';

const DashboardSettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Dashboard Settings Saved",
      description: "Your dashboard layout preferences have been updated.",
    });
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Dashboard Customization</h2>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Layout Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 border-primary bg-primary/5">
              <Layout className="h-5 w-5 text-primary" />
              <span className="text-sm">Default</span>
            </button>
            
            <button className="border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5">
              <LayoutGrid className="h-5 w-5" />
              <span className="text-sm">Grid</span>
            </button>
            
            <button className="border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5">
              <Columns className="h-5 w-5" />
              <span className="text-sm">Columns</span>
            </button>
            
            <button className="border rounded-lg p-3 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5">
              <Rows className="h-5 w-5" />
              <span className="text-sm">Rows</span>
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Widget Visibility</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-health-metrics" className="cursor-pointer">Health Metrics</Label>
              <Switch id="show-health-metrics" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-appointments" className="cursor-pointer">Upcoming Appointments</Label>
              <Switch id="show-appointments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-treatment" className="cursor-pointer">Treatment Plan</Label>
              <Switch id="show-treatment" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-activity" className="cursor-pointer">Activity Tracker</Label>
              <Switch id="show-activity" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-documents" className="cursor-pointer">Medical Documents</Label>
              <Switch id="show-documents" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-symptoms" className="cursor-pointer">Symptom Tracker</Label>
              <Switch id="show-symptoms" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Display Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-welcome" className="cursor-pointer">Show Welcome Message</Label>
              <Switch id="show-welcome" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-view" className="cursor-pointer">Compact View</Label>
              <Switch id="compact-view" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-app-sync" className="cursor-pointer">Show Health App Sync Button</Label>
              <Switch id="show-app-sync" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Layout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
