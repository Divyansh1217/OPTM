
import { AppointmentStatus } from '@/types/appointment';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay?: boolean;
  description?: string;
  location?: string;
  patientId?: string;
  patientName?: string;
  doctorId?: string;
  doctorName?: string;
  status?: AppointmentStatus;
  type?: string;
  color?: string;
  isAvailable?: boolean;
  notes?: string;
}

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface UpcomingAppointment {
  id: string;
  title: string;
  date: Date | string;
  time: string;
  endTime: string;
  patientName?: string;
  patientId?: string;
  type?: string;
  location?: string;
  status?: AppointmentStatus;
  notes?: string;
}
