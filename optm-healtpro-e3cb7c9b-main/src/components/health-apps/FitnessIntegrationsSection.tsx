
import React from 'react';
import FitnessIntegrations from '@/components/dashboard/FitnessIntegrations';

interface FitnessIntegrationsSectionProps {
  providers: any[];
  handleConnect: (providerId: string) => Promise<boolean>;
  handleDisconnect: (providerId: string) => Promise<boolean>;
  handleRefresh: (providerId: string) => Promise<boolean>;
}

const FitnessIntegrationsSection: React.FC<FitnessIntegrationsSectionProps> = ({
  providers,
  handleConnect,
  handleDisconnect,
  handleRefresh
}) => {
  return (
    <div className="lg:col-span-8">
      <FitnessIntegrations 
        providers={providers}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default FitnessIntegrationsSection;
