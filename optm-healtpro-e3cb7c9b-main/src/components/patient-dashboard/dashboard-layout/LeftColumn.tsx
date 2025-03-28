
import React from 'react';
import PersonalInformation from '../PersonalInformation';
import ActivityTracker from '@/components/dashboard/ActivityTracker';
import UpcomingAppointmentsCard from '../UpcomingAppointmentsCard';
import MessageYourDoctor from '../MessageYourDoctor';
import { ColumnProps } from './types';

const LeftColumn: React.FC<ColumnProps> = ({ 
  activityData, 
  upcomingAppointments, 
  handleConfirmAppointment, 
  handleRescheduleAppointment 
}) => {
  return (
    <div className="lg:col-span-3 space-y-4 md:space-y-6">
      <PersonalInformation />
      
      {/* Activity Tracker with fitness data if available */}
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
      
      {/* Message Your Doctor */}
      <MessageYourDoctor />
    </div>
  );
};

export default LeftColumn;
