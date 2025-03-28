
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <div className="mb-6 pl-10 lg:pl-0">
      <h1 className="text-2xl font-bold">My Health Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Welcome back, {userName}
      </p>
    </div>
  );
};

export default DashboardHeader;
