
import { Result as HumanResult, BodyResult, BodyKeypoint as OriginalBodyKeypoint } from '@vladmandic/human';
import { Json } from '@/integrations/supabase/types';

// Extend Human.js types to include the properties we need
declare module '@vladmandic/human' {
  interface Result extends HumanResult {
    source?: {
      width: number;
      height: number;
    };
  }

  interface BodyKeypoint extends OriginalBodyKeypoint {
    name?: string;
    x: number;
    y: number;
  }
}

// Add additional type helpers for Supabase JSON handling
export interface JsonObject {
  [key: string]: Json;
}

export interface StatsObject {
  totalReps?: number;
  goodReps?: number;
  badReps?: number;
  accuracy?: number;
}

// Safe type guard helpers
export function isJsonObject(value: Json): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function safeGetFromJson<T>(json: Json | null | undefined, path: string, defaultValue: T): T {
  try {
    if (!json || typeof json !== 'object' || json === null) return defaultValue;
    
    const parts = path.split('.');
    let current: any = json;
    
    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[part];
    }
    
    return current !== undefined && current !== null ? current : defaultValue;
  } catch (e) {
    console.error(`Error accessing ${path} from JSON:`, e);
    return defaultValue;
  }
}
