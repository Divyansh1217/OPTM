
import { useState, useCallback, useMemo } from 'react';
import { AppointmentFilters, AppointmentSortOptions, Appointment } from '@/types/appointment';

export const useAppointmentFilters = (appointments: Appointment[]) => {
  const [filters, setFilters] = useState<AppointmentFilters>({});
  const [sort, setSort] = useState<AppointmentSortOptions>({
    field: 'date',
    direction: 'asc'
  });

  const setFilter = useCallback((key: keyof AppointmentFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      if (filters.search && !appointment.patientName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.status && appointment.status !== filters.status) {
        return false;
      }
      if (filters.startDate && new Date(appointment.date) < filters.startDate) {
        return false;
      }
      if (filters.endDate && new Date(appointment.date) > filters.endDate) {
        return false;
      }
      if (filters.doctorId && appointment.doctorId !== filters.doctorId) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const direction = sort.direction === 'asc' ? 1 : -1;
      switch (sort.field) {
        case 'date':
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction;
        case 'patientName':
          return a.patientName.localeCompare(b.patientName) * direction;
        case 'type':
          return a.type.localeCompare(b.type) * direction;
        case 'status':
          return a.status.localeCompare(b.status) * direction;
        default:
          return 0;
      }
    });
  }, [appointments, filters, sort]);

  return {
    filters,
    setFilter,
    sort,
    setSort,
    filteredAppointments
  };
};
