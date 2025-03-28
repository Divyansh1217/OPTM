
import { getCurrentSession } from './sessionManager';

/**
 * Checks if the current user has the required role
 */
export const hasRole = async (
  requiredRole: 'doctor' | 'patient' | 'receptionist' | 'any'
): Promise<boolean> => {
  try {
    const userSession = await getCurrentSession();
    
    if (!userSession) {
      return false;
    }
    
    if (requiredRole === 'any') {
      return true;
    }
    
    return userSession.role === requiredRole;
  } catch (error) {
    console.error('Error in hasRole:', error);
    return false;
  }
};
