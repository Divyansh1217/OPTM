
import { supabase } from '@/integrations/supabase/client';
import { HealthMetric, HealthMetricType } from './types';
import { healthDataService } from './metricsService';

/**
 * Service for handling realtime updates to health data
 */
export class RealtimeService {
  private channel: any = null;
  
  /**
   * Setup realtime subscription to health data
   */
  public setupRealtimeSubscription() {
    try {
      this.channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'fitness_data'
          },
          (payload) => {
            // Update cache with new data
            const { new: newData } = payload;
            if (newData) {
              const metric: HealthMetric = {
                id: newData.id,
                userId: newData.user_id,
                type: newData.data_type as HealthMetricType,
                value: Number(newData.value),
                unit: newData.unit,
                timestamp: newData.start_time,
                source: newData.source,
                metadata: newData.metadata ? (newData.metadata as Record<string, any>) : undefined
              };
              
              // Update the cache - fix the reference to use healthDataService
              healthDataService.updateCache?.(metric);
            }
          }
        )
        .subscribe();
        
      return () => {
        if (this.channel) {
          supabase.removeChannel(this.channel);
        }
      };
    } catch (error) {
      console.error('Error setting up realtime subscription:', error);
    }
  }

  /**
   * Clean up subscription when no longer needed
   */
  public cleanup() {
    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }
}

export const realtimeService = new RealtimeService();
