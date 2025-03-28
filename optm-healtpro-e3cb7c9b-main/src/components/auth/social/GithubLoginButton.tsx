
import React from 'react';
import SocialButton from './SocialButton';
import { Github } from 'lucide-react';

interface GithubLoginButtonProps {
  onLogin: () => Promise<void>;
  disabled: boolean;
}

const GithubLoginButton: React.FC<GithubLoginButtonProps> = ({ onLogin, disabled }) => {
  return (
    <SocialButton
      onClick={onLogin}
      disabled={disabled}
      icon={<Github className="h-5 w-5" />}
      provider="GitHub"
    />
  );
};

export default GithubLoginButton;
