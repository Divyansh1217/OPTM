
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AnalyticsTab from '@/pages/dashboard/components/tabs/AnalyticsTab';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                  View patient analytics and clinical outcomes data
                </p>
              </div>
              
              <AnalyticsTab />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
