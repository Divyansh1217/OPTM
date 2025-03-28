import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { safeGetFromJson } from '@/types/human';

interface PostureAnalyticsCardProps {
  patientId?: string;
}

interface PostureMetric {
  name: string;
  score: number;
  status: 'good' | 'moderate' | 'poor';
  recommendation: string;
}

const PostureAnalyticsCard: React.FC<PostureAnalyticsCardProps> = ({ patientId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [metrics, setMetrics] = useState<PostureMetric[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('summary');
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the most recent analysis sessions for this patient
        const { data: sessionData, error: sessionError } = await supabase
          .from('analysis_sessions')
          .select('id, exercise_type, start_time, end_time, summary')
          .eq('patient_id', patientId || (await supabase.auth.getUser()).data.user?.id)
          .order('start_time', { ascending: false })
          .limit(5);
        
        if (sessionError) throw sessionError;
        
        if (!sessionData || sessionData.length === 0) {
          setError('No analysis sessions found');
          setIsLoading(false);
          return;
        }
        
        // Fetch the body analysis data for the recent sessions
        const sessionIds = sessionData.map(session => session.id);
        const { data: analysisData, error: analysisError } = await supabase
          .from('body_analysis')
          .select('*')
          .in('session_id', sessionIds)
          .order('timestamp', { ascending: true });
        
        if (analysisError) throw analysisError;
        
        if (!analysisData || analysisData.length === 0) {
          setError('No analysis data found');
          setIsLoading(false);
          return;
        }
        
        // Calculate overall posture score from biomarkers with safe type checking
        const postureScores = analysisData
          .filter(item => item.posture_score !== null)
          .map(item => item.posture_score);
        
        const avgPostureScore = postureScores.length > 0
          ? Math.round(postureScores.reduce((sum, score) => sum + score, 0) / postureScores.length)
          : 0;
        
        setOverallScore(avgPostureScore);
        
        // Generate metrics based on collected data with safe type checking
        const shoulderScores = analysisData
          .filter(item => item.biomarkers !== null)
          .map(item => safeGetFromJson(item.biomarkers, 'shoulderSymmetry', 0));
        
        const avgShoulderScore = shoulderScores.length > 0
          ? Math.round(shoulderScores.reduce((sum, score) => sum + score, 0) / shoulderScores.length)
          : 0;
        
        const balanceScores = analysisData
          .filter(item => item.biomarkers !== null)
          .map(item => safeGetFromJson(item.biomarkers, 'balanceScore', 0));
        
        const avgBalanceScore = balanceScores.length > 0
          ? Math.round(balanceScores.reduce((sum, score) => sum + score, 0) / balanceScores.length)
          : 0;
        
        // Extract neck angles for posture analysis with safe type checking
        const neckAngles = analysisData
          .filter(item => item.angles !== null)
          .map(item => safeGetFromJson(item.angles, 'neckAngle', 0));
        
        const avgNeckAngle = neckAngles.length > 0
          ? Math.round(neckAngles.reduce((sum, angle) => sum + angle, 0) / neckAngles.length)
          : 0;
        
        // Calculate spine alignment score (simplified estimation based on available data)
        const spineScore = Math.round((avgPostureScore + avgShoulderScore + avgBalanceScore) / 3);
        
        // Generate metrics
        const newMetrics: PostureMetric[] = [
          {
            name: 'Neck Alignment',
            score: avgNeckAngle > 20 ? Math.max(0, 100 - (avgNeckAngle - 20) * 5) : 90,
            status: avgNeckAngle > 30 ? 'poor' : avgNeckAngle > 15 ? 'moderate' : 'good',
            recommendation: avgNeckAngle > 30 
              ? 'Significant forward head posture. Try chin tuck exercises and ergonomic adjustments.' 
              : 'Maintain awareness of neck position during daily activities.'
          },
          {
            name: 'Shoulder Balance',
            score: avgShoulderScore,
            status: avgShoulderScore > 85 ? 'good' : avgShoulderScore > 70 ? 'moderate' : 'poor',
            recommendation: avgShoulderScore < 70 
              ? 'Shoulder imbalance detected. Consider shoulder strengthening exercises.' 
              : 'Continue shoulder mobility exercises.'
          },
          {
            name: 'Spine Alignment',
            score: spineScore,
            status: spineScore > 85 ? 'good' : spineScore > 70 ? 'moderate' : 'poor',
            recommendation: spineScore < 70 
              ? 'Core strengthening recommended to improve spinal alignment.' 
              : 'Maintain good posture habits and regular physical activity.'
          },
          {
            name: 'Balance',
            score: avgBalanceScore,
            status: avgBalanceScore > 85 ? 'good' : avgBalanceScore > 70 ? 'moderate' : 'poor',
            recommendation: avgBalanceScore < 70 
              ? 'Balance training exercises recommended.' 
              : 'Continue stability and balance exercises.'
          }
        ];
        
        setMetrics(newMetrics);
        
        // Prepare timeline data for the chart with safe type checking
        const timeData = sessionData.map(session => {
          const sessionAnalysis = analysisData
            .filter(item => item.session_id === session.id);
          
          const avgSessionPostureScore = sessionAnalysis
            .filter(item => item.posture_score !== null)
            .reduce((sum, item) => sum + (item.posture_score || 0), 0) / 
            sessionAnalysis.filter(item => item.posture_score !== null).length || 0;
          
          // Safely access nested properties
          const accuracy = safeGetFromJson(session.summary, 'stats.accuracy', 0);
          
          return {
            date: new Date(session.start_time).toLocaleDateString(),
            posture: session.exercise_type,
            score: Math.round(avgSessionPostureScore),
            improvement: `${accuracy}%`
          };
        }).reverse();
        
        setTimelineData(timeData);
        
      } catch (err) {
        console.error('Error fetching posture analytics:', err);
        setError('Failed to load posture analytics');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [patientId]);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posture Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posture Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Posture Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="detail">Details</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Posture Score</span>
                  <span className="text-sm font-medium">{overallScore}%</span>
                </div>
                <Progress 
                  value={overallScore} 
                  className="h-2" 
                  indicatorClassName={
                    overallScore > 85 ? 'bg-green-500' : 
                    overallScore > 70 ? 'bg-yellow-500' : 
                    'bg-orange-500'
                  } 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm font-medium">{metric.score}%</span>
                    </div>
                    <Progress 
                      value={metric.score} 
                      className="h-2 mb-2" 
                      indicatorClassName={
                        metric.status === 'good' ? 'bg-green-500' : 
                        metric.status === 'moderate' ? 'bg-yellow-500' : 
                        'bg-orange-500'
                      } 
                    />
                    <p className="text-xs text-muted-foreground">{metric.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detail">
            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-sm font-medium">{metric.name}</h3>
                  <Progress 
                    value={metric.score} 
                    className="h-2" 
                    indicatorClassName={
                      metric.status === 'good' ? 'bg-green-500' : 
                      metric.status === 'moderate' ? 'bg-yellow-500' : 
                      'bg-orange-500'
                    } 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}</span>
                    <span>{metric.score}%</span>
                  </div>
                  <p className="text-sm mt-1">{metric.recommendation}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            {timelineData.length > 0 ? (
              <div className="space-y-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timelineData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="score" stroke="#2196F3" fill="#2196F3" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="border rounded-md">
                  <div className="flex font-medium text-sm px-4 py-2 border-b">
                    <div className="w-1/3">Date</div>
                    <div className="w-1/3">Exercise</div>
                    <div className="w-1/3">Score</div>
                  </div>
                  {timelineData.map((item, index) => (
                    <div key={index} className="flex text-sm px-4 py-2 border-b last:border-b-0">
                      <div className="w-1/3">{item.date}</div>
                      <div className="w-1/3">{item.posture}</div>
                      <div className="w-1/3">{item.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Not enough data to display timeline. Complete more sessions to see progress.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostureAnalyticsCard;
