
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import GoogleFitConnect from '@/components/integrations/GoogleFitConnect';

const ConnectPrompt: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Connect Your Health Data</CardTitle>
        <CardDescription>
          Connect your Google Fit account to view your health metrics and activity data.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="text-center mb-6">
          <p className="text-muted-foreground mb-4">
            Get insights from your fitness tracking devices and apps by connecting your Google Fit account.
            Your data is securely stored and will be visible only to you and your healthcare providers.
          </p>
          <GoogleFitConnect 
            variant="default" 
            size="default"
            className="mx-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectPrompt;
