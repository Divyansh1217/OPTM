
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingStateProps {
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
