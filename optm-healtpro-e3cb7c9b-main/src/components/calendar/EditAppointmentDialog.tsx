
import React, { useState, useEffect, useCallback, memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/hooks/calendar/types';
import AppointmentDialogForm from './appointments/AppointmentDialogForm';
import { useAppointmentDates } from '@/hooks/calendar/useAppointmentDates';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Spinner } from '@/components/ui/spinner';
import { ErrorBoundaryWithFallback } from '@/pages/dashboard/components/tabs/overview/ErrorBoundaryWithFallback';

interface EditAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (eventData: Partial<CalendarEvent>) => Promise<boolean>;
  onDelete: (eventId: string) => Promise<boolean>;
  event: CalendarEvent;
}

// Memoize the component to prevent unnecessary re-renders
const EditAppointmentDialog: React.FC<EditAppointmentDialogProps> = memo(({
  open,
  onClose,
  onUpdate,
  onDelete,
  event
}) => {
  // Extract clear initial values from event props
  const startDate = event?.start instanceof Date ? event.start : new Date(event?.start || Date.now());
  
  // Create a reference to the initial event to prevent unnecessary updates
  const eventRef = React.useRef(event);
  
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    validateTimeRange
  } = useAppointmentDates(startDate);
  
  const [type, setType] = useState<string>(event?.type || "New Appointment");
  const [patient, setPatient] = useState<string>(event?.patientName || "");
  const [location, setLocation] = useState<string>(event?.location || "");
  const [notes, setNotes] = useState<string>(event?.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Reset form when event changes or dialog opens
  useEffect(() => {
    if (event && open) {
      const start = event.start instanceof Date ? event.start : new Date(event.start || Date.now());
      const end = event.end instanceof Date ? event.end : new Date(event.end || Date.now());
      
      // Update the event reference
      eventRef.current = event;
      
      // Batch state updates to reduce renders
      setDate(start);
      setStartTime(formatDate(start, "h:mm a"));
      setEndTime(formatDate(end, "h:mm a"));
      setType(event.type || "New Appointment");
      setPatient(event.patientName || "");
      setLocation(event.location || "");
      setNotes(event.description || "");
      setValidationErrors({});
      setIsLoading(false);
      setIsDeleting(false);
    }
  }, [event, open, setDate]);

  const validateForm = useCallback(() => {
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
  }, [patient, type, validateTimeRange]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading || isDeleting) return;
    
    // Validate form fields
    if (!validateForm()) {
      Object.values(validationErrors).forEach(error => {
        toast.error(error);
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Ensure we have the current event ID
      if (!eventRef.current || !eventRef.current.id) {
        throw new Error("Event ID is missing");
      }
      
      const success = await onUpdate({
        id: eventRef.current.id,
        title: `${type} - ${patient}`,
        start: date,
        end: date,
        type,
        patientName: patient,
        location,
        description: notes
      });
      
      if (!success) {
        throw new Error("Update failed");
      }
      
      toast.success("Appointment updated successfully", {
        description: "Your changes have been synced with Google Calendar."
      });
      
      onClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment", {
        description: "There was an error syncing with Google Calendar. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isDeleting, validateForm, validationErrors, onUpdate, date, type, patient, location, notes, onClose]);

  const handleDelete = useCallback(async () => {
    // Prevent multiple submissions
    if (isLoading || isDeleting) return;
    
    if (confirm("Are you sure you want to delete this appointment?")) {
      setIsDeleting(true);
      
      try {
        // Ensure we have the current event ID
        if (!eventRef.current || !eventRef.current.id) {
          throw new Error("Event ID is missing");
        }
        
        const success = await onDelete(eventRef.current.id);
        if (success) {
          toast.success("Appointment deleted successfully", {
            description: "The appointment has been removed from Google Calendar."
          });
          onClose();
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
        toast.error("Failed to delete appointment", {
          description: "There was an error syncing with Google Calendar. Please try again."
        });
      } finally {
        setIsDeleting(false);
      }
    }
  }, [isLoading, isDeleting, onDelete, onClose]);

  const handleRetry = useCallback(() => {
    // Reset state and errors on retry
    setValidationErrors({});
    setIsLoading(false);
    setIsDeleting(false);
  }, []);

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => !open && !isLoading && !isDeleting && onClose()}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Appointment</DialogTitle>
        </DialogHeader>
        
        <ErrorBoundaryWithFallback onRetry={handleRetry}>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
            
            <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row justify-between">
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isLoading || isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Deleting...
                  </>
                ) : "Delete Appointment"}
              </Button>
              
              <div className="flex gap-2 mb-2 sm:mb-0">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isLoading || isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading || isDeleting}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </ErrorBoundaryWithFallback>
      </DialogContent>
    </Dialog>
  );
});

EditAppointmentDialog.displayName = "EditAppointmentDialog";

export default EditAppointmentDialog;

// Helper function to format dates
const formatDate = (date: Date, formatString: string): string => {
  try {
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};
