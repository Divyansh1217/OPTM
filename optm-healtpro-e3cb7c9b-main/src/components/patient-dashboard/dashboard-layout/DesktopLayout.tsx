
import React from 'react';
import LeftColumn from './LeftColumn';
import MiddleColumn from './MiddleColumn';
import RightColumn from './RightColumn';
import { DashboardMainContentProps } from './types';

const DesktopLayout: React.FC<DashboardMainContentProps> = (props) => {
  return (
    <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
      {/* Left column */}
      <LeftColumn 
        activityData={props.activityData}
        upcomingAppointments={props.upcomingAppointments}
        handleConfirmAppointment={props.handleConfirmAppointment}
        handleRescheduleAppointment={props.handleRescheduleAppointment}
        healthMetrics={props.healthMetrics}
        treatmentTasks={props.treatmentTasks}
        biologicalAge={props.biologicalAge}
        chronologicalAge={props.chronologicalAge}
        hasConnectedApps={props.hasConnectedApps}
        onSyncData={props.onSyncData}
      />
      
      {/* Middle column - health metrics and treatment */}
      <MiddleColumn 
        activityData={props.activityData}
        upcomingAppointments={props.upcomingAppointments}
        handleConfirmAppointment={props.handleConfirmAppointment}
        handleRescheduleAppointment={props.handleRescheduleAppointment}
        healthMetrics={props.healthMetrics}
        treatmentTasks={props.treatmentTasks}
        biologicalAge={props.biologicalAge}
        chronologicalAge={props.chronologicalAge}
        hasConnectedApps={props.hasConnectedApps}
        onSyncData={props.onSyncData}
      />
      
      {/* Right column - symptom tracker, documents, messages */}
      <RightColumn />
    </div>
  );
};

export default DesktopLayout;
