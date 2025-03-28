
/**
 * Service for handling sync retries with exponential backoff
 */
export class SyncRetryService {
  private syncAttempts: number = 0;
  private readonly MAX_SYNC_ATTEMPTS: number = 3;

  /**
   * Reset the retry attempts counter
   */
  public resetAttempts(): void {
    this.syncAttempts = 0;
  }

  /**
   * Increment the retry attempts counter
   */
  public incrementAttempts(): void {
    this.syncAttempts++;
  }

  /**
   * Get the current number of retry attempts
   */
  public getAttempts(): number {
    return this.syncAttempts;
  }
  
  /**
   * Get the maximum number of retry attempts allowed
   */
  public getMaxAttempts(): number {
    return this.MAX_SYNC_ATTEMPTS;
  }

  /**
   * Check if a retry is possible (attempts not exceeded)
   */
  public canRetry(): boolean {
    return this.syncAttempts < this.MAX_SYNC_ATTEMPTS;
  }

  /**
   * Retry operation with exponential backoff
   */
  public async retry<T>(operationFn: () => Promise<T>): Promise<T> {
    this.incrementAttempts();
    
    // Calculate backoff time: 2^attempt * 1000ms (1s, 2s, 4s)
    const backoffTime = Math.pow(2, this.syncAttempts - 1) * 1000;
    console.log(`Retrying sync attempt ${this.syncAttempts} after ${backoffTime}ms`);
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const result = await operationFn();
          resolve(result);
        } catch (error) {
          console.error(`Error in retry attempt ${this.syncAttempts}:`, error);
          resolve(false as unknown as T);
        }
      }, backoffTime);
    });
  }
}
