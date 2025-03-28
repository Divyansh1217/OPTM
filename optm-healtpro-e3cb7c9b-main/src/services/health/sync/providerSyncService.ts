
import { HealthProvider, SyncStatus } from '../types';

// Define RetryConfig separately to avoid circular references
type RetryConfig = {
  maxRetries: number;
  currentRetry: number;
  delay: number;
};

// Main provider sync options - remove circular reference
type ProviderSyncOptions = {
  provider: HealthProvider;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onStatusChange?: (status: SyncStatus) => void;
  retryConfig?: RetryConfig;
};

export class ProviderSyncService {
  private options: ProviderSyncOptions;
  private status: SyncStatus = 'idle';

  constructor(options: ProviderSyncOptions) {
    this.options = {
      ...options,
      retryConfig: options.retryConfig || {
        maxRetries: 3,
        currentRetry: 0,
        delay: 1000,
      },
    };
  }

  async sync(): Promise<any> {
    this.updateStatus('syncing');
    
    try {
      // Simulate API call to sync with provider
      const data = await this.mockSyncWithProvider();
      this.updateStatus('success');
      this.options.onSuccess?.(data);
      return data;
    } catch (error) {
      if (this.shouldRetry()) {
        return this.retrySync();
      }
      
      this.updateStatus('error');
      this.options.onError?.(error as Error);
      throw error;
    }
  }

  private shouldRetry(): boolean {
    const { retryConfig } = this.options;
    if (!retryConfig) return false;
    
    return retryConfig.currentRetry < retryConfig.maxRetries;
  }

  private async retrySync(): Promise<any> {
    if (!this.options.retryConfig) return null;
    
    const { retryConfig } = this.options;
    
    // Update retry count
    this.options.retryConfig = {
      ...retryConfig,
      currentRetry: retryConfig.currentRetry + 1,
      delay: retryConfig.delay * 2, // Exponential backoff
    };
    
    this.updateStatus('retrying');
    
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, retryConfig.delay));
    
    // Try again
    return this.sync();
  }

  private updateStatus(status: SyncStatus): void {
    this.status = status;
    this.options.onStatusChange?.(status);
  }

  private async mockSyncWithProvider(): Promise<any> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Random success or failure for demonstration
        if (Math.random() > 0.3) {
          resolve({ success: true, provider: this.options.provider, timestamp: Date.now() });
        } else {
          reject(new Error(`Failed to sync with ${this.options.provider}`));
        }
      }, 1000);
    });
  }

  getStatus(): SyncStatus {
    return this.status;
  }

  getProvider(): HealthProvider {
    return this.options.provider;
  }
  
  // Add missing methods referenced in syncService.ts
  getConnectedProviders(userId: string): Promise<any[]> {
    // Mock implementation for demonstration
    return Promise.resolve([
      { provider: 'google_fit', access_token: 'mock_token' }
    ]);
  }
  
  syncGoogleFitData(userId: string, accessToken: string, options: any): Promise<boolean> {
    // Mock implementation for demonstration
    return Promise.resolve(true);
  }
}
