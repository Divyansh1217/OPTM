
import React from 'react';
import { cn } from '@/lib/utils';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The number of columns to display at different breakpoints
   * Default is responsive (1 on mobile, 2 on tablet, 3 on desktop)
   */
  columns?: 'responsive' | 1 | 2 | 3 | 4 | number;
  
  /**
   * The size of gap between cards
   */
  gap?: 'sm' | 'md' | 'lg' | number;
  
  /**
   * Container styles
   */
  containerClassName?: string;
  
  /**
   * Whether the grid has equal height cards
   */
  equalHeight?: boolean;
  
  /**
   * Whether the grid is centered
   */
  centered?: boolean;
}

const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  ({ 
    children, 
    className, 
    columns = 'responsive', 
    gap = 'md',
    containerClassName,
    equalHeight = true,
    centered = false,
    ...props 
  }, ref) => {
    // Determine grid columns based on the columns prop
    const gridColumns = 
      columns === 'responsive' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : typeof columns === 'number'
          ? `grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(columns, 12)}`
          : `grid-cols-${columns}`;
    
    // Determine gap size
    const gapSize = 
      gap === 'sm' ? 'gap-2 md:gap-3' : 
      gap === 'md' ? 'gap-4 md:gap-5' : 
      gap === 'lg' ? 'gap-5 md:gap-6' : 
      typeof gap === 'number' ? `gap-${gap}` : 'gap-4';
    
    return (
      <div
        className={cn(containerClassName)}
        {...props}
      >
        <div 
          ref={ref}
          className={cn(
            'grid',
            gridColumns,
            gapSize,
            equalHeight && 'grid-flow-row auto-rows-fr',
            centered && 'place-items-center',
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

CardGrid.displayName = 'CardGrid';

export { CardGrid };
