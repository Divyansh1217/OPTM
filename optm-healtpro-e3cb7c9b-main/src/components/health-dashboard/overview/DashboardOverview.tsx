
import React from 'react';
import { Footprints, Heart, Flame, Activity, Clock } from 'lucide-react';
import MetricCard from '../metrics/MetricCard';

interface DashboardOverviewProps {
  healthData: any;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ healthData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <MetricCard 
        title="Steps"
        value={healthData?.activity?.steps?.value || 0}
        unit="steps"
        target={10000}
        icon={<Footprints className="h-5 w-5 text-primary" />}
        trend={healthData?.activity?.steps?.trend}
        change={healthData?.activity?.steps?.change}
      />
      <MetricCard 
        title="Heart Rate"
        value={healthData?.vitalSigns?.heartRate?.value || 0}
        unit="bpm"
        icon={<Heart className="h-5 w-5 text-primary" />}
        status={healthData?.vitalSigns?.heartRate?.status}
      />
      <MetricCard 
        title="Calories"
        value={healthData?.activity?.calories?.value || 0}
        unit="kcal"
        target={2000}
        icon={<Flame className="h-5 w-5 text-primary" />}
        trend={healthData?.activity?.calories?.trend}
      />
      <MetricCard 
        title="Distance"
        value={healthData?.activity?.distance?.value || 0}
        unit="km"
        target={5}
        icon={<Activity className="h-5 w-5 text-primary" />}
        trend={healthData?.activity?.distance?.trend}
      />
      <MetricCard 
        title="Sleep"
        value={healthData?.sleep?.duration?.value || 0}
        unit="hrs"
        target={8}
        icon={<Clock className="h-5 w-5 text-primary" />}
        status={healthData?.sleep?.duration?.status}
      />
    </div>
  );
};

export default DashboardOverview;
