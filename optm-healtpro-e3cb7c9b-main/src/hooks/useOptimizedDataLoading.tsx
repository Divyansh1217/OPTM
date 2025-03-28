
import { useState, useEffect, useRef } from 'react';

interface DataLoadingOptions<T> {
  initialData?: T;
  loadingTimeout?: number;
  retryCount?: number;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * A hook to optimize data loading with timeout handling, retries, and error management
 */
export function useOptimizedDataLoading<T>(
  fetchFunction: () => Promise<T>,
  options: DataLoadingOptions<T> = {}
) {
  const {
    initialData,
    loadingTimeout = 5000,
    retryCount = 2,
    retryDelay = 1000,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [attempts, setAttempts] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const clearTimeoutSafely = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const loadData = async (attempt = 0) => {
    if (!mountedRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    // Set a timeout to prevent hanging
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        console.warn(`Data loading timeout after ${loadingTimeout}ms`);
        setIsLoading(false);
        
        if (attempt < retryCount) {
          console.log(`Retrying data fetch (attempt ${attempt + 1} of ${retryCount})`);
          setTimeout(() => loadData(attempt + 1), retryDelay);
        } else {
          const timeoutError = new Error(`Data loading failed after ${retryCount + 1} attempts`);
          setError(timeoutError);
          onError?.(timeoutError);
        }
      }
    }, loadingTimeout);
    
    try {
      const result = await fetchFunction();
      
      if (mountedRef.current) {
        clearTimeoutSafely();
        setData(result);
        setIsLoading(false);
        setAttempts(attempt + 1);
        onSuccess?.(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        clearTimeoutSafely();
        const thrownError = err instanceof Error ? err : new Error('Unknown error occurred');
        console.error('Data loading error:', thrownError);
        
        if (attempt < retryCount) {
          console.log(`Retrying after error (attempt ${attempt + 1} of ${retryCount})`);
          setTimeout(() => loadData(attempt + 1), retryDelay);
        } else {
          setIsLoading(false);
          setError(thrownError);
          setAttempts(attempt + 1);
          onError?.(thrownError);
        }
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    loadData();
    
    return () => {
      mountedRef.current = false;
      clearTimeoutSafely();
    };
  }, []);

  const reload = () => {
    setAttempts(0);
    loadData();
  };

  return { data, isLoading, error, reload, attempts };
}

export default useOptimizedDataLoading;
