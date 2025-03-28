
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '../types';
import { Provider } from './types';
import { createUserProfile, getUserSession } from './userProfile';

/**
 * Formats a Supabase user object into our application's User format
 */
export const formatUser = async (supabaseUser: any): Promise<User | null> => {
  if (!supabaseUser || !supabaseUser.id) {
    return null;
  }

  try {
    // Get the user's profile from the database
    const userSession = await getUserSession(supabaseUser.id);
    
    if (!userSession) {
      console.log('No user profile found, checking for user metadata');
      
      // If no profile found, try to get role from user metadata
      const userRole = supabaseUser.user_metadata?.role || 
                       supabaseUser.app_metadata?.role || 
                       'patient';
                       
      const displayName = supabaseUser.user_metadata?.name || 
                          supabaseUser.user_metadata?.full_name || 
                          'User';
      
      // Create profile for the user
      const provider = supabaseUser.app_metadata?.provider || 'email';
      const picture = supabaseUser.user_metadata?.avatar_url || null;
      
      const userProfile = await createUserProfile(
        supabaseUser.id,
        supabaseUser.email || '',
        displayName,
        userRole as UserRole,
        provider as Provider,
        picture || ''
      );
      
      if (!userProfile) {
        console.error('Failed to create user profile');
        return null;
      }
      
      const user: User = {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role as UserRole,
        provider: userProfile.provider as Provider,
        picture: userProfile.picture
      };
      
      return user;
    }
    
    // Return user with profile data
    const user: User = {
      id: userSession.id,
      email: userSession.email,
      name: userSession.name,
      role: userSession.role as UserRole,
      provider: userSession.provider as Provider,
      picture: userSession.picture
    };
    
    return user;
  } catch (error) {
    console.error('Error formatting user:', error);
    return null;
  }
};
