
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ArrowUpDown } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Appointment, AppointmentStatus } from '@/types/appointment';
import { useAppointmentFilters } from '@/hooks/appointments/useAppointmentFilters';

interface AppointmentListProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-gray-100 text-gray-800'
};

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onAppointmentClick
}) => {
  const {
    filters,
    setFilter,
    sort,
    setSort,
    filteredAppointments
  } = useAppointmentFilters(appointments);

  const handleSort = (field: 'date' | 'patientName' | 'type' | 'status') => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search patients..."
          value={filters.search || ''}
          onChange={(e) => setFilter('search', e.target.value)}
          className="max-w-xs"
        />
        
        <Select
          value={filters.status}
          onValueChange={(value) => setFilter('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Date Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{
                from: filters.startDate,
                to: filters.endDate
              }}
              onSelect={(range) => {
                setFilter('startDate', range?.from);
                setFilter('endDate', range?.to);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium">
          <Button variant="ghost" onClick={() => handleSort('date')} className="flex items-center">
            Date/Time <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => handleSort('patientName')} className="flex items-center">
            Patient <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => handleSort('type')} className="flex items-center">
            Type <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => handleSort('status')} className="flex items-center">
            Status <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          <div>Actions</div>
        </div>

        <div className="divide-y">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onAppointmentClick(appointment)}
            >
              <div>
                <div className="font-medium">{formatDate(appointment.date, "MMM d, yyyy")}</div>
                <div className="text-sm text-muted-foreground">{appointment.time}</div>
              </div>
              <div className="font-medium">{appointment.patientName}</div>
              <div>{appointment.type}</div>
              <div>
                <Badge 
                  variant="secondary"
                  className={cn("capitalize", statusColors[appointment.status])}
                >
                  {appointment.status}
                </Badge>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
