
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatUser } from '../utils';
import { User } from '../types';

export const useAuthSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // First, check local storage for demo user
        const demoUserData = localStorage.getItem('demoUser');
        if (demoUserData) {
          try {
            const demoUser = JSON.parse(demoUserData);
            console.log('Found demo user in localStorage:', demoUser.email);
            
            // Ensure demo user has all required properties
            if (demoUser && demoUser.email && demoUser.role) {
              // Ensure the user object has all required properties
              const completeUser: User = {
                id: demoUser.id || `demo-${Date.now()}`,
                email: demoUser.email,
                name: demoUser.name || (
                  demoUser.email === 'admin@example.com' ? 'Admin Demo Account' : 
                  demoUser.email === 'doctor@example.com' ? 'Dr. Demo Account' : 
                  'Patient Demo'
                ),
                role: demoUser.role,
                provider: demoUser.provider || 'email',
                picture: demoUser.picture || null,
                patientId: demoUser.patientId || (demoUser.role === 'patient' ? 'demo-patient-id-123' : undefined)
              };
              
              setUser(completeUser);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error('Error parsing demo user data:', e);
            localStorage.removeItem('demoUser');
          }
        }
        
        // Otherwise, check Supabase session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          console.log('Supabase session found, loading user profile');
          const formattedUser = await formatUser(data.session.user);
          setUser(formattedUser);
        } else {
          console.log('No active session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session) {
            const formattedUser = await formatUser(session.user);
            setUser(formattedUser);
          }
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          // Also clear any demo user
          localStorage.removeItem('demoUser');
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Enhanced setUser function to also store demo users in localStorage
  const setUserWithStorage = (newUser: User | null) => {
    setUser(newUser);
    
    // If this is a demo user, store in localStorage
    if (newUser && ['admin@example.com', 'doctor@example.com', 'patient@example.com', 'receptionist@example.com'].includes(newUser.email)) {
      localStorage.setItem('demoUser', JSON.stringify(newUser));
      console.log('Stored demo user in localStorage:', newUser.email);
    } else if (newUser === null) {
      localStorage.removeItem('demoUser');
    }
  };

  return {
    user,
    setUser: setUserWithStorage,
    isLoading
  };
};
