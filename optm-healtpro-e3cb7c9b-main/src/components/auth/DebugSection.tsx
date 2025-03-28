
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DebugSectionProps {
  showDebug: boolean;
  setShowDebug: (show: boolean) => void;
}

const DebugSection: React.FC<DebugSectionProps> = ({ showDebug, setShowDebug }) => {
  return (
    <div className="mt-8 border-t border-gray-200 pt-4">
      <Button
        variant="ghost"
        className="text-xs flex items-center text-muted-foreground"
        onClick={() => setShowDebug(!showDebug)}
      >
        <AlertTriangle className="h-3 w-3 mr-1" />
        {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
      </Button>
      
      {showDebug && (
        <div className="bg-muted p-4 rounded-md mt-2 text-left">
          <p className="text-xs text-muted-foreground">Debug Information:</p>
          <ul className="text-xs list-disc pl-4 mt-1 space-y-1">
            <li>Current environment: {import.meta.env.MODE}</li>
            <li>Auth provider: Supabase</li>
            <li>Callback URL: {window.location.origin}/oauth-callback</li>
            <li>User agent: {navigator.userAgent}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DebugSection;
