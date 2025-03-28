
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, LineChart, Line } from 'recharts';
import { Button } from "@/components/ui/button";
import { ChevronDown, DownloadIcon, BarChart2, LineChart as LineChartIcon, PieChart } from 'lucide-react';

// Sample data - in a real app this would come from an API or context
const analyticsData = [
  { month: 'Jan', patients: 45, revenue: 12400, appointments: 62, cancellations: 8 },
  { month: 'Feb', patients: 52, revenue: 14800, appointments: 71, cancellations: 11 },
  { month: 'Mar', patients: 48, revenue: 13200, appointments: 65, cancellations: 7 },
  { month: 'Apr', patients: 61, revenue: 16800, appointments: 82, cancellations: 9 },
  { month: 'May', patients: 55, revenue: 15500, appointments: 74, cancellations: 12 },
  { month: 'Jun', patients: 67, revenue: 18400, appointments: 88, cancellations: 14 },
  { month: 'Jul', patients: 72, revenue: 19800, appointments: 95, cancellations: 10 },
  { month: 'Aug', patients: 68, revenue: 18200, appointments: 91, cancellations: 13 },
  { month: 'Sep', patients: 74, revenue: 20500, appointments: 98, cancellations: 15 },
  { month: 'Oct', patients: 79, revenue: 21400, appointments: 103, cancellations: 12 },
  { month: 'Nov', patients: 81, revenue: 22800, appointments: 108, cancellations: 16 },
  { month: 'Dec', patients: 76, revenue: 21200, appointments: 101, cancellations: 14 },
];

type ChartType = 'line' | 'area' | 'bar';
type MetricType = 'patients' | 'revenue' | 'appointments' | 'cancellations' | 'all';
type TimeRange = '3months' | '6months' | 'year' | 'all';

interface ClinicAnalyticsGraphProps {
  className?: string;
}

const ClinicAnalyticsGraph: React.FC<ClinicAnalyticsGraphProps> = ({ className }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [metricType, setMetricType] = useState<MetricType>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('year');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case '3months':
        return analyticsData.slice(-3);
      case '6months':
        return analyticsData.slice(-6);
      case 'year':
        return analyticsData;
      case 'all':
        return analyticsData;
      default:
        return analyticsData;
    }
  };
  
  const filteredData = getFilteredData();
  
  // Format tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="capitalize">{entry.dataKey}: </span>
              {entry.dataKey === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleDownloadChart = () => {
    // This would actually implement download functionality in a real app
    console.log('Downloading chart data...');
    // Could use a library like file-saver to export as CSV or PNG
  };
  
  // Render the appropriate chart type
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {(metricType === 'patients' || metricType === 'all') && 
              <Line yAxisId="left" type="monotone" dataKey="patients" stroke="#8884d8" name="Patients" />}
            {(metricType === 'revenue' || metricType === 'all') && 
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />}
            {(metricType === 'appointments' || metricType === 'all') && 
              <Line yAxisId="left" type="monotone" dataKey="appointments" stroke="#ff7300" name="Appointments" />}
            {(metricType === 'cancellations' || metricType === 'all') && 
              <Line yAxisId="left" type="monotone" dataKey="cancellations" stroke="#ff0000" name="Cancellations" />}
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart data={filteredData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {(metricType === 'patients' || metricType === 'all') && 
              <Bar dataKey="patients" fill="#8884d8" name="Patients" />}
            {(metricType === 'revenue' || metricType === 'all') && 
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />}
            {(metricType === 'appointments' || metricType === 'all') && 
              <Bar dataKey="appointments" fill="#ff7300" name="Appointments" />}
            {(metricType === 'cancellations' || metricType === 'all') && 
              <Bar dataKey="cancellations" fill="#ff0000" name="Cancellations" />}
          </BarChart>
        );
        
      case 'area':
      default:
        return (
          <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCancellations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff0000" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {(metricType === 'patients' || metricType === 'all') && 
              <Area type="monotone" dataKey="patients" stroke="#8884d8" fillOpacity={1} fill="url(#colorPatients)" name="Patients" />}
            {(metricType === 'revenue' || metricType === 'all') && 
              <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />}
            {(metricType === 'appointments' || metricType === 'all') && 
              <Area type="monotone" dataKey="appointments" stroke="#ff7300" fillOpacity={1} fill="url(#colorAppointments)" name="Appointments" />}
            {(metricType === 'cancellations' || metricType === 'all') && 
              <Area type="monotone" dataKey="cancellations" stroke="#ff0000" fillOpacity={1} fill="url(#colorCancellations)" name="Cancellations" />}
          </AreaChart>
        );
    }
  };
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Clinic Analytics</CardTitle>
            <CardDescription>Comprehensive view of your clinic's performance</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Area Chart
                </SelectItem>
                <SelectItem value="line" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  Line Chart
                </SelectItem>
                <SelectItem value="bar" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Bar Chart
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={metricType} onValueChange={(value: MetricType) => setMetricType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Metrics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="patients">Patients</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="appointments">Appointments</SelectItem>
                <SelectItem value="cancellations">Cancellations</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="year">Full Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" onClick={handleDownloadChart}>
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicAnalyticsGraph;
