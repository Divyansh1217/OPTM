
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleDemoLogin = (role: 'doctor' | 'patient' | 'admin') => {
    // Simulate login with a demo account
    const demoUser = {
      id: `demo-${role}-${Date.now()}`,
      name: role === 'doctor' ? 'Dr. Demo Account' : role === 'admin' ? 'Admin Demo' : 'Patient Demo',
      email: `${role}@example.com`,
      role: role,
      provider: 'email'
    };
    
    // Store in localStorage to persist through page refresh
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    
    // Redirect to appropriate dashboard
    navigate(role === 'doctor' ? '/dashboard' : '/patient-dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Medical Dashboard Login</CardTitle>
          <CardDescription>
            Sign in to access your medical dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-center">Demo Accounts</h3>
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('doctor')}
                className="w-full"
              >
                Continue as Doctor
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('patient')}
                className="w-full"
              >
                Continue as Patient
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('admin')}
                className="w-full"
              >
                Continue as Admin
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button disabled className="w-full">
              Email & Password Login (Disabled in Demo)
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/motion-analysis" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
              Test Motion Tracking (No Login Required)
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
