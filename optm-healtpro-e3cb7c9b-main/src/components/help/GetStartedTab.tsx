
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GetStartedTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>Learn how to navigate your health dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our dashboard provides a comprehensive view of your health metrics, appointments, and treatment plans.
          </p>
          <Button variant="outline" className="w-full">View Guide</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Connecting Health Apps</CardTitle>
          <CardDescription>Integrate with your favorite fitness trackers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Sync data from Google Fit, Apple Health, and other fitness apps to get the most out of your health dashboard.
          </p>
          <Button variant="outline" className="w-full">View Guide</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStartedTab;
