
import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import AppointmentsList from './AppointmentsList';
import QuickConnectCard from './QuickConnectCard';
import AppointmentTypes from './AppointmentTypes';

interface AppointmentsDashboardProps {
  className?: string;
  unreadMessages?: number;
  nextAppointment?: {
    date: string;
    time: string;
    doctor: string;
    type: string;
  };
  appointments?: {
    id: string;
    patientName: string;
    time: string;
    type: string;
    status: string;
  }[];
}

const AppointmentsDashboard: React.FC<AppointmentsDashboardProps> = ({
  className,
  unreadMessages = 2,
  nextAppointment = {
    date: 'March 10, 2025',
    time: '10:30 AM',
    doctor: 'Dr. Nikolas Pascal',
    type: 'Follow-up Consultation'
  },
  appointments = [
    {
      id: '1',
      patientName: 'Emma Rodriguez',
      time: '9:00 AM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: '2',
      patientName: 'Marcus Johnson',
      time: '11:15 AM',
      type: 'Physical Therapy',
      status: 'scheduled'
    },
    {
      id: '3',
      patientName: 'Sarah Chen',
      time: '2:30 PM',
      type: 'Initial Consultation',
      status: 'confirmed'
    }
  ]
}) => {
  const handleStartChat = () => {
    toast.success("Connected with specialist. Chat session started.", {
      duration: 3000
    });
  };

  const handleViewPatient = (name: string) => {
    toast.info(`Viewing ${name}'s details`, {
      duration: 3000
    });
  };
  
  const handleOpenMessages = () => {
    toast.info("Opening messages center", { duration: 3000 });
  };
  
  const handleViewAllAppointments = () => {
    toast.info("Viewing all appointments", { duration: 3000 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}
    >
      <AppointmentsList 
        appointments={appointments}
        onViewAllAppointments={handleViewAllAppointments}
        onViewPatient={handleViewPatient}
      />

      <QuickConnectCard 
        unreadMessages={unreadMessages}
        onStartChat={handleStartChat}
        onOpenMessages={handleOpenMessages}
      />
      
      <AppointmentTypes nextAppointment={nextAppointment} />
    </motion.div>
  );
};

export default AppointmentsDashboard;
