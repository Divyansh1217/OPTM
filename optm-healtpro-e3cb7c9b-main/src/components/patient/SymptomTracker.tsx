
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Biomarker, SymptomRecord } from '@/types/medicalData';
import { Progress } from '@/components/ui/progress';
import { Clipboard, TrendingUp, Clock } from 'lucide-react';

interface SymptomTrackerProps {
  symptoms: SymptomRecord[];
  biomarkers: Biomarker[];
}

const SymptomTracker: React.FC<SymptomTrackerProps> = ({ symptoms, biomarkers }) => {
  if (symptoms.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <Clipboard className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Symptom Data</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload medical reports or enter symptom data to track symptoms here.
          </p>
        </div>
      </Card>
    );
  }

  // Sort symptoms by severity for better visualization
  const sortedSymptoms = [...symptoms].sort((a, b) => b.severity - a.severity);
  
  // Prepare chart data
  const chartData = sortedSymptoms.map(symptom => ({
    name: symptom.symptomName,
    severity: symptom.severity,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Symptom Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Symptom Severity Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar 
                    dataKey="severity" 
                    fill="#8884d8"
                    radius={[0, 4, 4, 0]}
                    label={{ position: 'right', fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Average Severity</span>
                  <span className="font-bold">{(sortedSymptoms.reduce((acc, s) => acc + s.severity, 0) / sortedSymptoms.length).toFixed(1)}/10</span>
                </div>
                <Progress value={sortedSymptoms.reduce((acc, s) => acc + s.severity, 0) / sortedSymptoms.length * 10} className="h-2" />
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>
                  {sortedSymptoms.filter(s => s.severity > 5).length} high severity symptoms
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Last updated: {new Date(Math.max(...sortedSymptoms.map(s => new Date(s.timestamp).getTime()))).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {sortedSymptoms.map(symptom => (
          <SymptomCard 
            key={symptom.id} 
            symptom={symptom} 
            relatedBiomarkers={biomarkers.filter(b => symptom.relatedBiomarkers.includes(b.id))} 
          />
        ))}
      </div>
    </div>
  );
};

interface SymptomCardProps {
  symptom: SymptomRecord;
  relatedBiomarkers: Biomarker[];
}

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom, relatedBiomarkers }) => {
  // Get severity color
  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'text-red-600';
    if (severity >= 5) return 'text-amber-600';
    if (severity >= 3) return 'text-yellow-600';
    return 'text-green-600';
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{symptom.symptomName}</CardTitle>
          <div className={`text-lg font-bold ${getSeverityColor(symptom.severity)}`}>
            {symptom.severity}/10
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <span className="text-xs text-muted-foreground">
            Logged on {new Date(symptom.timestamp).toLocaleDateString()}
          </span>
        </div>
        
        <Progress value={symptom.severity * 10} className="h-2 mb-4" />
        
        {relatedBiomarkers.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Related Biomarkers:</h4>
            <ul className="text-xs space-y-1">
              {relatedBiomarkers.map(biomarker => (
                <li key={biomarker.id} className="flex justify-between">
                  <span>{biomarker.name}</span>
                  <span className={`${
                    biomarker.latestValue.status === 'normal' ? 'text-green-600' :
                    biomarker.latestValue.status === 'critical' ? 'text-red-600' :
                    'text-amber-600'
                  }`}>
                    {biomarker.latestValue.value} {biomarker.latestValue.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {symptom.notes && (
          <div className="mt-4 pt-2 border-t text-xs text-muted-foreground">
            {symptom.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SymptomTracker;
