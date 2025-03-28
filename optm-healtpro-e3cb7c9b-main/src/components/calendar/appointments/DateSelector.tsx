
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDate, cn } from '@/lib/utils';

interface DateSelectorProps {
  date: Date;
  setDate?: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate && setDate) {
      console.log("Date selected:", newDate);
      // Ensure we're setting a full date object with time preserved
      const updatedDate = new Date(newDate);
      
      // If the original date had time set, preserve it
      if (date) {
        updatedDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
      }
      
      setDate(updatedDate);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="date">Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date, "MMMM d, yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
