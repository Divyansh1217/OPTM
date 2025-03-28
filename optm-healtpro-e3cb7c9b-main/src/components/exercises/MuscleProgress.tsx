
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { MuscleGroup, ProgressData } from '@/types/exercise.types';
import { BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MuscleProgressProps {
  muscleGroups: MuscleGroup[];
  progressData: ProgressData[];
}

const MuscleProgress: React.FC<MuscleProgressProps> = ({ muscleGroups, progressData }) => {
  // Sort muscle groups by progress (highest first)
  const sortedMuscleGroups = [...muscleGroups].sort((a, b) => b.progress - a.progress);
  
  return (
    <div className="space-y-4">
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={progressData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" fontSize={10} tickMargin={5} />
            <YAxis fontSize={10} tickFormatter={(value) => `${value}%`} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="strength" 
              stackId="1"
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.6}
              name="Strength"
            />
            <Area 
              type="monotone" 
              dataKey="flexibility" 
              stackId="1"
              stroke="#82ca9d" 
              fill="#82ca9d" 
              fillOpacity={0.6}
              name="Flexibility"
            />
            <Area 
              type="monotone" 
              dataKey="endurance" 
              stackId="1"
              stroke="#ffc658" 
              fill="#ffc658" 
              fillOpacity={0.6}
              name="Endurance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="pt-2 border-t">
        <h3 className="text-sm font-medium mb-3">Muscle Group Progress</h3>
        <div className="space-y-3">
          {sortedMuscleGroups.map((muscle) => (
            <div key={muscle.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">{muscle.name}</span>
                <span className="text-xs font-medium">{muscle.progress}%</span>
              </div>
              <Progress 
                value={muscle.progress} 
                className="h-2" 
                indicatorClassName={
                  muscle.progress > 75 ? "bg-green-500" : 
                  muscle.progress > 50 ? "bg-blue-500" : 
                  muscle.progress > 25 ? "bg-amber-500" : "bg-red-500"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MuscleProgress;
