
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const ReportsPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                <p className="text-muted-foreground">
                  View and manage patient reports and clinical documentation
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <div className="border border-dashed rounded-lg py-12 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Report Dashboard</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      The reports dashboard will be implemented soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
