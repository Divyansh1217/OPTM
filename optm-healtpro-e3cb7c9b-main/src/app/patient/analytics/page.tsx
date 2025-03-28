
import React from 'react';
import PatientAnalyticsPage from '@/components/exercises/motion-tracking/PatientAnalyticsPage';

export default function PatientAnalytics() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Movement Analytics</h1>
      <p className="text-muted-foreground">
        Your comprehensive analytics dashboard showing insights from your movement tracking sessions.
      </p>
      
      <PatientAnalyticsPage />
    </div>
  );
}
