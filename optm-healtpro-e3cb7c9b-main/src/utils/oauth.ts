
// Mock OAuth state management to simulate real OAuth flows
// In a production app, this would connect to actual OAuth providers

// Store OAuth state in localStorage to persist through redirects
export const storeOAuthState = (provider: string) => {
  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem('oauth_state', state);
  localStorage.setItem('oauth_provider', provider);
  return state;
};

export const verifyOAuthState = (state: string) => {
  const storedState = localStorage.getItem('oauth_state');
  return state === storedState;
};

export const clearOAuthState = () => {
  localStorage.removeItem('oauth_state');
  localStorage.removeItem('oauth_provider');
};

export const getOAuthProvider = () => {
  return localStorage.getItem('oauth_provider');
};

// Mock profile data that would come from OAuth providers
export const getMockUserProfileFromProvider = (provider: string) => {
  switch (provider) {
    case 'google':
      return {
        id: `google-${Math.random().toString(36).substring(2, 9)}`,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@gmail.com',
        picture: 'https://i.pravatar.cc/150?u=google'
      };
    case 'apple':
      return {
        id: `apple-${Math.random().toString(36).substring(2, 9)}`,
        name: 'Michael Chen',
        email: 'michael.chen@icloud.com',
        picture: 'https://i.pravatar.cc/150?u=apple'
      };
    case 'github':
      return {
        id: `github-${Math.random().toString(36).substring(2, 9)}`,
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@github.com',
        picture: 'https://i.pravatar.cc/150?u=github'
      };
    default:
      return null;
  }
};

// Mock redirect URL generation
export const generateOAuthRedirectUrl = (provider: string) => {
  const state = storeOAuthState(provider);
  
  // For our mock implementation, we'll simulate a redirect to the provider
  // and then back to our callback URL with proper state parameter
  const redirectUri = `${window.location.origin}/oauth-callback`;
  const mockCode = Math.random().toString(36).substring(2, 15);
  
  // We'll simulate the OAuth flow by directing to our callback with the required parameters
  return `${redirectUri}?code=${mockCode}&state=${state}&provider=${provider}`;
};
