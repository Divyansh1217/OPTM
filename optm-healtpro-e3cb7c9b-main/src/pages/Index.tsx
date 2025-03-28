
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    console.log("Index page rendered with auth state:", { isAuthenticated, isLoading, user });
    
    if (!isLoading) {
      if (isAuthenticated && user) {
        console.log('Index page: User authenticated, role is', user.role);
        
        // Redirect based on user role
        const dashboard = 
          user.role === 'doctor' ? '/dashboard/doctor' : 
          user.role === 'receptionist' ? '/dashboard/receptionist' : 
          '/dashboard/patient';
          
        console.log(`Navigating to ${dashboard}`);
        navigate(dashboard);
      } else {
        console.log('Index page: User not authenticated, redirecting to login');
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-background">
        <div className="text-foreground p-6 text-center border border-gray-200 rounded-lg shadow-sm max-w-md bg-white/50 dark:bg-gray-800/50">
          <div className="w-12 h-12 mb-4 mx-auto rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <h2 className="text-xl font-medium">Loading...</h2>
          <p className="mt-2 text-muted-foreground">Please wait while we prepare your experience</p>
        </div>
      </div>
    );
  }

  // This fallback should rarely be seen as we navigate away in the useEffect
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background">
      <div className="text-foreground p-6 text-center border border-gray-200 rounded-lg shadow-sm max-w-md bg-white/50 dark:bg-gray-800/50">
        <h2 className="text-xl font-medium">Welcome to Medical Dashboard</h2>
        <p className="mt-2 text-muted-foreground">Initializing application...</p>
        <button 
          onClick={() => navigate('/login')} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Index;
