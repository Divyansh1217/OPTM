
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, Key, Fingerprint, Smartphone, Lock } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleChangePassword = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security preferences have been updated.",
    });
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Change Password</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <div className="pt-2">
              <Button onClick={handleChangePassword} className="w-full sm:w-auto">
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-2fa" className="cursor-pointer">Enable Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch id="enable-2fa" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number for 2FA</Label>
              <div className="relative">
                <Input id="phone-number" defaultValue="+1 (555) 123-4567" className="pl-10" />
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Security Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-primary" />
                <Label htmlFor="biometric-login" className="cursor-pointer">Biometric Login</Label>
              </div>
              <Switch id="biometric-login" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <Label htmlFor="auto-logout" className="cursor-pointer">Auto Logout (after 30 minutes)</Label>
              </div>
              <Switch id="auto-logout" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <Label htmlFor="remember-devices" className="cursor-pointer">Remember Trusted Devices</Label>
              </div>
              <Switch id="remember-devices" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <Button onClick={handleSave}>
            <Shield className="mr-2 h-4 w-4" />
            Save Security Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
