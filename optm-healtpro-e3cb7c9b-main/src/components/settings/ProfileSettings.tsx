
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, MapPin, Phone } from 'lucide-react';

const ProfileSettings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved.",
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Profile Information</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Profile Photo</h3>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Change Photo</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
            <div className="relative">
              <Input id="firstName" defaultValue="John" className="pl-10 bg-white dark:bg-gray-900" />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
            <Input id="lastName" defaultValue="Doe" className="bg-white dark:bg-gray-900" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
            <div className="relative">
              <Input id="email" defaultValue="john.doe@example.com" className="pl-10 bg-white dark:bg-gray-900" />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
            <div className="relative">
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-10 bg-white dark:bg-gray-900" />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">Address</Label>
            <div className="relative">
              <Input id="address" defaultValue="123 Main St, Anytown, CA 12345" className="pl-10 bg-white dark:bg-gray-900" />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
