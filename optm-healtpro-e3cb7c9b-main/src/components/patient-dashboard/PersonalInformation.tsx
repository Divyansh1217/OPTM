import React from 'react';
import { useAuth } from '@/contexts/auth';

interface PersonalInformationProps {
  className?: string;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ className }) => {
  const { user } = useAuth();
  
  return (
    <div className={`glass-morphism rounded-2xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-medium">{user?.name || 'Alex Johnson'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Age:</span>
          <span className="font-medium">32 years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Weight:</span>
          <span className="font-medium">175 lbs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Height:</span>
          <span className="font-medium">5'10"</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Blood Type:</span>
          <span className="font-medium">O+</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Primary Doctor:</span>
          <span className="font-medium">Dr. Nikolas Pascal</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
