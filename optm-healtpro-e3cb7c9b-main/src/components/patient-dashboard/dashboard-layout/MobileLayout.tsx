
import React from 'react';
import { Heart, Activity, Thermometer, Droplet } from 'lucide-react';
import { CardGrid } from '@/components/ui/card-grid';
import PersonalInformation from '../PersonalInformation';
import HealthSyncButton from '../HealthSyncButton';
import BiologicalAge from '@/components/dashboard/BiologicalAge';
import HealthMetric from '@/components/dashboard/HealthMetric';
import ActivityTracker from '@/components/dashboard/ActivityTracker';
import UpcomingAppointmentsCard from '../UpcomingAppointmentsCard';
import TreatmentPlan from '@/components/dashboard/TreatmentPlan';
import SymptomProgressChart from '@/components/dashboard/SymptomProgressChart';
import SymptomTracker from '@/components/dashboard/SymptomTracker';
import AnatomicalMap from '@/components/patient/AnatomicalMap';
import PostureAnalysis from '@/components/dashboard/PostureAnalysis';
import MessageYourDoctor from '../MessageYourDoctor';
import MedicalDocuments from '../MedicalDocuments';
import { DashboardMainContentProps } from './types';

const MobileLayout: React.FC<DashboardMainContentProps> = ({
  healthMetrics,
  activityData,
  treatmentTasks,
  upcomingAppointments,
  biologicalAge,
  chronologicalAge,
  hasConnectedApps,
  onSyncData,
  handleConfirmAppointment,
  handleRescheduleAppointment
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 lg:hidden space-y-4 md:space-y-6 p-4">
      {/* Personal Information */}
      <PersonalInformation />
      
      {/* Health Sync Button */}
      <HealthSyncButton 
        hasConnectedApps={hasConnectedApps}
        onSyncData={onSyncData}
      />
      
      {/* Biological Age Card */}
      <BiologicalAge 
        biologicalAge={biologicalAge} 
        chronologicalAge={chronologicalAge} 
      />
      
      {/* Health Metrics */}
      <CardGrid columns={2} gap="sm">
        <HealthMetric
          title="Heart Rate"
          value={healthMetrics.heartRate.value}
          unit={healthMetrics.heartRate.unit}
          change={healthMetrics.heartRate.change}
          changeLabel="vs last week"
          icon={<Heart className="w-4 h-4" />}
          color="bg-medical-red/10 text-medical-red"
          source={healthMetrics.heartRate.source}
          lastSync={healthMetrics.heartRate.lastSync}
          isConnected={!!healthMetrics.heartRate.source}
        />
        
        <HealthMetric
          title="Blood Pressure"
          value={healthMetrics.bloodPressure.value}
          unit={healthMetrics.bloodPressure.unit}
          change={healthMetrics.bloodPressure.change}
          changeLabel="stable"
          icon={<Activity className="w-4 h-4" />}
          color="bg-medical-blue/10 text-medical-blue"
          source={healthMetrics.bloodPressure.source}
          lastSync={healthMetrics.bloodPressure.lastSync}
          isConnected={!!healthMetrics.bloodPressure.source}
        />
        
        <HealthMetric
          title="Temperature"
          value={healthMetrics.temperature.value}
          unit={healthMetrics.temperature.unit}
          change={healthMetrics.temperature.change}
          changeLabel="vs yesterday"
          icon={<Thermometer className="w-4 h-4" />}
          color="bg-medical-yellow/10 text-medical-yellow"
          source={healthMetrics.temperature.source}
          lastSync={healthMetrics.temperature.lastSync}
          isConnected={!!healthMetrics.temperature.source}
        />
        
        <HealthMetric
          title="Oxygen"
          value={healthMetrics.oxygen.value}
          unit={healthMetrics.oxygen.unit}
          change={healthMetrics.oxygen.change}
          changeLabel="vs last check"
          icon={<Droplet className="w-4 h-4" />}
          color="bg-medical-green/10 text-medical-green"
          source={healthMetrics.oxygen.source}
          lastSync={healthMetrics.oxygen.lastSync}
          isConnected={!!healthMetrics.oxygen.source}
        />
      </CardGrid>
      
      {/* Activity Tracker */}
      <ActivityTracker
        title="Your Activity (Steps)"
        data={activityData.data}
        unit="steps/day"
        currentValue={activityData.currentValue}
        source={activityData.source}
        lastSync={activityData.lastSync}
      />
      
      {/* Upcoming Appointments */}
      <UpcomingAppointmentsCard 
        upcomingAppointments={upcomingAppointments}
        onConfirmAppointment={handleConfirmAppointment}
        onRescheduleAppointment={handleRescheduleAppointment}
      />
      
      {/* Treatment Plan */}
      <TreatmentPlan
        title="Today's Treatment Plan"
        date="Jun 15, 2023"
        tasks={treatmentTasks}
        progress={50}
      />
      
      {/* Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <SymptomProgressChart className="w-full" />
      </div>
      
      {/* Rest of components */}
      <SymptomTracker />
      <AnatomicalMap />
      <PostureAnalysis />
      <MessageYourDoctor />
      <MedicalDocuments />
    </div>
  );
};

export default MobileLayout;
