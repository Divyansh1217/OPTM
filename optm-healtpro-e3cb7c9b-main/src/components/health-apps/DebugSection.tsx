
import React from 'react';
import { Button } from '@/components/ui/button';
import OAuthDebugInfo from '@/components/integrations/OAuthDebugInfo';

interface DebugSectionProps {
  showDebugInfo: boolean;
  setShowDebugInfo: (show: boolean) => void;
  isCheckingConnection: boolean;
  handleCheckConnection: () => Promise<void>;
}

const DebugSection: React.FC<DebugSectionProps> = ({
  showDebugInfo,
  setShowDebugInfo,
  isCheckingConnection,
  handleCheckConnection
}) => {
  if (!showDebugInfo) {
    return null;
  }
  
  return (
    <OAuthDebugInfo 
      isVisible={showDebugInfo}
      supabaseUrl={import.meta.env.VITE_SUPABASE_URL}
      redirectUri={`${import.meta.env.VITE_SUPABASE_URL || "https://evqbnxbeimcacqkgdola.supabase.co"}/functions/v1/google-fit-callback`}
      onRefresh={handleCheckConnection}
      isLoading={isCheckingConnection}
    />
  );
};

export default DebugSection;
