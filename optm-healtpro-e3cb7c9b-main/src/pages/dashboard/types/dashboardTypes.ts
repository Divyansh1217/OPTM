
export interface DashboardData {
  upcomingAppointments: {
    id: string;
    patientName: string;
    patientId: number;
    time: string;
    date: string;
    type: string;
    status: 'confirmed' | 'scheduled' | 'cancelled';
  }[];
  therapySchedules: {
    id: string;
    patientName: string;
    patientId: number;
    therapyType: string;
    progress: number;
    sessionsCompleted: number;
    totalSessions: number;
    nextSession: string;
  }[];
  clinicMessages: {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isRead: boolean;
  }[];
  clinicDocuments: {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
  }[];
  clinicReminders: {
    id: string;
    title: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
  }[];
  calendarEvents: {
    [date: string]: {
      id: string;
      title: string;
      time: string;
      type: 'appointment' | 'meeting' | 'reminder';
    }[];
  };
  patients: {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    phone: string;
    email: string;
    condition: string;
    icdCode: string;
    lastVisit: string;
    nextVisit: string;
    medicalRecords: any[];
  }[];
}
