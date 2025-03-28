
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { appointmentTypes, timeSlots, locations } from './appointmentConstants';
import DateSelector from './DateSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AppointmentDialogFormProps {
  date: Date;
  setDate: (date: Date) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  type: string;
  setType: (type: string) => void;
  patient: string;
  setPatient: (patient: string) => void;
  location: string;
  setLocation: (location: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  validationErrors?: Record<string, string>;
}

const AppointmentDialogForm: React.FC<AppointmentDialogFormProps> = ({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  type,
  setType,
  patient,
  setPatient,
  location,
  setLocation,
  notes,
  setNotes,
  validationErrors = {}
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateSelector date={date} setDate={setDate} />
        
        <div className="space-y-2">
          <Label htmlFor="type" className="flex items-center">
            Appointment Type <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={type} onValueChange={setType} required>
            <SelectTrigger id="type" className={validationErrors.type ? "border-red-500" : ""}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {appointmentTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.type && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.type}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="start-time">Start Time</Label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger id="start-time" className={validationErrors.time ? "border-red-500" : ""}>
              <SelectValue placeholder="Select start time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="end-time">End Time</Label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger id="end-time" className={validationErrors.time ? "border-red-500" : ""}>
              <SelectValue placeholder="Select end time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.time && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.time}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="patient" className="flex items-center">
            Patient Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="patient" 
            placeholder="Enter patient name" 
            value={patient} 
            onChange={(e) => setPatient(e.target.value)}
            className={validationErrors.patient ? "border-red-500" : ""}
            required
          />
          {validationErrors.patient && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.patient}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea 
          id="notes" 
          placeholder="Add any additional notes here..." 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            Please correct the errors above before submitting.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AppointmentDialogForm;
