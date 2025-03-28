
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AppointmentsDashboard } from '@/components/dashboard/appointments';
import QuickActionsGrid from './overview/QuickActionsGrid';
import DashboardGrid from './overview/DashboardGrid';
import AddPatientDialog from './overview/AddPatientDialog';
import HelpDialog from './overview/HelpDialog';
import AnalyticsDialog from './overview/AnalyticsDialog';
import { useCalendarAuth } from '@/hooks/calendar/useCalendarAuth';

interface OverviewTabProps {
  appointments: any[];
  therapySessions: any[];
  messages: any[];
  reminders: any[];
  documents: any[];
  calendarEvents: any;
  currentDate: Date;
  onViewAllAppointments: () => void;
  onViewPatient: (patientId: number) => void;
  onViewAllMessages: () => void;
  onAddReminder: () => void;
  onToggleReminder: (id: string) => void;
  onViewFullCalendar: () => void;
  onViewAllDocuments: () => void;
  onUpload: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  appointments = [],
  therapySessions = [],
  messages = [],
  reminders = [],
  documents = [],
  calendarEvents = {},
  currentDate,
  onViewAllAppointments,
  onViewPatient,
  onViewAllMessages,
  onAddReminder,
  onToggleReminder,
  onViewFullCalendar,
  onViewAllDocuments,
  onUpload
}) => {
  const [showAddPatientDialog, setShowAddPatientDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
  const { isAuthorized, authorizeCalendar, isLoading: isCalendarLoading } = useCalendarAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  // Check calendar connection on load
  useEffect(() => {
    if (!isAuthorized && !isCalendarLoading) {
      console.log("Calendar not connected in OverviewTab");
    }
  }, [isAuthorized, isCalendarLoading]);

  const handleViewFullCalendar = () => {
    if (!isAuthorized) {
      toast.error("Calendar not connected", {
        description: "Please connect your Google Calendar first",
      });
      
      // Ask user if they want to connect now
      const connect = window.confirm("Would you like to connect your Google Calendar now?");
      if (connect) {
        handleConnectCalendar();
        return;
      }
    }
    
    onViewFullCalendar();
  };

  const handleConnectCalendar = async () => {
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      await authorizeCalendar();
    } catch (error) {
      console.error("Error connecting calendar:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Mock function to handle adding a patient
  const handleAddPatient = (newPatient: any) => {
    toast.success("Patient added successfully", {
      description: "New patient record has been created",
      duration: 3000
    });
    setShowAddPatientDialog(false);
  };

  return (
    <div className="space-y-6">
      <QuickActionsGrid 
        onOpenAddPatientDialog={() => setShowAddPatientDialog(true)}
        onViewFullCalendar={handleViewFullCalendar}
        onViewAllMessages={onViewAllMessages}
        onViewAllDocuments={onViewAllDocuments}
        onOpenAnalyticsDialog={() => setShowAnalyticsDialog(true)}
        onOpenHelpDialog={() => setShowHelpDialog(true)}
      />
      
      <AppointmentsDashboard />
      
      <DashboardGrid 
        appointments={appointments}
        therapySessions={therapySessions}
        messages={messages}
        reminders={reminders}
        documents={documents}
        calendarEvents={calendarEvents}
        currentDate={currentDate}
        onViewAllAppointments={onViewAllAppointments}
        onViewPatient={onViewPatient}
        onViewAllMessages={onViewAllMessages}
        onAddReminder={onAddReminder}
        onToggleReminder={onToggleReminder}
        onViewFullCalendar={handleViewFullCalendar}
        onViewAllDocuments={onViewAllDocuments}
        onUpload={onUpload}
      />

      <AddPatientDialog 
        open={showAddPatientDialog} 
        onOpenChange={setShowAddPatientDialog}
        onAddPatient={handleAddPatient} 
      />

      <HelpDialog 
        open={showHelpDialog} 
        onOpenChange={setShowHelpDialog} 
      />

      <AnalyticsDialog 
        open={showAnalyticsDialog} 
        onOpenChange={setShowAnalyticsDialog} 
      />
    </div>
  );
};

export default OverviewTab;
