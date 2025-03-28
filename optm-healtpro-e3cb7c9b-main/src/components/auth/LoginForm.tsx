
import React from 'react';
import { Button } from '@/components/ui/button';
import EmailInput from './login/EmailInput';
import PasswordInput from './login/PasswordInput';
import LoginOptions from './login/LoginOptions';
import { motion } from 'framer-motion';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  userType: 'doctor' | 'patient' | 'receptionist';
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  userType,
  isSubmitting,
  onSubmit,
  onForgotPassword
}) => {
  return (
    <motion.form 
      onSubmit={onSubmit} 
      className="space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <EmailInput 
        email={email}
        setEmail={setEmail}
        userType={userType}
      />
      
      <PasswordInput
        password={password}
        setPassword={setPassword}
      />
      
      <LoginOptions onForgotPassword={onForgotPassword} />
      
      <Button
        type="submit"
        className="w-full py-2.5 text-sm font-medium transition-all hover:shadow-md active:scale-[0.98]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </div>
        ) : (
          'Sign in'
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        {userType === 'doctor' || userType === 'receptionist' || userType === 'patient' ? (
          <>
            Demo credentials available: <span className="font-medium">{userType}@example.com / password123</span>
          </>
        ) : (
          'Use the login form to sign in with your credentials'
        )}
      </p>
    </motion.form>
  );
};

export default LoginForm;
