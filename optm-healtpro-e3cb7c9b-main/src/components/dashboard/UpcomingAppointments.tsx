import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  patientName: string;
  patientId: number;
  time: string;
  date: string;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  className?: string;
  onViewAll?: () => void;
  patientId?: number | string;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
  className,
  onViewAll,
  patientId
}) => {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300';
    }
  };

  const getBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'secondary';
      case 'confirmed': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
    }
  };

  // Filter appointments by patientId if provided
  const filteredAppointments = patientId 
    ? appointments.filter(appointment => appointment.patientId === Number(patientId))
    : appointments;

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
            <CardDescription>
              {patientId ? "Patient appointments scheduled for the coming days" : "Appointments scheduled for the coming days"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No upcoming appointments</p>
          ) : (
            filteredAppointments.slice(0, 5).map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex items-start gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0 transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg -mx-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                <Badge variant={getBadgeVariant(appointment.status)} className="capitalize">
                  {appointment.status}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
      {filteredAppointments.length > 5 && (
        <CardFooter className="pt-0">
          <Button 
            variant="ghost" 
            className="w-full justify-between group" 
            onClick={onViewAll}
          >
            View All Appointments
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UpcomingAppointments;
