
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OAuthLoadingStateProps {
  isVerifying: boolean;
  retryCount: number;
}

const OAuthLoadingState: React.FC<OAuthLoadingStateProps> = ({ isVerifying, retryCount }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing authentication...');

  // Update the progress and status message as authentication proceeds
  useEffect(() => {
    const messages = [
      'Initializing authentication...',
      'Verifying credentials...',
      'Processing login information...',
      'Preparing your dashboard...'
    ];
    
    // Increase progress based on retry count
    const baseProgress = 25 * (retryCount + 1);
    
    // Set initial progress
    setProgress(baseProgress > 10 ? baseProgress : 10);
    
    // Update status message based on progress
    if (retryCount < messages.length) {
      setStatusMessage(messages[retryCount]);
    }
    
    // Simulate progress increasing
    const interval = setInterval(() => {
      setProgress(prev => {
        // Max progress caps at 95% until fully complete
        const nextProgress = prev + 1;
        if (nextProgress >= 95) {
          clearInterval(interval);
          return 95;
        }
        return nextProgress;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [retryCount, isVerifying]);

  return (
    <div className="text-center space-y-6">
      <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Processing Your Login</h2>
        <p className="text-muted-foreground">Please wait while we authenticate your account...</p>
      </div>
      
      <div className="space-y-2 w-full">
        <Progress value={progress} className="h-2 w-full" />
        <p className="text-sm text-primary font-medium">{statusMessage}</p>
      </div>
      
      {retryCount > 0 && (
        <p className="text-amber-500 mt-2 text-sm">
          Still working on it... Attempt {retryCount}/3
        </p>
      )}
    </div>
  );
};

export default OAuthLoadingState;
