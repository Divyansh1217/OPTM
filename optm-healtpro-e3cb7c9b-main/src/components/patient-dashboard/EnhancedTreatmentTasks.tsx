
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TreatmentTask } from '@/types/treatment';
import { CheckCircle2, Clock, Tag, Calendar, Trophy, HeartPulse } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface EnhancedTreatmentTasksProps {
  tasks: TreatmentTask[];
}

const EnhancedTreatmentTasks: React.FC<EnhancedTreatmentTasksProps> = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };
  
  // Calculate progress
  const completionPercentage = Math.round((completedTasks.length / tasks.length) * 100);
  
  // Group tasks by category
  const groupedTasks: Record<string, TreatmentTask[]> = {};
  tasks.forEach(task => {
    if (!groupedTasks[task.category]) {
      groupedTasks[task.category] = [];
    }
    groupedTasks[task.category].push(task);
  });
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'medication':
        return HeartPulse;
      case 'exercise':
        return Trophy;
      case 'appointment':
        return Calendar;
      default:
        return Tag;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Treatment Plan</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{completionPercentage}%</span>
          <Progress value={completionPercentage} className="w-20 h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {Object.entries(groupedTasks).map(([category, categoryTasks]) => {
          const CategoryIcon = getCategoryIcon(category);
          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <CategoryIcon className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">{category}</h3>
              </div>
              
              <div className="space-y-2">
                {categoryTasks.map(task => {
                  const isCompleted = completedTasks.includes(task.id);
                  
                  return (
                    <div 
                      key={task.id}
                      className={cn(
                        "flex items-start gap-2 p-3 rounded-lg border transition-colors",
                        isCompleted ? "bg-primary/5 border-primary/10" : "bg-card"
                      )}
                    >
                      <Checkbox 
                        id={task.id}
                        checked={isCompleted}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-0.5"
                      />
                      
                      <div className="flex-1">
                        <label 
                          htmlFor={task.id}
                          className={cn(
                            "font-medium cursor-pointer",
                            isCompleted && "line-through text-muted-foreground"
                          )}
                        >
                          {task.title}
                        </label>
                        
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{task.dueTime}</span>
                          </div>
                          
                          {task.frequency && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{task.frequency}</span>
                            </div>
                          )}
                          
                          {isCompleted && (
                            <div className="ml-auto flex items-center gap-1 text-xs text-primary">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        <div className="flex justify-center pt-2">
          <div className="bg-primary/5 text-primary rounded-lg px-4 py-2 text-sm flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>You've completed {completedTasks.length} of {tasks.length} tasks!</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTreatmentTasks;
