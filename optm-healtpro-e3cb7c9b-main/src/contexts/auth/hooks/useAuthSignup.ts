
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { formatUser } from '../utils';
import { User, UserRole } from '../types';

type UseAuthSignupProps = {
  setIsLoading: (isLoading: boolean) => void;
  navigate: (path: string) => void;
};

export const useAuthSignup = ({ setIsLoading, navigate }: UseAuthSignupProps) => {
  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<User | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) throw error;

      toast.success('Account created successfully. Please check your email for verification.', {
        duration: 5000
      });
      
      if (data.user && !data.user.email_confirmed_at) {
        navigate('/login');
        return null;
      } else {
        const formattedUser = await formatUser(data.user);
        if (formattedUser) {
          navigate(role === 'doctor' ? '/dashboard' : '/patient-dashboard');
        }
        return formattedUser;
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed', {
        duration: 5000
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup };
};
