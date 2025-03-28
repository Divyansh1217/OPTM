
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type UseAuthManagementProps = {
  navigate: (path: string) => void;
};

export const useAuthManagement = ({ navigate }: UseAuthManagementProps) => {
  const logout = async (): Promise<void> => {
    try {
      // First check if we have a demo user in localStorage
      const demoUserData = localStorage.getItem('demoUser');
      
      // Clear any user data from localStorage
      if (demoUserData) {
        localStorage.removeItem('demoUser');
      }
      
      // Always attempt to sign out from Supabase regardless of demo user
      // This ensures we clean up any lingering sessions
      await supabase.auth.signOut();
      
      // Show logout notification
      toast.info('You have been logged out', {
        duration: 3000
      });
      
      // Navigate to login page after all cleanup is complete
      setTimeout(() => {
        navigate('/login');
      }, 100); // Short timeout to ensure state updates complete
      
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Failed to log out', {
        duration: 4000
      });
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      // Special case for demo accounts
      if (email === 'doctor@example.com' || email === 'patient@example.com') {
        toast.success('Demo account password is "password123"', {
          duration: 5000
        });
        return;
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Password reset link sent to your email', {
        duration: 5000
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link', {
        duration: 5000
      });
      throw error;
    }
  };

  return { logout, forgotPassword };
};
