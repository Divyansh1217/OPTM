
import React from 'react';
import { useAuth } from '@/contexts/auth';

const SettingsHeader: React.FC = () => {
  const { user } = useAuth();
  // Safe way to extract username without relying on user_metadata
  const userName = user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="mb-6 pl-10 lg:pl-0">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Customize your experience, {userName}
      </p>
    </div>
  );
};

export default SettingsHeader;
