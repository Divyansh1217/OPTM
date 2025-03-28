
import { Json } from '@/integrations/supabase/types';
import { isJsonObject, safeGetFromJson } from '@/types/human';

/**
 * Helper function to convert any object to a JSON-compatible format for Supabase
 */
export const toJsonObject = (obj: any): Json => {
  if (obj === null || obj === undefined) return null;
  
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => toJsonObject(item));
  }
  
  // Convert to plain object with no methods
  const result: Record<string, Json> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value !== 'function' && key !== '__proto__') {
        result[key] = toJsonObject(value);
      }
    }
  }
  
  return result;
};

