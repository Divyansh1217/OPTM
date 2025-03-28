
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CalendarEvent } from '@/hooks/calendar/types';
import AppointmentDialogForm from './appointments/AppointmentDialogForm';
import AppointmentDialogActions from './appointments/AppointmentDialogActions';
import { useAppointmentDates } from '@/hooks/calendar/useAppointmentDates';
import { toast } from 'sonner';

interface CreateAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: (eventData: Partial<CalendarEvent>) => Promise<boolean>;
  selectedDate: Date;
}

const CreateAppointmentDialog: React.FC<CreateAppointmentDialogProps> = ({
  open,
  onClose,
  onCreated,
  selectedDate
}) => {
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    getAppointmentTimes,
    validateTimeRange,
    setAutoEndTime
  } = useAppointmentDates(selectedDate);
  
  const [type, setType] = useState<string>("New Appointment");
  const [patient, setPatient] = useState<string>("");
  const [location, setLocation] = useState<string>("Main Office - Room 101");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens or selected date changes
  useEffect(() => {
    if (open) {
      console.log("Reset form with selected date:", selectedDate);
      setDate(new Date(selectedDate)); // Ensure we're using a new Date object
      setType("New Appointment");
      setPatient("");
      setLocation("Main Office - Room 101");
      setNotes("");
      setValidationErrors({});
      
      // Set default start and end times
      setStartTime("9:00 AM");
      setTimeout(() => {
        setEndTime("9:30 AM");
      }, 50);
    }
  }, [open, selectedDate, setDate, setStartTime, setEndTime]);

  // Update end time when start time changes
  useEffect(() => {
    if (open && startTime) {
      setTimeout(() => {
        setAutoEndTime();
      }, 50);
    }
  }, [startTime, open, setAutoEndTime]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!patient.trim()) {
      errors.patient = "Patient name is required";
    }
    
    if (!type) {
      errors.type = "Appointment type is required";
    }
    
    const timeValidation = validateTimeRange();
    if (!timeValidation.isValid) {
      errors.time = timeValidation.errorMessage || "Invalid time range";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!validateForm()) {
      // Display validation errors
      Object.values(validationErrors).forEach(error => {
        toast.error(error);
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { start, end } = getAppointmentTimes();
      
      const eventData: Partial<CalendarEvent> = {
        title: `${type} - ${patient}`,
        start,
        end,
        type,
        patientName: patient,
        location,
        description: notes,
        isAvailable: false
      };
      
      console.log("Creating appointment with data:", eventData);
      
      const success = await onCreated(eventData);
      
      if (success) {
        onClose();
        toast.success("Appointment created successfully", {
          description: "Your appointment has been added to the calendar."
        });
      } else {
        throw new Error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment", {
        description: "There was an error adding your appointment. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Appointment</DialogTitle>
          <DialogDescription>
            Schedule a new appointment by selecting details below
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <AppointmentDialogForm
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            type={type}
            setType={setType}
            patient={patient}
            setPatient={setPatient}
            location={location}
            setLocation={setLocation}
            notes={notes}
            setNotes={setNotes}
            validationErrors={validationErrors}
          />
          
          <AppointmentDialogActions
            isLoading={isLoading}
            onClose={onClose}
            submitLabel="Create Appointment"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentDialog;
