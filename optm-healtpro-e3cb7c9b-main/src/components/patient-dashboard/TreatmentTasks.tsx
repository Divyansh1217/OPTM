
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Pill, Dumbbell, Stethoscope, AlertCircle } from 'lucide-react';
import { TreatmentTask } from '@/types/treatment';

interface TreatmentTasksProps {
  tasks: TreatmentTask[];
}

const TreatmentTasks: React.FC<TreatmentTasksProps> = ({ tasks }) => {
  // Default tasks if none provided
  const defaultTasks: TreatmentTask[] = [
    {
      id: '1',
      title: 'Take medication',
      description: 'Ibuprofen 400mg after meals',
      dueDate: new Date().toISOString(),
      dueTime: '08:00',
      priority: 'high',
      status: 'pending',
      type: 'medication',
      category: 'Pain Management'
    },
    {
      id: '2',
      title: 'Physical therapy exercises',
      description: 'Complete shoulder mobility routine',
      dueDate: new Date().toISOString(),
      dueTime: '14:00',
      priority: 'medium',
      status: 'pending',
      type: 'exercise',
      category: 'Rehabilitation'
    },
    {
      id: '3',
      title: 'Blood test follow-up',
      description: 'Review results with Dr. Johnson',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      dueTime: '10:30',
      priority: 'medium',
      status: 'pending',
      type: 'checkup',
      category: 'Lab Work'
    }
  ];

  const tasksToDisplay = tasks && tasks.length > 0 ? tasks : defaultTasks;

  // Get icon based on task type
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-4 w-4 text-blue-500" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4 text-green-500" />;
      case 'checkup':
        return <Stethoscope className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-orange-500" />;
    }
  };

  // Get status based on task priority
  const getStatusClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Treatment Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasksToDisplay.map((task) => (
          <div key={task.id} className="flex items-start space-x-3 rounded-md border p-3">
            <div className="mt-0.5">
              {getTaskIcon(task.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{task.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{task.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>
                  {new Date(task.dueDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TreatmentTasks;
