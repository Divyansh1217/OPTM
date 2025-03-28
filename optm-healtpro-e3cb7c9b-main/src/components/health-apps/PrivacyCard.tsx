
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PrivacyCard: React.FC = () => {
  return (
    <div className="glass-morphism rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Health Data Privacy</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Your health data is secure and only accessible to you and your healthcare providers. 
        We adhere to strict privacy regulations and use encryption to protect your information.
      </p>
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <Check className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-xs">
            <span className="font-medium">End-to-end encryption</span> - Your data is encrypted during transmission and storage
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <Check className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-xs">
            <span className="font-medium">OAuth 2.0</span> - Secure authentication without sharing your passwords
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <Check className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-xs">
            <span className="font-medium">HIPAA compliance</span> - We follow healthcare data protection standards
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <Check className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-xs">
            <span className="font-medium">Data minimization</span> - We only collect what's necessary for your care
          </p>
        </div>
      </div>
      <Button className="w-full mt-4" variant="outline" size="sm">
        Privacy Settings
      </Button>
    </div>
  );
};

export default PrivacyCard;
