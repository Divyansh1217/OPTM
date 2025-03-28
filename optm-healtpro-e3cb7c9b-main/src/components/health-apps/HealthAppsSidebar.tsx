
import React from 'react';
import PrivacyCard from './PrivacyCard';
import SupportedDevicesCard from './SupportedDevicesCard';

const HealthAppsSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-4">
      <PrivacyCard />
      <SupportedDevicesCard />
    </div>
  );
};

export default HealthAppsSidebar;
