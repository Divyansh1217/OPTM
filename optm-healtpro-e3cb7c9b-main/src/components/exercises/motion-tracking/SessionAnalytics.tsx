import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { safeGetFromJson } from '@/types/human';

interface SessionAnalyticsProps {
  sessionId?: string;
  patientId?: string;
}

interface AnalyticsData {
  timestamp: string;
  kneeAngle: number;
  hipAngle: number;
  shoulderAngle: number;
  postureScore: number;
}

const SessionAnalytics: React.FC<SessionAnalyticsProps> = ({ sessionId, patientId }) => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!sessionId && !patientId) {
          setError('No session or patient ID provided');
          setIsLoading(false);
          return;
        }
        
        let query = supabase
          .from('body_analysis')
          .select('*')
          .order('timestamp', { ascending: true });
        
        if (sessionId) {
          query = query.eq('session_id', sessionId);
        } else if (patientId) {
          query = query.eq('patient_id', patientId).limit(100);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Transform data for chart with safe type checking
        const transformedData = data.map(item => {
          // Safely extract angle values with type checking
          const kneeAngle = safeGetFromJson(item.angles, 'kneeAngle', 0);
          const hipAngle = safeGetFromJson(item.angles, 'hipAngle', 0);
          const shoulderAngle = safeGetFromJson(item.angles, 'shoulderAngle', 0);
          
          return {
            timestamp: new Date(item.timestamp).toLocaleTimeString(),
            kneeAngle,
            hipAngle,
            shoulderAngle,
            postureScore: item.posture_score || 0
          };
        });
        
        setData(transformedData);
      } catch (err) {
        console.error('Error fetching session data:', err);
        setError('Failed to load session data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSessionData();
  }, [sessionId, patientId]);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session Analytics</CardTitle>
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
          <CardTitle>Session Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            No data available for this session yet. Complete some exercises to see analytics.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Angles Chart */}
          <div>
            <h3 className="text-sm font-medium mb-2">Body Angles</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 180]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="kneeAngle" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="hipAngle" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="shoulderAngle" stackId="3" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Posture Score Chart */}
          <div>
            <h3 className="text-sm font-medium mb-2">Posture Quality</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="postureScore" stroke="#2196F3" fill="#2196F3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionAnalytics;
