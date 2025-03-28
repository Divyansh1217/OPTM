
import { User, UserRole } from '@/contexts/auth/types';

// Permission levels in ascending order of access
export const PERMISSION_LEVELS = {
  'patient': 1,
  'receptionist': 2,
  'doctor': 3,
  'admin': 4
};

// Define permissions for different resources and actions
export const PERMISSIONS = {
  PATIENTS: {
    VIEW_ALL: ['admin', 'doctor', 'receptionist'],
    VIEW_OWN: ['admin', 'doctor', 'receptionist', 'patient'],
    EDIT_ALL: ['admin', 'doctor'],
    EDIT_OWN: ['admin', 'doctor', 'patient']
  },
  APPOINTMENTS: {
    CREATE: ['admin', 'doctor', 'receptionist', 'patient'],
    VIEW_ALL: ['admin', 'doctor', 'receptionist'],
    VIEW_OWN: ['admin', 'doctor', 'receptionist', 'patient'],
    EDIT_ALL: ['admin', 'doctor', 'receptionist'],
    EDIT_OWN: ['admin', 'doctor', 'receptionist', 'patient'],
    DELETE_ALL: ['admin', 'doctor', 'receptionist'],
    DELETE_OWN: ['admin', 'doctor', 'receptionist', 'patient']
  },
  REPORTS: {
    VIEW_ALL: ['admin', 'doctor'],
    VIEW_OWN: ['admin', 'doctor', 'patient'],
    CREATE: ['admin', 'doctor'],
    EDIT: ['admin', 'doctor'],
    DELETE: ['admin']
  },
  BILLING: {
    VIEW_ALL: ['admin', 'receptionist'],
    CREATE: ['admin', 'receptionist'],
    EDIT: ['admin', 'receptionist'],
    DELETE: ['admin']
  },
  INVENTORY: {
    VIEW: ['admin', 'receptionist'],
    MANAGE: ['admin', 'receptionist']
  },
  USERS: {
    MANAGE: ['admin']
  }
};

/**
 * Check if a user has permission to perform an action
 * @param user The current user
 * @param resourceType The resource type (e.g., 'PATIENTS', 'APPOINTMENTS')
 * @param action The action to perform (e.g., 'VIEW_ALL', 'EDIT_OWN')
 * @param resourceOwnerId Optional: The owner ID of the resource for 'OWN' permission checks
 */
export function hasPermission(
  user: User | null,
  resourceType: keyof typeof PERMISSIONS,
  action: string,
  resourceOwnerId?: string
): boolean {
  // If no user, no permissions
  if (!user) return false;
  
  // Get allowed roles for this permission
  const permissionKey = action as keyof typeof PERMISSIONS[typeof resourceType];
  const allowedRoles = PERMISSIONS[resourceType][permissionKey] as UserRole[];
  
  // Check if user's role is allowed
  const hasRolePermission = allowedRoles.includes(user.role);

  // For 'OWN' permissions, also check if the user owns the resource
  if (hasRolePermission && action.includes('OWN') && resourceOwnerId) {
    const isResourceOwner = 
      resourceOwnerId === user.id || 
      resourceOwnerId === user.patientId;
    
    // For patient role, must be the owner
    if (user.role === 'patient') {
      return isResourceOwner;
    }
    
    // For higher roles like doctor/admin, they can access based on role even if not owner
    return true;
  }
  
  return hasRolePermission;
}

/**
 * Check if a user role has higher or equal permission level than the required role
 */
export function hasMinimumRoleLevel(userRole: UserRole, requiredRole: UserRole): boolean {
  return PERMISSION_LEVELS[userRole] >= PERMISSION_LEVELS[requiredRole];
}

/**
 * Filter a collection based on user permissions
 * @param items The collection to filter
 * @param user The current user
 * @param resourceType The resource type
 * @param getOwnerId Function to extract owner ID from an item
 */
export function filterByPermission<T>(
  items: T[],
  user: User | null,
  resourceType: keyof typeof PERMISSIONS,
  getOwnerId: (item: T) => string | undefined
): T[] {
  if (!user) return [];
  
  // Admins and doctors can see all
  if (hasPermission(user, resourceType, 'VIEW_ALL')) {
    return items;
  }
  
  // Others can only see their own
  if (hasPermission(user, resourceType, 'VIEW_OWN')) {
    return items.filter(item => {
      const ownerId = getOwnerId(item);
      return ownerId === user.id || ownerId === user.patientId;
    });
  }
  
  return [];
}

export default {
  hasPermission,
  hasMinimumRoleLevel,
  filterByPermission,
  PERMISSIONS,
  PERMISSION_LEVELS
};
