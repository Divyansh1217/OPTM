
import React from 'react';
import { Calendar, MessageCircle, Headset, ArrowRight, User, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}
    >
      {/* Today's Appointments */}
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
              <div key={appointment.id} className="flex items-center justify-between border-b border-border/20 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{appointment.patientName}</h4>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {appointment.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleViewPatient(appointment.patientName)}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 justify-between group"
            onClick={() => toast.info("Viewing all appointments", { duration: 3000 })}
          >
            View All Appointments
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Speak to a Specialist */}
      <Card className="overflow-hidden border border-border/30 shadow-sm">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Headset className="h-5 w-5 text-primary" />
            Quick Connect
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col h-[calc(100%-58px)]">
          <div className="space-y-3 flex-1">
            <p className="font-medium">
              Need immediate assistance?
            </p>
            <p className="text-sm text-muted-foreground">
              Connect with a specialist for real-time consultation or send messages to your patients.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Card className="bg-primary/5 p-3 border-primary/10">
                <div className="text-center">
                  <p className="font-medium text-sm">Available Now</p>
                  <p className="text-xs text-muted-foreground mt-1">No wait time</p>
                </div>
              </Card>
              <Card className="bg-primary/5 p-3 border-primary/10">
                <div className="text-center">
                  <p className="font-medium text-sm">Support Online</p>
                  <p className="text-xs text-muted-foreground mt-1">2 specialists</p>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Button 
              variant="default" 
              className="w-full group justify-between"
              onClick={handleStartChat}
            >
              <span className="flex items-center gap-2">
                <Headset className="h-4 w-4" />
                Start Live Chat
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full group justify-between"
              onClick={() => toast.info("Opening messages center", { duration: 3000 })}
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Message Center
                {unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1 rounded-full">
                    {unreadMessages}
                  </Badge>
                )}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AppointmentsDashboard;
