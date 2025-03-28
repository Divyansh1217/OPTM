
import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AccessDeniedProps {
  title?: string;
  description?: string;
  redirectPath?: string;
  redirectLabel?: string;
  showHomeButton?: boolean;
}

export function AccessDenied({
  title = "Access Denied",
  description = "You don't have permission to access this resource",
  redirectPath,
  redirectLabel,
  showHomeButton = true
}: AccessDeniedProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="pb-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl text-destructive">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center gap-2 text-sm p-3 bg-amber-50 dark:bg-yellow-900/20 text-amber-800 dark:text-amber-400 rounded-md">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <p>If you believe this is a mistake, please contact your system administrator.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          {showHomeButton && (
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          )}
          {redirectPath && (
            <Button 
              className="w-full sm:w-auto"
              onClick={() => navigate(redirectPath)}
            >
              {redirectLabel || 'Go Back'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default AccessDenied;
