
import { useSocialProviderAuth } from './social/useSocialProviderAuth';
import { useOAuthCallbackHandler } from './social/useOAuthCallbackHandler';
import { Provider } from '@supabase/supabase-js';

type UseAuthSocialProps = {
  setIsLoading: (isLoading: boolean) => void;
  navigate: (path: string) => void;
};

export const useAuthSocial = ({ setIsLoading, navigate }: UseAuthSocialProps) => {
  const { loginWithSocialProvider } = useSocialProviderAuth({ setIsLoading });
  const { handleOAuthCallback } = useOAuthCallbackHandler({ setIsLoading, navigate });

  return { 
    loginWithSocialProvider, 
    handleOAuthCallback 
  };
};
