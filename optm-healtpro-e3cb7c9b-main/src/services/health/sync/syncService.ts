import { SyncOptions } from '../types';
import { SyncRetryService } from './syncRetryService';
import { ProviderSyncService } from './providerSyncService';
import { toast } from 'sonner';

/**
 * Service for synchronizing health data from connected providers
 */
export class HealthSyncService {
  // Flag to track active synchronization
  private isSyncing: boolean = false;
  private lastSyncTime: Date | null = null;
  private syncRetryService: SyncRetryService;
  private providerSyncService: ProviderSyncService;

  constructor() {
    this.syncRetryService = new SyncRetryService();
    // Initialize with required provider option
    this.providerSyncService = new ProviderSyncService({
      provider: 'google_fit' // Provide a default provider
    });
  }

  /**
   * Synchronize health data from all connected providers
   */
  public async syncAllHealthData(userId: string, options: SyncOptions = {}): Promise<boolean> {
    if (!userId) {
      console.error('Cannot sync health data: No user ID provided');
      return false;
    }
    
    // Skip if already syncing, unless force refresh is specified
    if (this.isSyncing && !options.forceRefresh) {
      console.log('Health data sync already in progress');
      return false;
    }
    
    this.isSyncing = true;
    this.syncRetryService.resetAttempts();
    
    try {
      // For demo users, just simulate a successful sync
      if (userId.startsWith('demo-')) {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.lastSyncTime = new Date();
        console.log('Demo user sync completed successfully');
        return true;
      }
      
      const success = await this.performSync(userId, options);
      
      if (success) {
        this.lastSyncTime = new Date();
        this.syncRetryService.resetAttempts();
        console.log('Health data sync completed successfully');
        return true;
      } else if (this.syncRetryService.canRetry()) {
        // Retry sync with exponential backoff
        console.log(`Sync failed, attempt ${this.syncRetryService.getAttempts() + 1}/${this.syncRetryService.getMaxAttempts()}`);
        return await this.syncRetryService.retry(async () => {
          return await this.performSync(userId, options);
        });
      }
      
      console.error('Health data sync failed after maximum attempts');
      return false;
    } catch (error) {
      console.error('Error syncing health data:', error);
      
      // Retry on error if we haven't exceeded max attempts
      if (this.syncRetryService.canRetry()) {
        console.log(`Sync error, retrying (attempt ${this.syncRetryService.getAttempts() + 1}/${this.syncRetryService.getMaxAttempts()})`);
        return await this.syncRetryService.retry(async () => {
          return await this.performSync(userId, options);
        });
      }
      
      console.error('Health data sync failed after maximum attempts due to errors');
      return false;
    } finally {
      this.isSyncing = false;
    }
  }
  
  /**
   * Get the last sync time
   */
  public getLastSyncTime(): Date | null {
    return this.lastSyncTime;
  }
  
  /**
   * Check if sync is currently in progress
   */
  public isSyncInProgress(): boolean {
    return this.isSyncing;
  }
  
  /**
   * Perform the actual sync operation
   */
  private async performSync(userId: string, options: SyncOptions = {}): Promise<boolean> {
    try {
      console.log(`Starting health data sync for user ${userId}`);
      
      const connections = await this.providerSyncService.getConnectedProviders(userId);
      
      if (!connections || connections.length === 0) {
        console.log('No connected fitness providers found');
        return false;
      }
      
      console.log(`Found ${connections.length} connected fitness providers`);
      let syncSuccessful = false;
      
      // Sync data from each connected provider
      for (const connection of connections) {
        if (connection.provider === 'google_fit') {
          console.log(`Syncing Google Fit data for user ${userId}`);
          const success = await this.providerSyncService.syncGoogleFitData(
            userId, 
            connection.access_token, 
            options
          );
          syncSuccessful = syncSuccessful || success;
          
          if (success) {
            console.log('Google Fit data sync successful');
          } else {
            console.error('Google Fit data sync failed');
          }
        }
      }
      
      return syncSuccessful;
    } catch (error) {
      console.error('Error in performSync:', error);
      this.syncRetryService.incrementAttempts();
      throw error;
    }
  }
}

export const healthSyncService = new HealthSyncService();
