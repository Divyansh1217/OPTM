
export interface DashboardMainContentProps {
  healthMetrics: {
    heartRate: { value: string | number; unit: string; change: number; source?: string; lastSync?: string };
    bloodPressure: { value: string; unit: string; change: number; source?: string; lastSync?: string };
    temperature: { value: string | number; unit: string; change: number; source?: string; lastSync?: string };
    oxygen: { value: string | number; unit: string; change: number; source?: string; lastSync?: string };
  };
  activityData: {
    data: { day: string; value: number }[];
    currentValue: number;
    source?: string;
    lastSync?: string;
  };
  treatmentTasks: {
    id: string;
    title: string;
    time: string;
    completed: boolean;
  }[];
  upcomingAppointments: {
    id: string;
    date: string;
    time: string;
    doctor: string;
    type: string;
    status?: string;
    location?: string;
  }[];
  biologicalAge: number;
  chronologicalAge: number;
  hasConnectedApps: boolean;
  onSyncData: () => Promise<void>;
  handleConfirmAppointment?: (id: string) => void;
  handleRescheduleAppointment?: (id: string) => void;
}

export type ColumnProps = DashboardMainContentProps;
