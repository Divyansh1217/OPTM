import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import PostureAnalyticsCard from '@/components/patient-dashboard/PostureAnalyticsCard';
import { Progress } from '@/components/ui/progress';
import { isJsonObject, safeGetFromJson } from '@/types/human';

interface PatientAnalyticsPageProps {
  patientId?: string;
}

const PatientAnalyticsPage: React.FC<PatientAnalyticsPageProps> = ({ patientId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [exerciseData, setExerciseData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        
        // Get current user if patientId not provided
        const userId = patientId || (await supabase.auth.getUser()).data.user?.id;
        
        // Fetch all sessions for this patient
        const { data: sessionData, error: sessionError } = await supabase
          .from('analysis_sessions')
          .select('*')
          .eq('patient_id', userId)
          .order('start_time', { ascending: false });
        
        if (sessionError) throw sessionError;
        
        setSessions(sessionData || []);
        
        // Process exercise data
        const exerciseTypes = sessionData
          ? [...new Set(sessionData.map(session => session.exercise_type))]
          : [];
        
        const exerciseStats = exerciseTypes.map(type => {
          const sessionsOfType = sessionData.filter(s => s.exercise_type === type);
          
          // Safely access nested properties with our helper functions
          const totalReps = sessionsOfType.reduce((sum, s) => {
            return sum + safeGetFromJson(s.summary, 'stats.totalReps', 0);
          }, 0);
          
          const goodReps = sessionsOfType.reduce((sum, s) => {
            return sum + safeGetFromJson(s.summary, 'stats.goodReps', 0);
          }, 0);
          
          const accuracy = totalReps > 0 ? Math.round((goodReps / totalReps) * 100) : 0;
          
          return {
            name: type,
            sessions: sessionsOfType.length,
            totalReps,
            goodReps,
            accuracy
          };
        });
        
        setExerciseData(exerciseStats);
        
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [patientId]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-[300px]" />
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const totalSessionsCount = sessions.length;
  const lastWeekSessions = sessions.filter(
    s => new Date(s.start_time) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  
  const totalRepsByDate = sessions.reduce((acc, session) => {
    const date = new Date(session.start_time).toLocaleDateString();
    const reps = safeGetFromJson(session.summary, 'stats.totalReps', 0);
    
    if (!acc[date]) {
      acc[date] = 0;
    }
    
    acc[date] += reps;
    return acc;
  }, {} as Record<string, number>);
  
  const dailyRepData = Object.keys(totalRepsByDate).map(date => ({
    date,
    reps: totalRepsByDate[date]
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSessionsCount}</div>
            <p className="text-sm text-muted-foreground">
              {lastWeekSessions} in the last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Exercises Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{exerciseData.length}</div>
            <p className="text-sm text-muted-foreground">
              {exerciseData.reduce((sum, ex) => sum + ex.totalReps, 0)} total repetitions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {exerciseData.length > 0 
                ? Math.round(exerciseData.reduce((sum, ex) => sum + ex.accuracy, 0) / exerciseData.length)
                : 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              Across all exercise types
            </p>
          </CardContent>
        </Card>
      </div>
      
      <PostureAnalyticsCard patientId={patientId} />
      
      <Card>
        <CardHeader>
          <CardTitle>Exercise Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detail">Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Exercise Completion Pie Chart */}
                <div className="h-[300px] flex items-center justify-center">
                  {exerciseData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={exerciseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="totalReps"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {exerciseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No exercise data available
                    </div>
                  )}
                </div>
                
                {/* Daily Reps Chart */}
                <div className="h-[300px]">
                  {dailyRepData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={dailyRepData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="reps" name="Repetitions" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Not enough data to display timeline
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="detail">
              <div className="space-y-6">
                {exerciseData.map((exercise, index) => (
                  <div key={index} className="space-y-2 border rounded-md p-4">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Sessions</div>
                        <div className="text-xl font-semibold">{exercise.sessions}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Reps</div>
                        <div className="text-xl font-semibold">{exercise.totalReps}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Good Form</div>
                        <div className="text-xl font-semibold">{exercise.goodReps}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mt-2 mb-1">
                        <span>Form Accuracy</span>
                        <span>{exercise.accuracy}%</span>
                      </div>
                      <Progress
                        value={exercise.accuracy}
                        className="h-2"
                        indicatorClassName={
                          exercise.accuracy > 85 ? 'bg-green-500' : 
                          exercise.accuracy > 70 ? 'bg-yellow-500' : 
                          'bg-orange-500'
                        }
                      />
                    </div>
                  </div>
                ))}
                
                {exerciseData.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No exercise data available
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <div className="space-y-4">
                <div className="h-[300px]">
                  {sessions.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={sessions.map(s => ({
                          date: new Date(s.start_time).toLocaleDateString(),
                          exercise: s.exercise_type,
                          duration: s.end_time 
                            ? (new Date(s.end_time).getTime() - new Date(s.start_time).getTime()) / 60000 
                            : 0
                        }))}
                        margin={{ top: 5, right: 5, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="duration" name="Duration (min)" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      Not enough data to display timeline
                    </div>
                  )}
                </div>
                
                <div className="border rounded-md">
                  <div className="flex font-medium text-sm px-4 py-2 border-b">
                    <div className="w-1/4">Date</div>
                    <div className="w-1/4">Exercise</div>
                    <div className="w-1/4">Duration</div>
                    <div className="w-1/4">Reps</div>
                  </div>
                  {sessions.slice(0, 10).map((session, index) => (
                    <div key={index} className="flex text-sm px-4 py-2 border-b last:border-b-0">
                      <div className="w-1/4">{new Date(session.start_time).toLocaleDateString()}</div>
                      <div className="w-1/4">{session.exercise_type}</div>
                      <div className="w-1/4">
                        {session.end_time 
                          ? Math.round((new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / 60000) 
                          : 'In progress'} min
                      </div>
                      <div className="w-1/4">{session.summary?.stats?.totalReps || 0}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientAnalyticsPage;
