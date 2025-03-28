
import { useState } from 'react';
import { TreatmentTask } from '@/types/treatment';

export const useTreatmentTasks = () => {
  // Mock treatment tasks data
  const [treatmentTasks] = useState<TreatmentTask[]>([
    {
      id: 't1',
      title: 'Take medication',
      description: 'Ibuprofen 400mg with food',
      dueDate: new Date(Date.now() + 3600000 * 4).toISOString(),
      dueTime: '12:00',
      priority: 'high',
      status: 'pending',
      type: 'medication',
      category: 'Pain Management'
    },
    {
      id: 't2',
      title: 'Physical therapy exercises',
      description: 'Complete the knee recovery routine',
      dueDate: new Date(Date.now() + 3600000 * 8).toISOString(),
      dueTime: '16:30',
      priority: 'medium',
      status: 'pending',
      type: 'exercise',
      category: 'Rehabilitation'
    },
    {
      id: 't3',
      title: 'MRI scan appointment',
      description: 'Check-in 15 minutes before appointment',
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      dueTime: '09:15',
      priority: 'medium',
      status: 'pending',
      type: 'checkup',
      category: 'Diagnostic'
    }
  ]);

  return treatmentTasks;
};
