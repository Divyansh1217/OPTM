
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Biomarker } from '@/types/medicalData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BiomarkerTrendsProps {
  biomarkers: Biomarker[];
}

const BiomarkerTrends: React.FC<BiomarkerTrendsProps> = ({ biomarkers }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const categories = ['all', ...new Set(biomarkers.map(b => b.category))];

  const filteredBiomarkers = selectedCategory === 'all' 
    ? biomarkers 
    : biomarkers.filter(b => b.category === selectedCategory);
  
  if (biomarkers.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <Activity className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Biomarker Data</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload medical reports or enter biomarker data to see trends and insights here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Biomarker Trends</h2>
        
        <div className="overflow-x-auto">
          <Tabs 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="flex">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize text-xs px-3 whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBiomarkers.map(biomarker => (
          <BiomarkerCard key={biomarker.id} biomarker={biomarker} />
        ))}
      </div>
    </div>
  );
};

const BiomarkerCard: React.FC<{ biomarker: Biomarker }> = ({ biomarker }) => {
  // Prepare chart data
  const chartData = biomarker.historicalValues
    .slice(0, 10) // Take the most recent 10 values
    .map((value, index) => ({
      date: new Date(value.timestamp).toLocaleDateString(),
      value: typeof value.value === 'number' ? value.value : 0,
    }))
    .reverse(); // Oldest to newest for the chart

  // Get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'elevated': return 'text-amber-600';
      case 'low': return 'text-amber-600';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  // Get trend icon
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-amber-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'elevated': 
      case 'low': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'critical': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{biomarker.name}</CardTitle>
            <CardDescription>{biomarker.category}</CardDescription>
          </div>
          <Badge variant={
            biomarker.latestValue.status === 'normal' ? 'outline' : 
            biomarker.latestValue.status === 'critical' ? 'destructive' : 
            'secondary'
          }>
            {biomarker.latestValue.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(biomarker.latestValue.status)}
            <span className={`text-xl font-bold ${getStatusColor(biomarker.latestValue.status)}`}>
              {biomarker.latestValue.value} {biomarker.latestValue.unit}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {getTrendIcon(biomarker.latestValue.trend)}
            <span className="text-xs">{biomarker.latestValue.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className="text-xs mb-2">
          Normal range: <span className="font-medium">{biomarker.latestValue.normalRange}</span>
        </div>
        
        {chartData.length > 1 ? (
          <div className="h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground py-4">
            Not enough data for trend visualization
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground">
          {biomarker.description.substring(0, 100)}
          {biomarker.description.length > 100 ? '...' : ''}
        </p>
      </CardFooter>
    </Card>
  );
};

export default BiomarkerTrends;
