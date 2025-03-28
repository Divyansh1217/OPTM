
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationFooterProps {
  totalCount: number;
  filteredCount: number;
}

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalCount} patients
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  );
};
