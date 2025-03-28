
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed';

export interface AppointmentFilters {
  search?: string;
  status?: AppointmentStatus;
  startDate?: Date;
  endDate?: Date;
  doctorId?: string;
}

export interface AppointmentSortOptions {
  field: 'date' | 'patientName' | 'type' | 'status';
  direction: 'asc' | 'desc';
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId?: string;
  doctorId?: string;
  doctorName?: string;
  date: Date;
  time: string;
  endTime: string;
  type: string;
  status: AppointmentStatus;
  notes?: string;
  location?: string;
}
