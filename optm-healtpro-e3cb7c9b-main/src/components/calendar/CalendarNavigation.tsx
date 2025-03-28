
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarNavigationProps {
  selectedDate: Date;
  view: 'day' | 'week' | 'month';
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  selectedDate,
  view,
  onPrevious,
  onNext,
  onToday
}) => {
  // Format the title based on the view
  const formatTitle = () => {
    switch (view) {
      case 'day':
        return format(selectedDate, 'EEEE, MMMM d, yyyy');
      case 'week':
        return `Week of ${format(selectedDate, 'MMMM d, yyyy')}`;
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{formatTitle()}</h2>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onToday}>
          <Calendar className="h-4 w-4 mr-1" />
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarNavigation;
