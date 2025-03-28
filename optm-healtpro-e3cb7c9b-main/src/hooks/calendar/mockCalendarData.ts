
import { addDays, addHours, format, setHours, setMinutes, startOfDay } from 'date-fns';
import { CalendarEvent, UpcomingAppointment } from './types';
import { AppointmentStatus } from '@/types/appointment';

// Generate mock calendar events
export const generateMockEvents = (startDate: Date): CalendarEvent[] => {
  const today = new Date(startDate);
  const events: CalendarEvent[] = [];

  // Common appointment types
  const appointmentTypes = [
    'Initial Consultation',
    'Follow-up',
    'Physical Therapy',
    'Treatment Session',
    'Evaluation'
  ];

  // Common patient names
  const patientNames = [
    'Alex Johnson',
    'Morgan Smith',
    'Jamie Williams',
    'Taylor Brown',
    'Jordan Davis',
    'Casey Miller',
    'Riley Wilson',
    'Quinn Moore',
    'Avery Thompson',
    'Dakota Lee'
  ];

  // Common locations
  const locations = [
    'Main Office',
    'North Clinic',
    'Telehealth',
    'South Branch',
    'West Wing'
  ];

  // Common statuses
  const statuses: AppointmentStatus[] = [
    'scheduled',
    'confirmed',
    'completed',
    'cancelled'
  ];

  // Generate events for the next 14 days
  for (let i = 0; i < 14; i++) {
    const currentDay = addDays(today, i);
    const appointmentsPerDay = Math.floor(Math.random() * 4) + 1; // 1-4 appointments per day
    
    for (let j = 0; j < appointmentsPerDay; j++) {
      const startHour = 9 + Math.floor(Math.random() * 8); // 9 AM to 5 PM
      const startTime = setHours(setMinutes(currentDay, 0), startHour);
      const endTime = addHours(startTime, 1); // 1 hour appointments
      
      const patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
      const appointmentType = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Generate a unique ID
      const id = `event-${i}-${j}-${Date.now()}`;
      
      events.push({
        id,
        title: `${appointmentType} with ${patientName}`,
        start: startTime,
        end: endTime,
        patientName,
        doctorName: 'Dr. Smith',
        type: appointmentType,
        location,
        status,
        notes: `Regular ${appointmentType.toLowerCase()} appointment with ${patientName}.`,
        patientId: `patient-${Math.floor(Math.random() * 1000)}`,
        doctorId: 'doctor-1'
      });
    }
  }
  
  return events;
};

// Map calendar events to upcoming appointments format
export const mapEventsToAppointments = (events: CalendarEvent[]): UpcomingAppointment[] => {
  const appointments: UpcomingAppointment[] = events.map(event => {
    const startDate = event.start instanceof Date ? event.start : new Date(event.start);
    const endDate = event.end instanceof Date ? event.end : new Date(event.end);
    
    return {
      id: event.id,
      title: event.title,
      date: startDate,
      time: format(startDate, 'h:mm a'),
      endTime: format(endDate, 'h:mm a'),
      patientName: event.patientName,
      patientId: event.patientId,
      type: event.type,
      status: event.status,
      notes: event.notes,
      location: event.location
    };
  });
  
  // Sort appointments by date and time
  return appointments.sort((a, b) => {
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};
