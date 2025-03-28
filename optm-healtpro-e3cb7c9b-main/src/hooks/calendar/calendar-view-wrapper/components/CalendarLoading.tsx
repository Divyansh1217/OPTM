
import React from 'react';

interface CalendarLoadingProps {
  isVisible: boolean;
}

const CalendarLoading: React.FC<CalendarLoadingProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-10">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default CalendarLoading;

