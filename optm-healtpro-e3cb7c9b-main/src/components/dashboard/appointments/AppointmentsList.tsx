
import React from 'react';
import { Calendar } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppointmentItem from './AppointmentItem';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  onViewAllAppointments: () => void;
  onViewPatient: (name: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  onViewAllAppointments,
  onViewPatient
}) => {
  return (
    <Card className="md:col-span-2 overflow-hidden border border-border/30 shadow-sm">
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Appointments
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {appointments.length} appointments
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onViewPatient={onViewPatient}
            />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 justify-between group"
          onClick={onViewAllAppointments}
        >
          View All Appointments
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
