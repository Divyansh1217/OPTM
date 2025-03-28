import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  LabelList
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ThumbsUp,
  AlertTriangle,
  AlertCircle, 
  Ruler, 
  MoveHorizontal, 
  ImageIcon, 
  FileText, 
  RefreshCw,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  OptmPatientData,
  OptmAnalysisResult,
  ImprovementCategory,
  BIOMARKER_REFERENCE_RANGES
} from '@/types/optm-health';
import { analyzeOptmPatientData, prepareVisualizationData } from '@/utils/optmHealthUtils';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OptmHealthDashboardProps {
  currentData: OptmPatientData;
  previousData?: OptmPatientData;
  analysisResult?: OptmAnalysisResult;
  onRefreshAnalysis?: () => void;
  isLoading?: boolean;
}

const OptmHealthDashboard: React.FC<OptmHealthDashboardProps> = ({
  currentData,
  previousData,
  analysisResult: initialAnalysisResult,
  onRefreshAnalysis,
  isLoading = false
}) => {
  const [analysisResult, setAnalysisResult] = useState<OptmAnalysisResult | undefined>(
    initialAnalysisResult || (previousData ? analyzeOptmPatientData(currentData, previousData) : undefined)
  );
  
  const [activeTab, setActiveTab] = useState('summary');
  
  React.useEffect(() => {
    if (!analysisResult && previousData) {
      setAnalysisResult(analyzeOptmPatientData(currentData, previousData));
    }
  }, [currentData, previousData, analysisResult]);
  
  const visualizationData = React.useMemo(() => 
    prepareVisualizationData(currentData, previousData, analysisResult),
    [currentData, previousData, analysisResult]
  );
  
  const handleRefreshAnalysis = () => {
    if (previousData) {
      const newAnalysis = analyzeOptmPatientData(currentData, previousData);
      setAnalysisResult(newAnalysis);
    }
    
    if (onRefreshAnalysis) {
      onRefreshAnalysis();
    }
  };
  
  const getImprovementColor = (category: ImprovementCategory) => {
    switch (category) {
      case 'significant': return 'text-green-600';
      case 'moderate': return 'text-emerald-500';
      case 'minimal': return 'text-blue-500';
      case 'no-change': return 'text-amber-500';
      case 'deterioration': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getImprovementBadgeVariant = (category: ImprovementCategory): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (category) {
      case 'significant': 
      case 'moderate': 
        return 'default';
      case 'minimal': 
        return 'secondary';
      case 'no-change': 
        return 'outline';
      case 'deterioration': 
        return 'destructive';
      default: 
        return 'outline';
    }
  };
  
  const getImprovementIcon = (category: ImprovementCategory) => {
    switch (category) {
      case 'significant': return <TrendingUp className="h-4 w-4 mr-1" />;
      case 'moderate': return <TrendingUp className="h-4 w-4 mr-1" />;
      case 'minimal': return <TrendingUp className="h-4 w-4 mr-1" />;
      case 'no-change': return <Minus className="h-4 w-4 mr-1" />;
      case 'deterioration': return <TrendingDown className="h-4 w-4 mr-1" />;
      default: return <Activity className="h-4 w-4 mr-1" />;
    }
  };
  
  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="ml-2">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="ml-2">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline" className="ml-2">Low Priority</Badge>;
      default:
        return null;
    }
  };
  
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border shadow-lg rounded-lg">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}: </span>
              </div>
              <span className="font-medium">
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                {entry.unit || ''}
              </span>
            </div>
          ))}
          
          {payload.length > 1 && payload[0].payload.improvement !== undefined && (
            <div className="mt-2 pt-2 border-t text-sm">
              <div className="flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span>Improvement: </span>
                <span className="font-medium ml-1 text-green-500">
                  {payload[0].payload.improvement.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };
  
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border shadow-lg rounded-lg">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}: </span>
              </div>
              <span className="font-medium">
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                {entry.unit || ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border shadow-lg rounded-lg">
          <p className="font-medium mb-1">{payload[0].payload.metric}</p>
          <div className="flex items-center justify-between gap-3">
            <span>Progress: </span>
            <span className="font-medium">{payload[0].value.toFixed(1)}%</span>
          </div>
        </div>
      );
    }
    return null;
  };
  
  if (!currentData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Patient Data</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Please select a patient or enter OPTM Health patient data to view the dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{currentData.name}</CardTitle>
              <CardDescription>
                {currentData.age} years, {currentData.gender}, {currentData.treatmentStage} treatment stage
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshAnalysis}
              disabled={isLoading || !previousData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {analysisResult ? (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Overall Progress</h3>
                  <div className="flex items-center mb-1">
                    {getImprovementIcon(analysisResult.overallProgress.status)}
                    <span className={`font-semibold ${getImprovementColor(analysisResult.overallProgress.status)}`}>
                      {analysisResult.overallProgress.status.charAt(0).toUpperCase() + analysisResult.overallProgress.status.slice(1)} Improvement
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{analysisResult.overallProgress.summary}</p>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-medium mb-2">Last Updated</h3>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current assessment: {new Date(currentData.lastUpdated).toLocaleDateString()}
                    </p>
                    {previousData && (
                      <p className="text-sm text-muted-foreground">
                        Previous assessment: {new Date(previousData.lastUpdated).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-amber-500" />
              <p>No analysis data available. {previousData ? 'Refresh analysis to generate insights.' : 'A previous assessment is needed to perform comparative analysis.'}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Summary</span>
          </TabsTrigger>
          <TabsTrigger value="biomarkers" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Biomarkers</span>
          </TabsTrigger>
          <TabsTrigger value="anatomical" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span className="hidden sm:inline">Anatomical</span>
          </TabsTrigger>
          <TabsTrigger value="mobility" className="flex items-center gap-2">
            <MoveHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Mobility</span>
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Imaging</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Key Metrics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Biomarkers
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {analysisResult.biomarkerAnalysis.slice(0, 4).map((biomarker) => (
                        <li key={biomarker.marker} className="flex items-center">
                          {getImprovementIcon(biomarker.improvement)}
                          <span className={getImprovementColor(biomarker.improvement)}>
                            {biomarker.marker}: {biomarker.improvementPercentage > 0 ? '+' : ''}{biomarker.improvementPercentage.toFixed(1)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Ruler className="h-4 w-4 mr-2" />
                      Anatomical
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {analysisResult.anatomicalAnalysis.slice(0, 4).map((anatomical) => (
                        <li key={anatomical.measurement} className="flex items-center">
                          {getImprovementIcon(anatomical.improvement)}
                          <span className={getImprovementColor(anatomical.improvement)}>
                            {anatomical.measurement}: {anatomical.improvementPercentage > 0 ? '+' : ''}{anatomical.improvementPercentage.toFixed(1)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <MoveHorizontal className="h-4 w-4 mr-2" />
                      Mobility
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {analysisResult.mobilityAnalysis.slice(0, 4).map((mobility) => (
                        <li key={mobility.movement} className="flex items-center">
                          {getImprovementIcon(mobility.improvement)}
                          <span className={getImprovementColor(mobility.improvement)}>
                            {mobility.movement}: {mobility.improvementPercentage > 0 ? '+' : ''}{mobility.improvementPercentage.toFixed(1)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No analysis data available</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Treatment Recommendations</CardTitle>
              <CardDescription>
                Based on patient's progress and current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult?.recommendations && analysisResult.recommendations.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Exercise Protocol</h3>
                    <ul className="space-y-2">
                      {analysisResult.recommendations
                        .filter(r => r.category === 'exercise')
                        .map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <span>
                              {rec.description}
                              {getPriorityBadge(rec.priority)}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Medication & Lifestyle</h3>
                    <ul className="space-y-2">
                      {analysisResult.recommendations
                        .filter(r => r.category === 'medication' || r.category === 'lifestyle')
                        .map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ThumbsUp className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                            <span>
                              {rec.description}
                              {getPriorityBadge(rec.priority)}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Follow-up</h3>
                    <ul className="space-y-2">
                      {analysisResult.recommendations
                        .filter(r => r.category === 'follow-up')
                        .map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ThumbsUp className="h-5 w-5 mr-2 text-purple-500 mt-0.5" />
                            <span>
                              {rec.description}
                              {getPriorityBadge(rec.priority)}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No recommendations available</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {visualizationData?.radarChartData && visualizationData.radarChartData.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Progress Overview</CardTitle>
                    <CardDescription>
                      Comparison of progress across all metrics
                    </CardDescription>
                  </div>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">This radar chart shows progress across all key areas. Higher values (further from center) indicate better improvement.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={visualizationData.radarChartData}>
                      <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar
                        name="Progress"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Tooltip content={<CustomRadarTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs">
                    <span className="mr-1">Poor</span>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mx-1"></div>
                    <span className="ml-1">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="biomarkers" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Biomarker Analysis</CardTitle>
                  <CardDescription>
                    Detailed analysis of key musculoskeletal biomarkers
                  </CardDescription>
                </div>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Changes in biomarkers indicate physiological responses to treatment. Hover over bars for detailed information.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              {analysisResult?.biomarkerAnalysis && analysisResult.biomarkerAnalysis.length > 0 ? (
                <div className="space-y-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={visualizationData?.biomarkerChartData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          height={60}
                          tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fill: '#64748b', fontSize: 12 }}
                          tickFormatter={(value) => `${value}${visualizationData?.biomarkerChartData?.[0]?.unit || ''}`}
                        />
                        <Tooltip content={<CustomBarTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Bar 
                          dataKey="current" 
                          name="Current" 
                          fill="#8884d8" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        >
                          <LabelList dataKey="current" position="top" formatter={(value: number) => value.toFixed(1)} style={{ fontSize: 10, fill: '#64748b' }} />
                        </Bar>
                        <Bar 
                          dataKey="previous" 
                          name="Previous" 
                          fill="#82ca9d" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                        {visualizationData?.biomarkerChartData?.some(d => d.referenceMax !== undefined) && 
                          visualizationData.biomarkerChartData.map((item, index) => 
                            item.referenceMax !== undefined && (
                              <ReferenceLine 
                                key={`ref-max-${index}`}
                                y={item.referenceMax} 
                                stroke="#ef4444" 
                                strokeDasharray="3 3" 
                                isFront={true}
                                segment={[{ x: index, y: item.referenceMax }, { x: index + 0.8, y: item.referenceMax }]}
                              />
                            )
                          )
                        }
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#8884d8] rounded-full mr-1.5"></div>
                      <span>Current Value</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-1.5"></div>
                      <span>Previous Value</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-red-500 rounded-full mr-1.5 px-2"></div>
                      <span>Reference Maximum</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Detailed Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResult.biomarkerAnalysis.map((biomarker) => (
                        <div key={biomarker.marker} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{biomarker.marker}</h4>
                            <Badge variant={
                              biomarker.status === 'normal' ? 'outline' : 
                              biomarker.status === 'elevated' ? 'destructive' : 
                              'secondary'
                            }>
                              {biomarker.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current Value:</span>
                              <span className="font-medium">{biomarker.value} {BIOMARKER_REFERENCE_RANGES[biomarker.marker]?.unit}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Reference Range:</span>
                              <span>{biomarker.referenceRange}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Improvement:</span>
                              <span className={getImprovementColor(biomarker.improvement)}>
                                {biomarker.improvementPercentage > 0 ? '+' : ''}{biomarker.improvementPercentage.toFixed(1)}%
                              </span>
                            </div>
                            
                            <Separator className="my-2" />
                            
                            <p className="text-muted-foreground">
                              {biomarker.notes}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No biomarker data available for analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anatomical" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Anatomical Measurements</CardTitle>
              <CardDescription>
                Analysis of circumference and translational measurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult?.anatomicalAnalysis && analysisResult.anatomicalAnalysis.length > 0 ? (
                <div className="space-y-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={visualizationData?.anatomicalChartData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="current" name="Current" fill="#8884d8" />
                        <Bar dataKey="previous" name="Previous" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Detailed Analysis</h3>
                    
                    <div className="space-y-4">
                      {analysisResult.anatomicalAnalysis.map((measurement, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{measurement.measurement}</h4>
                            <Badge variant={getImprovementBadgeVariant(measurement.improvement)}>
                              {measurement.improvement}
                            </Badge>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Previous: {measurement.previous}</span>
                              <span>Current: {measurement.current}</span>
                            </div>
                            <Progress value={Math.min(100, Math.max(0, 50 + measurement.improvementPercentage/2))} />
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {measurement.notes}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Ruler className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No anatomical measurement data available for analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mobility" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mobility Analysis</CardTitle>
                  <CardDescription>
                    Analysis of range of motion and joint mobility
                  </CardDescription>
                </div>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Mobility measurements show joint range of motion improvements. Higher bars indicate better mobility. Target values show optimal ranges.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              {analysisResult?.mobilityAnalysis && analysisResult.mobilityAnalysis.length > 0 ? (
                <div className="space-y-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={visualizationData?.mobilityChartData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fill: '#64748b', fontSize: 12 }}
                          tickFormatter={(value) => `${value}°`}
                        />
                        <Tooltip content={<CustomBarTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Bar 
                          dataKey="current" 
                          name="Current" 
                          fill="#8884d8" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        >
                          <LabelList dataKey="current" position="top" formatter={(value: number) => `${value}°`} style={{ fontSize: 10, fill: '#64748b' }} />
                        </Bar>
                        <Bar 
                          dataKey="previous" 
                          name="Previous" 
                          fill="#82ca9d" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                        <Bar 
                          dataKey="target" 
                          name="Target" 
                          fill="#ff8042"
                          opacity={0.6}
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#8884d8] rounded-full mr-1.5"></div>
                      <span>Current Value</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-1.5"></div>
                      <span>Previous Value</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#ff8042] rounded-full mr-1.5"></div>
                      <span>Target Range</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {analysisResult.mobilityAnalysis.map((mobility, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{mobility.movement}</h4>
                          <Badge variant={getImprovementBadgeVariant(mobility.improvement)}>
                            {mobility.improvement}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Previous: {mobility.previous}°</span>
                            <span>Current: {mobility.current}°</span>
                            {mobility.target && <span className="text-muted-foreground">Target: ~{mobility.target}°</span>}
                          </div>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                  Progress
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-blue-600">
                                  {Math.min(100, Math.max(0, 50 + mobility.improvementPercentage/2))}%
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                              <div 
                                style={{ width: `${Math.min(100, Math.max(0, 50 + mobility.improvementPercentage/2))}%` }} 
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {mobility.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MoveHorizontal className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No mobility data available for analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="imaging" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Imaging Analysis</CardTitle>
              <CardDescription>
                Comparative analysis of diagnostic imaging
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult?.imagingAnalysis && analysisResult.imagingAnalysis.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentData.imaging.map((image) => {
                      const matchingAnalysis = analysisResult.imagingAnalysis.find(
                        analysis => analysis.type.toLowerCase().includes(image.bodyPart.toLowerCase())
                      );
                      
                      return (
                        <div key={image.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted p-3">
                            <h4 className="font-medium">{image.type.toUpperCase()} - {image.bodyPart}</h4>
                            <p className="text-xs text-muted-foreground">{new Date(image.date).toLocaleDateString()} ({image.stage})</p>
                          </div>
                          
                          <div className="p-3">
                            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md mb-3 flex items-center justify-center">
                              {image.imageUrl ? (
                                <img 
                                  src={image.imageUrl} 
                                  alt={`${image.type} of ${image.bodyPart}`} 
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                              )}
                            </div>
                            
                            {matchingAnalysis && (
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <Badge variant={getImprovementBadgeVariant(matchingAnalysis.improvement)} className="mr-2">
                                    {matchingAnalysis.improvement}
                                  </Badge>
                                  <span>{matchingAnalysis.comparison}</span>
                                </div>
                                
                                <p className="text-muted-foreground">
                                  {matchingAnalysis.findings}
                                </p>
                              </div>
                            )}
                            
                            {image.notes && (
                              <div className="mt-2 pt-2 border-t text-sm">
                                <p className="font-medium">Notes:</p>
                                <p className="text-muted-foreground">{image.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No imaging data available for analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OptmHealthDashboard;
