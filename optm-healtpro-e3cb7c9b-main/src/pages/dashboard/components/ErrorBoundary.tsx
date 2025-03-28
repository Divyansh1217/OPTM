
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20">
    <CardContent className="p-6 text-center">
      <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2 text-red-700 dark:text-red-300">Something went wrong</h3>
      <p className="text-sm text-red-600 dark:text-red-400 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button 
        onClick={resetErrorBoundary}
        variant="outline"
        className="border-red-300 hover:bg-red-100 text-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
      >
        Try Again
      </Button>
    </CardContent>
  </Card>
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onReset?: () => void;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, info);
    
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }
  
  handleReset = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
  };
  
  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || ErrorFallback;
      return <Fallback error={this.state.error} resetErrorBoundary={this.handleReset} />;
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;
