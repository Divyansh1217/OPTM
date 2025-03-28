
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  onRetry: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ onRetry }) => (
  <div className="p-6 bg-destructive/10 rounded-lg text-center">
    <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
    <h3 className="text-base font-medium mb-2">Failed to load data</h3>
    <p className="text-sm text-muted-foreground mb-3">
      There was a problem loading this section
    </p>
    <button 
      onClick={onRetry}
      className="px-3 py-1.5 bg-primary text-white text-sm rounded-md"
    >
      Retry
    </button>
  </div>
);

interface ErrorBoundaryWithFallbackProps {
  children: React.ReactNode;
  onRetry: () => void;
}

export class ErrorBoundaryWithFallback extends React.Component<
  ErrorBoundaryWithFallbackProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryWithFallbackProps) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: any, info: any) {
    console.error("Error in component:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.props.onRetry} />;
    }
    
    return this.props.children;
  }
}
