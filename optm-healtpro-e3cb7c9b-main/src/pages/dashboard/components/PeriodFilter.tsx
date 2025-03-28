
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PeriodFilterProps {
  filterPeriod: string;
  setFilterPeriod: (value: string) => void;
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({ filterPeriod, setFilterPeriod }) => {
  return (
    <div className="flex justify-end mb-6 overflow-visible">
      <Card className="border border-border/30 overflow-visible">
        <CardContent className="p-2 flex items-center gap-2 overflow-visible">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm hidden xs:inline">Filter Period:</span>
          <Select defaultValue={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="h-8 w-auto min-w-24 border-none text-sm overflow-visible">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-card border border-border shadow-md">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodFilter;
