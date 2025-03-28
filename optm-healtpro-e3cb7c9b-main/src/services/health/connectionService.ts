
import { supabase } from '@/integrations/supabase/client';
import { FitnessConnection } from './types';

/**
 * Service for managing connections to fitness platforms
 */
export class ConnectionService {
  /**
   * Check if a user has connected Google Fit
   */
  public async hasGoogleFitConnected(userId: string): Promise<boolean> {
    try {
      // For demo users, return a mocked connection state
      if (userId?.startsWith('demo-')) {
        // Return true for demo-patient-* users to simulate a connected account
        return userId.includes('patient');
      }
      
      // Handle this as a custom query without type safety
      const { data, error } = await supabase
        .from('fitness_connections')
        .select('*')
        .eq('user_id', userId)
        .eq('provider', 'google_fit')
        .limit(1) as any;
        
      if (error) {
        throw error;
      }
      
      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking Google Fit connection:', error);
      return false;
    }
  }
  
  /**
   * Get information about the user's fitness connections
   */
  public async getFitnessConnections(userId: string): Promise<FitnessConnection[]> {
    try {
      // For demo users, return mock data
      if (userId?.startsWith('demo-')) {
        if (userId.includes('patient')) {
          // Simulate a connected Google Fit account for demo patients
          return [{
            id: 'demo-connection-1',
            userId: userId,
            provider: 'google_fit',
            isConnected: true,
            lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Convert Date to string
          }];
        }
        return [];
      }
      
      // Handle this as a custom query without type safety
      const { data, error } = await supabase
        .from('fitness_connections')
        .select('*')
        .eq('user_id', userId) as any;
        
      if (error) {
        throw error;
      }
      
      return (data || []).map((conn: any) => ({
        id: conn.id,
        userId: conn.user_id,
        provider: conn.provider,
        isConnected: true,
        lastSync: conn.last_sync
      }));
    } catch (error) {
      console.error('Error fetching fitness connections:', error);
      return [];
    }
  }
}

export const connectionService = new ConnectionService();
