
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/contexts/auth';
import HealthDashboard from '@/components/health-dashboard/HealthDashboard';

const HealthDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 overflow-container">
          <HealthDashboard className="max-w-7xl mx-auto" />
        </main>
      </div>
    </div>
  );
};

export default HealthDashboardPage;
