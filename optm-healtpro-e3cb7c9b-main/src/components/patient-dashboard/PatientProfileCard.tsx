
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Calendar, Heart, Activity } from 'lucide-react';

interface PatientProfileCardProps {
  name: string;
  patientId: string;
  age: number;
}

const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ 
  name, 
  patientId, 
  age 
}) => {
  // Extract initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };
  
  const initials = getInitials(name);
  
  // Display basic patient information
  const patientInfo = [
    { 
      label: 'Age', 
      value: `${age} years`, 
      icon: Calendar,
      color: 'text-blue-500'
    },
    { 
      label: 'Height', 
      value: '5\'10"', 
      icon: Activity,
      color: 'text-purple-500'
    },
    { 
      label: 'Weight', 
      value: '165 lbs', 
      icon: Activity,
      color: 'text-purple-500'
    },
    { 
      label: 'Blood Type', 
      value: 'A+', 
      icon: Heart,
      color: 'text-red-500'
    }
  ];
  
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="/lovable-uploads/5bd27e90-bafe-4183-8e98-175ad131a999.png" alt={name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="mt-3 text-center">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="outline" className="font-normal">
                ID: {patientId}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            {patientInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-background border flex items-center justify-center">
                    <IconComponent className={`h-4 w-4 ${info.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-2 w-full">
            <div className="flex flex-col items-center justify-center p-2 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
              <Badge className="bg-amber-500">Medium</Badge>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">Health Score</p>
              <p className="font-bold text-lg text-teal-500">85%</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">Next Visit</p>
              <p className="font-medium text-sm">Jun 15</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;
