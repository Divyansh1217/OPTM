
import React from 'react';
import { User, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppointmentTypeCard from './AppointmentTypeCard';

interface NextAppointment {
  date: string;
  time: string;
  doctor: string;
  type: string;
}

interface AppointmentTypesProps {
  nextAppointment?: NextAppointment;
}

const AppointmentTypes: React.FC<AppointmentTypesProps> = ({
  nextAppointment
}) => {
  if (!nextAppointment) return null;

  return (
    <Card className="overflow-hidden border border-border/30 shadow-sm">
      <CardHeader className="bg-primary/5 pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{nextAppointment.type}</h4>
              <p className="text-sm text-muted-foreground">
                {nextAppointment.date} at {nextAppointment.time}
              </p>
              <p className="text-sm text-muted-foreground">{nextAppointment.doctor}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <AppointmentTypeCard 
              title="Type" 
              description={nextAppointment.type} 
            />
            <AppointmentTypeCard 
              title="Location" 
              description="Main Clinic" 
            />
          </div>
          
          <Button variant="outline" className="w-full mt-2">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentTypes;
