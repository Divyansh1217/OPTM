
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSupportTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
        <CardDescription>Get help from our support team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input placeholder="Your email" type="email" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Input placeholder="Subject of your inquiry" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea 
              className="min-h-[120px]"
              placeholder="Describe your issue or question"
            />
          </div>
          <Button className="w-full">Submit Support Request</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSupportTab;
