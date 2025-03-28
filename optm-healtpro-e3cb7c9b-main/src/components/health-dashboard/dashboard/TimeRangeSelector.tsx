
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { TimeRange } from '@/services/health';

interface TimeRangeSelectorProps {
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedTimeRange,
  onTimeRangeChange
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <Calendar
        mode="single"
        className="hidden lg:block border rounded-md shadow-sm"
      />
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedTimeRange === 'day' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('day')}
        >
          Day
        </Button>
        <Button
          variant={selectedTimeRange === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('week')}
        >
          Week
        </Button>
        <Button
          variant={selectedTimeRange === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('month')}
        >
          Month
        </Button>
        <Button
          variant={selectedTimeRange === 'year' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('year')}
        >
          Year
        </Button>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
