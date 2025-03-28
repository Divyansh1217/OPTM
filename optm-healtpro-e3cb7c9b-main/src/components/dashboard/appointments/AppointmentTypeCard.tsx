
import React from 'react';
import { Card } from '@/components/ui/card';

interface AppointmentTypeCardProps {
  title: string;
  description: string;
}

const AppointmentTypeCard: React.FC<AppointmentTypeCardProps> = ({
  title,
  description
}) => {
  return (
    <Card className="bg-primary/5 p-3 border-primary/10">
      <div className="text-center">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </Card>
  );
};

export default AppointmentTypeCard;
