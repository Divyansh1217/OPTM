
import { Provider } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'doctor' | 'patient' | 'receptionist';
export type AuthProviderType = Provider | 'email';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  provider?: AuthProviderType;
  picture?: string | null;
  patientId?: string; // Added to link patient users to their records
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  loginWithSocialProvider: (provider: Provider) => Promise<void>;
  handleOAuthCallback: (provider: string, code: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<User | null>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
};
