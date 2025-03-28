
import React, { ErrorInfo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

interface CameraErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class CameraErrorBoundary extends React.Component<CameraErrorBoundaryProps, CameraErrorBoundaryState> {
  constructor(props: CameraErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): CameraErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Camera error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-900 w-full h-full flex flex-col items-center justify-center text-white p-6">
          <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Camera Error</h3>
          <p className="text-sm mb-4 text-center max-w-md">
            {this.state.error?.message || "There was a problem with the camera or motion tracking."}
          </p>
          <Button onClick={this.handleReset}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CameraErrorBoundary;
