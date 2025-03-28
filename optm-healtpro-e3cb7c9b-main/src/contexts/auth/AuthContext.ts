
import { createContext } from 'react';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = 'AuthContext'; // This helps with React DevTools debugging
