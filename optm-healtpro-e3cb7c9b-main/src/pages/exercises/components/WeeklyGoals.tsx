
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, CheckCircle, Circle } from 'lucide-react';

// Mock goals data - in a real app, this would come from a backend
const weeklyGoals = [
  { id: 1, name: "Complete 3 exercise sessions", completed: true },
  { id: 2, name: "Improve squat form", completed: true },
  { id: 3, name: "Increase mobility by 5%", completed: false },
  { id: 4, name: "Practice daily stretching", completed: false }
];

const WeeklyGoals: React.FC = () => {
  const completedGoals = weeklyGoals.filter(goal => goal.completed).length;
  const totalGoals = weeklyGoals.length;
  const progress = Math.round((completedGoals / totalGoals) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <span>Weekly Goals</span>
        </CardTitle>
        <CardDescription>
          {completedGoals} of {totalGoals} completed ({progress}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {weeklyGoals.map((goal) => (
            <li key={goal.id} className="flex items-start gap-2">
              {goal.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                {goal.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WeeklyGoals;
