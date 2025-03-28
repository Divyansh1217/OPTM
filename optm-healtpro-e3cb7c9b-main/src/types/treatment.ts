
export interface TreatmentTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  frequency?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  type: 'medication' | 'exercise' | 'checkup' | 'other';
  category: string;
  notes?: string;
}
