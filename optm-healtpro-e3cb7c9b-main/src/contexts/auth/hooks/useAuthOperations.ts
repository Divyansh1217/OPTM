
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthLogin } from './useAuthLogin';
import { useAuthSignup } from './useAuthSignup';
import { useAuthSocial } from './useAuthSocial';
import { useAuthManagement } from './useAuthManagement';

export const useAuthOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Initialize hooks with navigate
  const { login } = useAuthLogin({ setIsLoading, navigate });
  const { signup } = useAuthSignup({ setIsLoading, navigate });
  const { loginWithSocialProvider, handleOAuthCallback } = useAuthSocial({ setIsLoading, navigate });
  const { logout, forgotPassword } = useAuthManagement({ navigate });

  return {
    isLoading,
    login,
    signup,
    loginWithSocialProvider,
    handleOAuthCallback,
    logout,
    forgotPassword
  };
};
