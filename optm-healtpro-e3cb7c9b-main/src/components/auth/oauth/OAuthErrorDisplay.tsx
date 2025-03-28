
import React, { useState } from 'react';
import { AlertTriangle, RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface OAuthErrorDisplayProps {
  error: string;
  errorDetails: string | null;
  debugInfo: Record<string, any>;
  onRetry: () => void;
  onReturnToLogin: () => void;
}

const OAuthErrorDisplay: React.FC<OAuthErrorDisplayProps> = ({
  error,
  errorDetails,
  debugInfo,
  onRetry,
  onReturnToLogin
}) => {
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  return (
    <div className="text-center space-y-6">
      <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
      
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-destructive">Authentication Error</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        {errorDetails && (
          <p className="text-muted-foreground text-sm">{errorDetails}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="text-left p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">Troubleshooting Steps:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Check your internet connection</li>
            <li>Clear your browser cookies and cache</li>
            <li>Disable any VPN or proxy services</li>
            <li>Try using a different browser</li>
            <li>Contact support if the issue persists</li>
          </ul>
        </div>
        
        <Collapsible 
          open={showDebugInfo} 
          onOpenChange={setShowDebugInfo}
          className="w-full border rounded-md"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-between w-full p-3 text-left font-normal"
            >
              <span>Technical Details</span>
              {showDebugInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="text-left text-xs space-y-2 font-mono bg-muted p-2 rounded">
              {Object.entries(debugInfo).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium min-w-24">{key}:</span>
                  <span className="text-muted-foreground">
                    {typeof value === 'object' 
                      ? JSON.stringify(value)
                      : String(value)
                    }
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button 
          variant="outline" 
          onClick={onReturnToLogin}
          className="flex-1"
        >
          Return to Login
        </Button>
        <Button 
          variant="default" 
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry Authentication
        </Button>
      </div>
    </div>
  );
};

export default OAuthErrorDisplay;
