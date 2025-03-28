
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, ArrowRight, ArrowDown } from 'lucide-react';

interface BiomarkersDisplayProps {
  biomarkers: any;
  angles: {
    kneeAngle?: number | null;
    hipAngle?: number | null;
    ankleAngle?: number | null;
    shoulderAngle?: number | null;
  };
}

const BiomarkersDisplay: React.FC<BiomarkersDisplayProps> = ({ biomarkers, angles }) => {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-2 border-b bg-card/60">
        <CardTitle className="text-lg flex items-center">
          <BarChart className="h-4 w-4 mr-2 text-primary" />
          Biomechanical Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Angles Grid - responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 stats-grid-4">
          <MetricCard 
            title="Knee Angle" 
            value={angles.kneeAngle} 
            unit="°"
            status={getAngleStatus(angles.kneeAngle, 90, 100, 120, 160)}
          />
          <MetricCard 
            title="Hip Angle" 
            value={angles.hipAngle} 
            unit="°"
            status={getAngleStatus(angles.hipAngle, 70, 90, 120, 140)}
          />
          <MetricCard 
            title="Ankle Angle" 
            value={angles.ankleAngle} 
            unit="°"
            status={getAngleStatus(angles.ankleAngle, 70, 80, 100, 110)}
          />
          <MetricCard 
            title="Shoulder Angle" 
            value={angles.shoulderAngle} 
            unit="°"
            status={getAngleStatus(angles.shoulderAngle, 50, 70, 100, 120)}
          />
        </div>

        {/* Performance Metrics - 2 columns */}
        <div className="pt-3 border-t border-border/40">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-3 stats-grid-2">
            <MetricCard
              title="Balance"
              value={biomarkers.balance ? Math.round(biomarkers.balance * 100) : null}
              unit="%"
              status={getValue(biomarkers.balance, 0.7, 0.8, 0.9, 1.0)}
            />
            <MetricCard
              title="Symmetry"
              value={biomarkers.symmetry ? Math.round(biomarkers.symmetry * 100) : null}
              unit="%"
              status={getValue(biomarkers.symmetry, 0.7, 0.8, 0.9, 1.0)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type MetricStatus = 'optimal' | 'good' | 'warning' | 'error' | 'na';

interface MetricCardProps {
  title: string;
  value: number | null | undefined;
  unit?: string;
  status: MetricStatus;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, status }) => {
  const statusColors = {
    optimal: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    good: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    warning: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
    error: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    na: 'text-gray-400 bg-gray-50 dark:bg-gray-900/20'
  };

  return (
    <div className={`${statusColors[status]} rounded-lg p-3 text-center flex flex-col items-center justify-center metric-card`}>
      <div className="text-xs mb-1.5 metric-label">{title}</div>
      <div className="text-lg font-semibold metric-value">
        {value !== null && value !== undefined ? `${value.toFixed(0)}${unit || ''}` : '--'}
      </div>
    </div>
  );
};

// Helper function to determine angle status
const getAngleStatus = (
  angle: number | null | undefined, 
  optimal1: number, 
  optimal2: number, 
  warning1: number, 
  warning2: number
): MetricStatus => {
  if (angle === null || angle === undefined) return 'na';
  
  if (angle >= optimal1 && angle <= optimal2) return 'optimal';
  if (angle >= optimal1 - 15 && angle <= optimal2 + 15) return 'good';
  if (angle >= warning1 && angle <= warning2) return 'warning';
  return 'error';
};

// Helper function to determine value status
const getValue = (
  value: number | null | undefined,
  warning: number,
  good: number,
  optimal: number,
  perfect: number
): MetricStatus => {
  if (value === null || value === undefined) return 'na';
  
  if (value >= optimal) return 'optimal';
  if (value >= good) return 'good';
  if (value >= warning) return 'warning';
  return 'error';
};

export default BiomarkersDisplay;
