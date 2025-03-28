
import React from 'react';
import SocialButton from './SocialButton';
import { Apple } from 'lucide-react';

interface AppleLoginButtonProps {
  onLogin: () => Promise<void>;
  disabled: boolean;
}

const AppleLoginButton: React.FC<AppleLoginButtonProps> = ({ onLogin, disabled }) => {
  return (
    <SocialButton
      onClick={onLogin}
      disabled={disabled}
      icon={<Apple className="h-5 w-5" />}
      provider="Apple"
    />
  );
};

export default AppleLoginButton;
