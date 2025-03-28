
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bell, Mail, MessageCircle, Settings, Lock } from 'lucide-react';

const HelpSettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Help Settings Saved",
      description: "Your help and support preferences have been updated.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Help & Support Settings</h2>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              Support Notification Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="cursor-pointer">SMS Notifications</Label>
                <Switch id="sms-notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="in-app-notifications" className="cursor-pointer">In-App Notifications</Label>
                <Switch id="in-app-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="support-updates" className="cursor-pointer">Support Ticket Updates</Label>
                <Switch id="support-updates" defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Privacy Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="share-session" className="cursor-pointer">Allow support to view your account</Label>
                <Switch id="share-session" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="collect-feedback" className="cursor-pointer">Send anonymous usage data to improve help</Label>
                <Switch id="collect-feedback" defaultChecked />
              </div>
              
              <div className="text-sm text-muted-foreground mt-2">
                These permissions help our support team assist you better but can be toggled off at any time.
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              Help Center Preferences
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default Help Tab</Label>
                  <Select defaultValue="getStarted">
                    <SelectTrigger id="default-view" className="max-w-xs">
                      <SelectValue placeholder="Select default tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="getStarted">Getting Started</SelectItem>
                      <SelectItem value="faq">FAQs</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Help Content Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language" className="max-w-xs">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              Support Channel Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="preferred-channel" className="w-40">Preferred Contact Method</Label>
                <Select defaultValue="email">
                  <SelectTrigger id="preferred-channel" className="flex-1 max-w-xs">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="chat">Live Chat</SelectItem>
                    <SelectItem value="ticket">Support Ticket Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="contact-hours" className="w-40">Preferred Contact Hours</Label>
                <Select defaultValue="business">
                  <SelectTrigger id="contact-hours" className="flex-1 max-w-xs">
                    <SelectValue placeholder="Select contact hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business Hours (9AM-5PM)</SelectItem>
                    <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM-9PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="pt-2 flex justify-end">
            <Button onClick={handleSave}>
              <Mail className="mr-2 h-4 w-4" />
              Save Support Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSettings;
