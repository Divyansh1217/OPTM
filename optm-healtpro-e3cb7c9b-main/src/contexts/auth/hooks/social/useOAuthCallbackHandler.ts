
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { formatUser } from '../../utils';
import { User } from '../../types';

type UseOAuthCallbackHandlerProps = {
  setIsLoading: (isLoading: boolean) => void;
  navigate: (path: string) => void;
};

export const useOAuthCallbackHandler = ({ setIsLoading, navigate }: UseOAuthCallbackHandlerProps) => {
  const handleOAuthCallback = async (provider: string, code: string, currentUser: User | null): Promise<void> => {
    setIsLoading(true);
    
    try {
      console.log(`Processing OAuth callback for ${provider} with code: ${code ? 'provided' : 'missing'}`);
      
      if (!code) {
        console.error('No authorization code provided');
        toast.error('Authentication failed: No authorization code provided');
        throw new Error('No authorization code provided');
      }
      
      // Get the session from URL parameters (Supabase handles this automatically)
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        toast.error(`Authentication failed: ${error.message}`);
        throw error;
      }
      
      // If we have a session, format the user
      if (data.session) {
        console.log('Session found in callback, formatting user');
        const user = await formatUser(data.session.user);
        
        if (user) {
          console.log(`User successfully authenticated: ${user.email} (${user.role})`);
          toast.success('Successfully signed in!');
          
          // Navigate to the appropriate dashboard based on user role
          const dashboard = user.role === 'doctor' ? '/dashboard/doctor' : 
                            user.role === 'receptionist' ? '/dashboard/receptionist' : 
                            '/dashboard/patient';
                            
          setTimeout(() => navigate(dashboard), 100);
        } else {
          console.error('User profile not found after OAuth');
          toast.error('Authentication failed: User profile not found');
        }
      } else {
        console.error('No session found after OAuth callback');
        toast.error('Authentication failed: No session found');
        throw new Error('No session found after OAuth callback');
      }
    } catch (error: any) {
      console.error(`Error processing OAuth callback: ${error.message}`, error);
      toast.error(`Authentication failed: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleOAuthCallback };
};
