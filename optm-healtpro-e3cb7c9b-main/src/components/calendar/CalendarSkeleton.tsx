
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CalendarSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-40" />
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 h-[600px]">
        {Array(7).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-full w-full" />
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;
