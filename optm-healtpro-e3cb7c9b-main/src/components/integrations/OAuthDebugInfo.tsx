
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface OAuthDebugInfoProps {
  isVisible: boolean;
  supabaseUrl?: string;
  redirectUri?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const OAuthDebugInfo: React.FC<OAuthDebugInfoProps> = ({
  isVisible,
  supabaseUrl,
  redirectUri,
  onRefresh,
  isLoading = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  if (!isVisible) return null;
  
  return (
    <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <CardTitle className="text-base text-amber-700 dark:text-amber-300">OAuth Connection Diagnostics</CardTitle>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onRefresh}
            disabled={isLoading}
            className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" /> 
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> 
                Refresh Status
              </>
            )}
          </Button>
        </div>
        <CardDescription className="text-amber-600 dark:text-amber-400">
          Troubleshooting information for Google Fit OAuth connection
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-amber-700 dark:text-amber-300">Supabase URL:</span>
            <Badge variant="outline" className="font-mono text-xs border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300">
              {supabaseUrl || 'Not configured'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-amber-700 dark:text-amber-300">Redirect URI:</span>
            <Badge variant="outline" className="font-mono text-xs border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300">
              {redirectUri || 'Not configured'}
            </Badge>
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="pt-2">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex w-full justify-between items-center text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900"
              >
                <span>Troubleshooting Steps</span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <ul className="space-y-2 list-disc pl-5 text-sm text-amber-700 dark:text-amber-300">
                <li>Check that Google OAuth credentials are correctly set in Supabase functions</li>
                <li>Verify Google API Console has the correct redirect URI configured</li>
                <li>Ensure the OAuth consent screen is published in Google Cloud Console</li>
                <li>Check that required Google Fit APIs are enabled in Google Cloud Console</li>
                <li>Clear browser cookies and cache, then try again</li>
                <li>Try using a different browser if the issue persists</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default OAuthDebugInfo;
