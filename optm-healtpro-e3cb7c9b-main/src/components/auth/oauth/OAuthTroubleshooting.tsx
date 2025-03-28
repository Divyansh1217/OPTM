
import React from 'react';
import { HelpCircle } from 'lucide-react';

const OAuthTroubleshooting: React.FC = () => {
  return (
    <div className="mt-4 text-left">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Troubleshooting Tips</h3>
      </div>
      <ul className="text-xs text-muted-foreground space-y-1">
        <li>• Make sure cookies are enabled in your browser</li>
        <li>• Try signing in with a different method</li>
        <li>• Clear your browser cache and cookies</li>
        <li>• Disable browser extensions that might block authentication</li>
        <li>• Check your internet connection</li>
      </ul>
    </div>
  );
};

export default OAuthTroubleshooting;
