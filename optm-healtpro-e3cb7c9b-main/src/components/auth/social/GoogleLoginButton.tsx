
import React from 'react';
import SocialButton from './SocialButton';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

interface GoogleLoginButtonProps {
  onLogin: () => Promise<void>;
  disabled: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLogin, disabled }) => {
  const handleLogin = async () => {
    try {
      toast.info("Connecting to Google...");
      await onLogin();
      // The redirect happens in the onLogin function, so we don't need to do anything else here
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to connect to Google. Please try again.');
    }
  };

  return (
    <SocialButton
      onClick={handleLogin}
      disabled={disabled}
      icon={<FcGoogle className="h-5 w-5" />}
      provider="Google"
      testId="google-login-button"
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    />
  );
};

export default GoogleLoginButton;
