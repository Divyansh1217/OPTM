
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bell, Calendar, FileText, Pill, MessageSquare } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <Label htmlFor="email-appointments" className="cursor-pointer">Appointment Reminders</Label>
              </div>
              <Switch id="email-appointments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <Label htmlFor="email-reports" className="cursor-pointer">New Medical Reports</Label>
              </div>
              <Switch id="email-reports" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" />
                <Label htmlFor="email-medication" className="cursor-pointer">Medication Reminders</Label>
              </div>
              <Switch id="email-medication" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <Label htmlFor="email-messages" className="cursor-pointer">Doctor Messages</Label>
              </div>
              <Switch id="email-messages" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Push Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <Label htmlFor="push-appointments" className="cursor-pointer">Appointment Reminders</Label>
              </div>
              <Switch id="push-appointments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <Label htmlFor="push-reports" className="cursor-pointer">New Medical Reports</Label>
              </div>
              <Switch id="push-reports" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" />
                <Label htmlFor="push-medication" className="cursor-pointer">Medication Reminders</Label>
              </div>
              <Switch id="push-medication" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <Label htmlFor="push-messages" className="cursor-pointer">Doctor Messages</Label>
              </div>
              <Switch id="push-messages" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Notification Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="quiet-hours" className="cursor-pointer">Enable Quiet Hours</Label>
              <Switch id="quiet-hours" />
            </div>
            <p className="text-sm text-muted-foreground">
              Quiet hours will silence notifications between 10:00 PM and 7:00 AM
            </p>
          </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <Button onClick={handleSave}>
            <Bell className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
