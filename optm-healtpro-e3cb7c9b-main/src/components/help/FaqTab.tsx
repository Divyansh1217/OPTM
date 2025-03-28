
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FaqTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Quick answers to common questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b pb-3">
          <h3 className="font-medium mb-1">How do I reset my password?</h3>
          <p className="text-sm text-muted-foreground">
            You can reset your password by clicking "Forgot Password" on the login screen.
          </p>
        </div>
        <div className="border-b pb-3">
          <h3 className="font-medium mb-1">How do I connect my fitness tracker?</h3>
          <p className="text-sm text-muted-foreground">
            Go to the Health Apps section and follow the instructions to connect your device.
          </p>
        </div>
        <div className="border-b pb-3">
          <h3 className="font-medium mb-1">Can I export my health data?</h3>
          <p className="text-sm text-muted-foreground">
            Yes, you can export your data in the Settings &gt; Privacy section.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaqTab;
