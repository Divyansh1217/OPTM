
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useOAuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const { user, isLoading, handleOAuthCallback } = useAuth();
  const [searchParams] = useSearchParams();
  
  const provider = searchParams.get('provider') || 'google'; // Default to google if not specified
  const errorCode = searchParams.get('error') || null;
  const errorDescription = searchParams.get('error_description') || null;
  const code = searchParams.get('code') || '';

  const handleRetry = () => {
    setError(null);
    setErrorDetails(null);
    setRetryCount(0);
    setIsVerifying(true);
    // Force refresh the authorization
    window.location.href = '/login';
  };

  const checkAuthState = async () => {
    setIsVerifying(true);
      
    try {
      const callbackURL = window.location.href;
      const originURL = window.location.origin;
      
      // Collect debug info
      setDebugInfo({
        callbackURL,
        originURL,
        hasCode: !!code,
        provider,
        retryCount,
        hasUser: !!user,
        userRole: user?.role || 'none',
        isLoadingState: isLoading,
        searchParams: Object.fromEntries(searchParams.entries()),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      
      console.log(`OAuth callback processing: provider=${provider}, code exists=${!!code}, timestamp=${new Date().toISOString()}`);
      
      // First check if we already have a session
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("Checking for existing session:", sessionData?.session ? "Found" : "None");
      
      if (sessionData?.session) {
        console.log('Active session found, redirecting to dashboard');
        
        toast.success('Successfully signed in!');
        
        // Get the user's role from the session
        const { formatUser } = await import('@/contexts/auth/utils');
        const formattedUser = await formatUser(sessionData.session.user);
        
        if (formattedUser) {
          const dashboard = formattedUser.role === 'doctor' ? '/dashboard/doctor' : 
                            formattedUser.role === 'receptionist' ? '/dashboard/receptionist' : 
                            '/dashboard/patient';
                            
          navigate(dashboard, { replace: true });
          return;
        } else {
          navigate('/patient-dashboard', { replace: true }); // Default dashboard
          return;
        }
      }
      
      // Handle Google Fit connection callback separately
      // This is for Google Fit OAuth, not user authentication
      if (searchParams.has('connected') || searchParams.has('error')) {
        // This is a connection callback, not an auth callback
        console.log('Detected Google Fit connection callback');
        
        // Check if we should redirect to a specific page
        const redirectUrl = localStorage.getItem('healthAppRedirectUrl');
        
        if (redirectUrl) {
          console.log(`Redirecting to stored URL: ${redirectUrl}`);
          localStorage.removeItem('healthAppRedirectUrl');
          
          // Add the success or error parameter to the redirect URL
          const url = new URL(redirectUrl);
          
          if (searchParams.has('connected')) {
            url.searchParams.set('connected', 'true');
          }
          
          if (searchParams.has('error')) {
            url.searchParams.set('error', searchParams.get('error') || '');
          }
          
          navigate(url.toString(), { replace: true });
          return;
        }
        
        // If no redirect URL, go to health apps page
        navigate('/health-apps', { replace: true });
        return;
      }
      
      // Call the handler with the code from search params
      if (code) {
        console.log(`Found code parameter, calling handleOAuthCallback with provider: ${provider}`);
        try {
          await handleOAuthCallback(provider, code);
          
          // Give some time for session to be established
          console.log("OAuth callback processed, checking for session...");
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check again if we have a session after the callback
          const { data: updatedSession } = await supabase.auth.getSession();
          console.log("Session after callback:", updatedSession.session ? "Established" : "Not found");
          
          if (updatedSession.session) {
            console.log('Session established after OAuth callback, redirecting');
            toast.success('Successfully signed in!');
            
            // Get the user's role from the session
            const { formatUser } = await import('@/contexts/auth/utils');
            const formattedUser = await formatUser(updatedSession.session.user);
            
            if (formattedUser) {
              const dashboard = formattedUser.role === 'doctor' ? '/dashboard/doctor' : 
                                formattedUser.role === 'receptionist' ? '/dashboard/receptionist' : 
                                '/dashboard/patient';
                                
              navigate(dashboard, { replace: true });
              return;
            } else {
              navigate('/patient-dashboard', { replace: true }); // Default dashboard
              return;
            }
          } else if (retryCount < 2) {
            console.log(`No session found after callback, retry ${retryCount + 1}/3...`);
            setRetryCount(prev => prev + 1);
            // Try again after a delay
            setTimeout(() => checkAuthState(), 2000);
            return;
          } else {
            console.error("No session established after multiple retries");
            setError("Authentication could not be completed");
            setErrorDetails("No session was established. Please try again or contact support.");
          }
        } catch (callbackError: any) {
          console.error('Error in handleOAuthCallback:', callbackError);
          setError('Authentication process failed');
          setErrorDetails(callbackError.message || 'Unknown error processing the authentication callback');
        }
      } else {
        console.error('No authorization code found in URL');
        setError('Authentication failed');
        setErrorDetails('No authorization code received from the provider');
      }
    } catch (err: any) {
      console.error('OAuth callback processing error:', err);
      setError('Authentication process failed');
      setErrorDetails(err.message || 'An unexpected error occurred');
      toast.error('Authentication failed');
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    console.log('OAuthCallback component initialized');
    console.log('Search params:', Object.fromEntries(searchParams.entries()));
    console.log('Auth state:', { user, isLoading });

    // Handle direct error parameters from OAuth provider
    if (errorCode) {
      console.error('OAuth provider error:', errorCode, errorDescription);
      setError(`Authentication error from ${provider}`);
      setErrorDetails(errorDescription || 'Please try again or use another sign-in method');
      toast.error(`${provider} authentication failed`);
      setIsVerifying(false);
      return;
    }

    // Only run the auth check if we don't already have an error
    if (!error) {
      // Start auth check process
      checkAuthState();
    }
    
    // Fallback redirect in case something goes wrong
    const fallbackTimer = setTimeout(() => {
      if (isVerifying && !error && retryCount >= 2) {
        console.log("Fallback redirect triggered - authentication is taking too long");
        setError("Authentication timeout");
        setErrorDetails("The authentication process took too long. Please try again.");
        toast.error("Authentication took too long to complete");
      }
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, [retryCount]);

  return {
    error,
    errorDetails,
    isVerifying,
    debugInfo,
    retryCount,
    handleRetry,
    navigate
  };
};
