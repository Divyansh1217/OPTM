
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthMetric } from '@/types/health';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedMetricsOverviewProps {
  metrics: HealthMetric[];
}

const EnhancedMetricsOverview: React.FC<EnhancedMetricsOverviewProps> = ({ metrics }) => {
  // Generate additional data for visualization
  const weeklyData = [
    { day: 'Mon', steps: 7521, calories: 2100, sleep: 7.2, water: 1.8 },
    { day: 'Tue', steps: 9834, calories: 2254, sleep: 6.8, water: 2.1 },
    { day: 'Wed', steps: 8426, calories: 2310, sleep: 7.5, water: 2.3 },
    { day: 'Thu', steps: 7012, calories: 2145, sleep: 6.5, water: 1.9 },
    { day: 'Fri', steps: 9142, calories: 2290, sleep: 7.1, water: 2.0 },
    { day: 'Sat', steps: 10532, calories: 2460, sleep: 8.2, water: 2.2 },
    { day: 'Sun', steps: 6248, calories: 2050, sleep: 7.8, water: 1.7 }
  ];
  
  // Calculate averages
  const avgSteps = Math.round(weeklyData.reduce((sum, day) => sum + day.steps, 0) / 7);
  const avgCalories = Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / 7);
  const avgSleep = (weeklyData.reduce((sum, day) => sum + day.sleep, 0) / 7).toFixed(1);
  const avgWater = (weeklyData.reduce((sum, day) => sum + day.water, 0) / 7).toFixed(1);
  
  // Get trend indicators
  const getStepsTrend = () => {
    const lastTwoDays = [weeklyData[5].steps, weeklyData[6].steps];
    if (lastTwoDays[1] > lastTwoDays[0]) return { icon: TrendingUp, color: 'text-green-500' };
    if (lastTwoDays[1] < lastTwoDays[0]) return { icon: TrendingDown, color: 'text-red-500' };
    return { icon: Minus, color: 'text-gray-500' };
  };
  
  const getCaloriesTrend = () => {
    const lastTwoDays = [weeklyData[5].calories, weeklyData[6].calories];
    if (lastTwoDays[1] > lastTwoDays[0]) return { icon: TrendingUp, color: 'text-red-500' };
    if (lastTwoDays[1] < lastTwoDays[0]) return { icon: TrendingDown, color: 'text-green-500' };
    return { icon: Minus, color: 'text-gray-500' };
  };
  
  const getSleepTrend = () => {
    const lastTwoDays = [weeklyData[5].sleep, weeklyData[6].sleep];
    if (lastTwoDays[1] > lastTwoDays[0]) return { icon: TrendingUp, color: 'text-green-500' };
    if (lastTwoDays[1] < lastTwoDays[0]) return { icon: TrendingDown, color: 'text-red-500' };
    return { icon: Minus, color: 'text-gray-500' };
  };
  
  const getWaterTrend = () => {
    const lastTwoDays = [weeklyData[5].water, weeklyData[6].water];
    if (lastTwoDays[1] > lastTwoDays[0]) return { icon: TrendingUp, color: 'text-green-500' };
    if (lastTwoDays[1] < lastTwoDays[0]) return { icon: TrendingDown, color: 'text-red-500' };
    return { icon: Minus, color: 'text-gray-500' };
  };
  
  const stepsTrend = getStepsTrend();
  const caloriesTrend = getCaloriesTrend();
  const sleepTrend = getSleepTrend();
  const waterTrend = getWaterTrend();
  
  const StepsIcon = stepsTrend.icon;
  const CaloriesIcon = caloriesTrend.icon;
  const SleepIcon = sleepTrend.icon;
  const WaterIcon = waterTrend.icon;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Weekly Health Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Daily Steps</h3>
            <div className="flex items-center gap-1">
              <StepsIcon className={cn("h-4 w-4", stepsTrend.color)} />
              <span className={cn("text-xs font-medium", stepsTrend.color)}>
                {Math.abs(weeklyData[6].steps - weeklyData[5].steps)} steps
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold">{avgSteps.toLocaleString()}</span>
            <span className="ml-1 text-xs text-muted-foreground">avg steps/day</span>
          </div>
          
          <div className="h-32 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide domain={[0, 12000]} />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} steps`, 'Steps']}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar dataKey="steps" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex flex-col rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Calories</h3>
            <div className="flex items-center gap-1">
              <CaloriesIcon className={cn("h-4 w-4", caloriesTrend.color)} />
              <span className={cn("text-xs font-medium", caloriesTrend.color)}>
                {Math.abs(weeklyData[6].calories - weeklyData[5].calories)} kcal
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold">{avgCalories}</span>
            <span className="ml-1 text-xs text-muted-foreground">avg calories/day</span>
          </div>
          
          <div className="h-32 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide domain={[1800, 2600]} />
                <Tooltip
                  formatter={(value) => [`${value} kcal`, 'Calories']}
                  cursor={{ stroke: 'rgba(0, 0, 0, 0.05)', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  fill="url(#colorCalories)" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex flex-col rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Sleep Duration</h3>
            <div className="flex items-center gap-1">
              <SleepIcon className={cn("h-4 w-4", sleepTrend.color)} />
              <span className={cn("text-xs font-medium", sleepTrend.color)}>
                {Math.abs(weeklyData[6].sleep - weeklyData[5].sleep).toFixed(1)} hrs
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold">{avgSleep}</span>
            <span className="ml-1 text-xs text-muted-foreground">avg hours/day</span>
          </div>
          
          <div className="h-32 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide domain={[5, 9]} />
                <Tooltip
                  formatter={(value) => [`${value} hours`, 'Sleep']}
                  cursor={{ stroke: 'rgba(0, 0, 0, 0.05)', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sleep" 
                  fill="url(#colorSleep)" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex flex-col rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Water Intake</h3>
            <div className="flex items-center gap-1">
              <WaterIcon className={cn("h-4 w-4", waterTrend.color)} />
              <span className={cn("text-xs font-medium", waterTrend.color)}>
                {Math.abs(weeklyData[6].water - weeklyData[5].water).toFixed(1)} L
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold">{avgWater}</span>
            <span className="ml-1 text-xs text-muted-foreground">avg liters/day</span>
          </div>
          
          <div className="h-32 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis hide domain={[0, 3]} />
                <Tooltip
                  formatter={(value) => [`${value} liters`, 'Water']}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar dataKey="water" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMetricsOverview;
