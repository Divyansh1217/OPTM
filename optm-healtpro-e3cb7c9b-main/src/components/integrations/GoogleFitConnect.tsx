
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Loader2 } from 'lucide-react';

interface GoogleFitConnectProps {
  onConnected?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

// Google icon component
const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
  >
    <path 
      fill="currentColor" 
      d="M12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151ZM10.495 14.207C9.722 13.825 9.235 13.026 9.235 12.114C9.235 11.202 9.722 10.402 10.495 10.021C10.495 10.021 10.495 10.021 10.495 10.021V7.823C8.835 8.252 7.625 10.016 7.625 12.114C7.625 14.213 8.835 15.976 10.495 16.405V14.207C10.495 14.207 10.495 14.207 10.495 14.207ZM12.05 8.859C13.624 8.859 14.9 10.135 14.9 11.709C14.9 13.283 13.624 14.559 12.05 14.559C10.476 14.559 9.2 13.283 9.2 11.709C9.2 10.135 10.476 8.859 12.05 8.859ZM16.42 9.509L16.42 9.509V7.291C14.8 7.42 13.269 7.993 12 8.959C12.82 9.586 13.31 10.592 13.31 11.709C13.31 12.826 12.82 13.832 12 14.459C13.269 15.425 14.8 15.997 16.42 16.127V13.909C17.193 13.528 17.68 12.729 17.68 11.816C17.68 10.904 17.193 10.104 16.42 9.723L16.42 9.509ZM12.035 5.125C15.88 5.125 19 8.244 19 12.089C19 15.935 15.88 19.054 12.035 19.054C8.19 19.054 5.07 15.935 5.07 12.089C5.07 8.244 8.19 5.125 12.035 5.125Z" 
    />
  </svg>
);

export const GoogleFitConnect: React.FC<GoogleFitConnectProps> = ({
  onConnected,
  className,
  variant = 'default',
  size = 'default'
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStatus, setConnectStatus] = useState<'idle' | 'connecting' | 'retrying'>('idle');
  const { user } = useAuth();
  
  // Check for OAuth callback params
  useEffect(() => {
    const checkOAuthResult = async () => {
      const url = new URL(window.location.href);
      const connected = url.searchParams.get('connected');
      const error = url.searchParams.get('error');
      
      // Handle connection status and errors from URL parameters
      if (connected === 'true' && user) {
        toast.success("Google Fit connected successfully!", {
          description: "Your health data will now sync automatically."
        });
        
        if (onConnected) {
          onConnected();
        }
        
        // Clean URL parameters
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
      
      if (error) {
        toast.error("Failed to connect Google Fit", {
          description: decodeURIComponent(error)
        });
        
        // Clean URL parameters
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    };
    
    checkOAuthResult();
  }, [user, onConnected]);

  const handleConnectGoogleFit = async () => {
    if (!user) {
      toast.error("You must be logged in to connect Google Fit", {
        description: "Please log in to connect your Google Fit account."
      });
      return;
    }

    // For demo users, simulate connection
    if (user.id?.startsWith('demo-')) {
      setIsConnecting(true);
      setConnectStatus('connecting');
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      toast.success("Demo Google Fit connected successfully", {
        description: "This is a simulated connection for the demo account."
      });
      
      if (onConnected) {
        onConnected();
      }
      
      setIsConnecting(false);
      setConnectStatus('idle');
      return;
    }

    setIsConnecting(true);
    setConnectStatus('connecting');
    
    try {
      // Store current URL in localStorage to redirect back after auth
      localStorage.setItem('healthAppRedirectUrl', window.location.href);
      localStorage.setItem('googleFitConnectTime', Date.now().toString());
      
      // Check if the current user has a session
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast.error("Authentication session expired", {
          description: "Please sign in again to connect Google Fit."
        });
        setIsConnecting(false);
        setConnectStatus('idle');
        return;
      }
      
      // Get the Supabase URL from environment variable or use the default
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://evqbnxbeimcacqkgdola.supabase.co";
      const functionUrl = `${supabaseUrl}/functions/v1/connect-google-fit`;
      
      console.log(`Initiating Google Fit connection for user: ${user.id}`);
      
      // Show toast notification that we're redirecting
      toast.info("Redirecting to Google login...", {
        description: "You'll be taken to Google to authorize access to your fitness data."
      });
      
      // For better UX, directly navigate to the OAuth URL
      window.location.href = `${functionUrl}?userId=${user.id}`;
      
    } catch (error) {
      console.error('Error connecting to Google Fit:', error);
      setConnectStatus('retrying');
      
      toast.error("Failed to connect to Google Fit", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
      
      // Wait 2 seconds and retry once automatically
      setTimeout(async () => {
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://evqbnxbeimcacqkgdola.supabase.co";
          const functionUrl = `${supabaseUrl}/functions/v1/connect-google-fit`;
          
          toast.info("Retrying connection to Google Fit...");
          window.location.href = `${functionUrl}?userId=${user.id}`;
        } catch (retryError) {
          console.error('Error retrying Google Fit connection:', retryError);
          toast.error("Failed to connect to Google Fit. Please try again.", {
            description: "There was a problem connecting to Google Fit. Check your network connection and try again."
          });
          setIsConnecting(false);
          setConnectStatus('idle');
        }
      }, 2000);
    }
  };

  return (
    <Button
      onClick={handleConnectGoogleFit}
      disabled={isConnecting}
      className={className}
      variant={variant}
      size={size}
    >
      {isConnecting ? (
        <>
          {connectStatus === 'connecting' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting to Google Fit...
            </>
          ) : (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retrying connection...
            </>
          )}
        </>
      ) : (
        <>
          <GoogleIcon className="mr-2 h-4 w-4" />
          Connect Google Fit
        </>
      )}
    </Button>
  );
};

export default GoogleFitConnect;
