
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, ReferenceLine
} from 'recharts';
import { FitnessData } from '@/hooks/useFitnessIntegration';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Calendar, Clock, Dumbbell, Heart, Flame, 
  ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FitnessDataChartsProps {
  fitnessData: FitnessData;
  className?: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white dark:bg-gray-800 border rounded-md shadow-md text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-primary">
          {`${payload[0].name}: ${payload[0].value.toLocaleString()} ${unit}`}
        </p>
      </div>
    );
  }
  return null;
};

const MetricBadge = ({ value, prevValue }: { value: number, prevValue: number }) => {
  const diff = value - prevValue;
  const percentChange = prevValue ? (diff / prevValue) * 100 : 0;
  
  let color = '';
  let Icon = Minus;
  
  if (Math.abs(percentChange) < 1) {
    color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    Icon = Minus;
  } else if (percentChange > 0) {
    color = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    Icon = TrendingUp;
  } else {
    color = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    Icon = TrendingDown;
  }
  
  return (
    <Badge variant="outline" className={cn("ml-2", color)}>
      <Icon className="h-3 w-3 mr-1" />
      {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
    </Badge>
  );
};

const FitnessDataCharts: React.FC<FitnessDataChartsProps> = ({ fitnessData, className }) => {
  const [chartTimeframe, setChartTimeframe] = useState<'day' | 'week' | 'month'>('week');
  
  // Format data for step chart
  const stepChartData = useMemo(() => {
    return fitnessData.steps.data.map(item => ({
      date: format(parseISO(item.timestamp), 'EEE'),
      steps: item.value,
      goal: 10000 // Example step goal
    }));
  }, [fitnessData.steps.data]);

  // Format data for heart rate chart
  const heartRateData = useMemo(() => {
    return fitnessData.heartRate.data.map(item => ({
      time: format(parseISO(item.timestamp), 'HH:mm'),
      date: format(parseISO(item.timestamp), 'EEE'),
      bpm: item.value
    }));
  }, [fitnessData.heartRate.data]);

  // Format data for calories chart
  const calorieData = useMemo(() => {
    return fitnessData.calories.data.map(item => ({
      date: format(parseISO(item.timestamp), 'EEE'),
      calories: item.value
    }));
  }, [fitnessData.calories.data]);
  
  // Calculate average steps for current and previous periods
  const currentSteps = stepChartData.length > 0 
    ? Math.round(stepChartData.reduce((sum, item) => sum + item.steps, 0) / stepChartData.length) 
    : 0;
    
  const previousSteps = currentSteps * 0.9; // Simulated previous data
  
  // Calculate average heart rate
  const currentHeartRate = heartRateData.length > 0 
    ? Math.round(heartRateData.reduce((sum, item) => sum + item.bpm, 0) / heartRateData.length) 
    : 0;
    
  const previousHeartRate = currentHeartRate * 1.05; // Simulated previous data
  
  // Calculate total calories
  const totalCalories = calorieData.length > 0 
    ? calorieData.reduce((sum, item) => sum + item.calories, 0) 
    : 0;
    
  const previousCalories = totalCalories * 0.95; // Simulated previous data

  // Quick metric cards
  const renderMetricCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                <Activity className="h-4 w-4 mr-1.5 text-primary" />
                Daily Steps
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                {currentSteps.toLocaleString()}
                <MetricBadge value={currentSteps} prevValue={previousSteps} />
              </h3>
            </div>
            <div className="h-12 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stepChartData.slice(-7)}>
                  <defs>
                    <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="#4f46e5" 
                    fill="url(#stepsGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated {formatDistanceToNow(new Date(), { addSuffix: true })}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                <Heart className="h-4 w-4 mr-1.5 text-red-500" />
                Avg. Heart Rate
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                {currentHeartRate} bpm
                <MetricBadge value={currentHeartRate} prevValue={previousHeartRate} />
              </h3>
            </div>
            <div className="h-12 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData.slice(-7)}>
                  <Line 
                    type="monotone" 
                    dataKey="bpm" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated {formatDistanceToNow(new Date(), { addSuffix: true })}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                <Flame className="h-4 w-4 mr-1.5 text-orange-500" />
                Calories Burned
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                {totalCalories.toLocaleString()}
                <MetricBadge value={totalCalories} prevValue={previousCalories} />
              </h3>
            </div>
            <div className="h-12 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calorieData.slice(-7)}>
                  <defs>
                    <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#f97316" 
                    fill="url(#caloriesGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated {formatDistanceToNow(new Date(), { addSuffix: true })}
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={className}>
      {renderMetricCards()}
      
      <Tabs defaultValue="steps">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="steps" className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              <span>Steps</span>
            </TabsTrigger>
            <TabsTrigger value="heart-rate" className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5" />
              <span>Heart Rate</span>
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" />
              <span>Calories</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={chartTimeframe === 'day' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setChartTimeframe('day')}
            >
              Day
            </Badge>
            <Badge 
              variant={chartTimeframe === 'week' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setChartTimeframe('week')}
            >
              Week
            </Badge>
            <Badge 
              variant={chartTimeframe === 'month' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => setChartTimeframe('month')}
            >
              Month
            </Badge>
          </div>
        </div>
        
        <TabsContent value="steps">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Daily Steps</CardTitle>
              <CardDescription>
                Your step activity from Google Fit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {stepChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stepChartData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                      <XAxis dataKey="date" />
                      <YAxis width={50} />
                      <Tooltip content={<CustomTooltip unit="steps" />} />
                      <Legend />
                      <ReferenceLine y={10000} stroke="#4f46e5" strokeDasharray="3 3" label={{ value: 'Goal', position: 'right', fill: '#4f46e5' }} />
                      <Bar dataKey="steps" name="Steps" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No step data available from Google Fit
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Data from Google Fit
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="heart-rate">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Heart Rate</CardTitle>
              <CardDescription>
                Your heart rate measurements from Google Fit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {heartRateData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heartRateData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                      <XAxis dataKey="date" />
                      <YAxis width={50} domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip content={<CustomTooltip unit="bpm" />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="bpm" 
                        name="Heart Rate" 
                        stroke="#ef4444" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No heart rate data available from Google Fit
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Measured throughout the day by your connected devices
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="calories">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Daily Calories Burned</CardTitle>
              <CardDescription>
                Estimated calories burned tracked by Google Fit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {calorieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calorieData}>
                      <defs>
                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                      <XAxis dataKey="date" />
                      <YAxis width={50} />
                      <Tooltip content={<CustomTooltip unit="kcal" />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="calories" 
                        name="Calories" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorCalories)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No calorie data available from Google Fit
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Flame className="h-3 w-3" />
                Calculated from your activity and exercise data
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FitnessDataCharts;
