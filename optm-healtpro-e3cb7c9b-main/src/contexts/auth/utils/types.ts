
import { Provider as SupabaseProvider } from '@supabase/supabase-js';
import { User, UserRole } from '../types';

// Define UserSession type here since it's not in types.ts
export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  provider: string;
  picture: string | null;
}

// Use SupabaseProvider instead of the local Provider
export type Provider = SupabaseProvider;
