
export interface TreatmentTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

export interface HealthMetricData {
  value: number | string;
  unit: string;
  change?: number;
  source?: string;
  timestamp?: string;
}

export interface HealthMetrics {
  heartRate: HealthMetricData;
  bloodPressure: HealthMetricData;
  temperature: HealthMetricData;
  oxygen: HealthMetricData;
}

export interface DashboardAppointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
}
