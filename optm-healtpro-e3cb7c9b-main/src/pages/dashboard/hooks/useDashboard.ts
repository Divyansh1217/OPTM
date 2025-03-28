
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { dashboardData } from '../data/dashboardData';
import { useAuth } from '@/contexts/auth';
import { useReminders } from '@/hooks/useReminders';

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [filterPeriod, setFilterPeriod] = useState("thisWeek");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const { addReminder } = useReminders();

  // Check user authentication status and set loading state
  useEffect(() => {
    if (user) {
      console.log(`Dashboard accessed by: ${user.name} (${user.role})`);
      // Simulate loading time for dashboard components
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Reduced loading time for better UX
      return () => clearTimeout(timer);
    } else {
      console.log('Dashboard accessed by unauthenticated user');
      setIsLoading(false); // Ensure we exit loading state even if no user
    }
  }, [user]);

  // Functions for handling different dashboard actions
  const handleUploadDocument = () => {
    toast({
      title: "Document Uploaded",
      description: "Your document has been successfully uploaded.",
      duration: 3000,
    });
    setShowUploadDialog(false);
  };

  const handleViewPatient = (patientId: number) => {
    const patient = dashboardData.patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      toast({
        title: "Patient Selected",
        description: `Viewing details for ${patient.name}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Patient Not Found",
        description: "Could not find patient record.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleClosePatientHistory = () => {
    setSelectedPatient(null);
  };

  const handleUpdatePatient = (updatedPatient: any) => {
    toast({
      title: "Patient Updated",
      description: "Patient information has been updated successfully.",
      duration: 3000,
    });
  };

  const handleSaveReport = () => {
    toast({
      title: "Report Saved",
      description: "The report has been saved successfully.",
      duration: 3000,
    });
  };

  const handleAddReminder = (reminderData: Omit<{ id: string; title: string; dueDate: string; priority: 'low' | 'medium' | 'high'; completed: boolean; }, 'id'>) => {
    try {
      const newReminder = addReminder(reminderData);
      toast({
        title: "Reminder Added",
        description: `"${newReminder.title}" has been added to your reminders.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to add reminder:', error);
      toast({
        title: "Failed to Add Reminder",
        description: "There was an error adding your reminder. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return {
    isLoading,
    activeTab,
    setActiveTab,
    showUploadDialog,
    setShowUploadDialog,
    currentDate,
    setCurrentDate,
    selectedPatient,
    setSelectedPatient,
    filterPeriod,
    setFilterPeriod,
    handleUploadDocument,
    handleViewPatient,
    handleClosePatientHistory,
    handleUpdatePatient,
    handleSaveReport,
    handleAddReminder,
    dashboardData,
  };
};
