
import { supabase } from '@/integrations/supabase/client';
import { getUserSession } from './userProfile';
import { UserSession } from './types';

/**
 * Gets the current authenticated user session 
 */
export const getCurrentSession = async (): Promise<UserSession | null> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting current session:', error);
      return null;
    }
    
    if (!session) {
      console.log('No active session found');
      return null;
    }
    
    const userId = session.user.id;
    return await getUserSession(userId);
  } catch (error) {
    console.error('Error in getCurrentSession:', error);
    return null;
  }
};
