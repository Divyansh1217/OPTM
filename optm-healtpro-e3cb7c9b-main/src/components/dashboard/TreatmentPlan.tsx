
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Clock, ChevronRight } from 'lucide-react';

interface TreatmentTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface TreatmentPlanProps {
  title: string;
  date: string;
  tasks: TreatmentTask[];
  progress: number;
  className?: string;
}

const TreatmentPlan: React.FC<TreatmentPlanProps> = ({
  title,
  date,
  tasks,
  progress,
  className,
}) => {
  return (
    <motion.div
      className={cn("glass-morphism rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm text-muted-foreground">{date}</div>
      </div>
      
      {/* Progress bar with percentage label */}
      <div className="relative w-full h-2 bg-secondary rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <span className="absolute top-4 right-0 text-xs font-medium text-muted-foreground">
          {progress}% Complete
        </span>
      </div>
      
      {/* Task list with consistent spacing */}
      <div className="space-y-3 mt-6">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <div className="flex-shrink-0">
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-medical-green" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn(
                "text-sm font-medium truncate",
                task.completed ? "text-muted-foreground line-through" : ""
              )}>
                {task.title}
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
              <Clock className="w-3 h-3 mr-1" /> {task.time}
            </div>
          </div>
        ))}
      </div>
      
      {/* View complete plan button with arrow icon */}
      <button className="w-full mt-6 py-2.5 px-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
        View Complete Plan
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TreatmentPlan;
