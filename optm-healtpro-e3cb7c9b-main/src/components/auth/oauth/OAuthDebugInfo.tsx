
import React from 'react';
import { Code } from 'lucide-react';

interface OAuthDebugInfoProps {
  debugInfo: Record<string, any>;
}

const OAuthDebugInfo: React.FC<OAuthDebugInfoProps> = ({ debugInfo }) => {
  // Only show this component in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="mt-6 text-left">
      <div className="flex items-center gap-2 mb-2">
        <Code className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Debug Information</h3>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs font-mono overflow-x-auto max-h-32 scrollbar-thin scrollbar-thumb-gray-400">
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OAuthDebugInfo;
