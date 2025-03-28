
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { PatientAnalysisReport } from '@/components/analysis';
import { Card } from '@/components/ui/card';

const AnalysisPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Patient Analysis</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of patient progress and metrics
              </p>
            </div>
            
            <PatientAnalysisReport />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AnalysisPage;
