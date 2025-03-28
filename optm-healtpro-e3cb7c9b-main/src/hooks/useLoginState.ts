
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLoginState = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [userType, setUserType] = useState<'doctor' | 'patient' | 'receptionist'>('patient');
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showDebug, setShowDebug] = useState(false);

  const { login, loginWithSocialProvider, signup, forgotPassword, isAuthenticated, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      
      if (result) {
        console.log('Login successful, redirecting to dashboard');
        // Navigate based on user role
        setTimeout(() => {
          const dashboard = 
            result.role === 'doctor' ? '/dashboard/doctor' : 
            result.role === 'receptionist' ? '/dashboard/receptionist' : 
            '/dashboard/patient';
          console.log(`Navigating to ${dashboard}`);
          navigate(dashboard);
        }, 500);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use an effect to redirect after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User is authenticated, redirecting to dashboard');
      const dashboard = 
        user.role === 'doctor' ? '/dashboard/doctor' : 
        user.role === 'receptionist' ? '/dashboard/receptionist' : 
        '/dashboard/patient';
      navigate(dashboard);
    }
  }, [isAuthenticated, user, navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await forgotPassword(forgotEmail);
      setShowForgotPassword(false);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      console.error('Password reset failed:', error);
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await signup(signupData.email, signupData.password, signupData.name, userType);
      setShowSignupDialog(false);
      toast.success('Account created successfully! Please check your email for verification.');
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
    try {
      setIsSubmitting(true);
      console.log(`Initiating ${provider} OAuth login flow for ${userType} role`);
      toast.info(`Connecting to ${provider}...`, { duration: 3000 });
      
      // In a real app, we'd store the selected role in localStorage or pass it to the OAuth provider
      localStorage.setItem('selectedRole', userType);
      
      await loginWithSocialProvider(provider);
    } catch (error) {
      console.error(`${provider} login initiation failed:`, error);
      toast.error(`${provider} login failed. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (value: string) => {
    if (value === 'doctor' || value === 'patient' || value === 'receptionist') {
      setUserType(value);
      
      // Set demo email placeholders based on selected role
      if (value === 'doctor') {
        setEmail('doctor@example.com');
      } else if (value === 'patient') {
        setEmail('patient@example.com');
      } else if (value === 'receptionist') {
        setEmail('receptionist@example.com');
      }
      
      setPassword('password123'); // For demo purposes
    }
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  return {
    email, setEmail,
    password, setPassword,
    isSubmitting, setIsSubmitting,
    showForgotPassword, setShowForgotPassword,
    forgotEmail, setForgotEmail,
    userType, setUserType,
    showSignupDialog, setShowSignupDialog,
    signupData, setSignupData,
    showDebug, setShowDebug,
    handleSubmit,
    handleForgotPassword,
    handleSignup,
    handleSocialLogin,
    handleTabChange,
    handleSignupInputChange
  };
};
