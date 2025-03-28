
import React from 'react';
import { Plus, Calendar, MessageSquare, FileText, BarChart2, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface QuickActionsGridProps {
  onOpenAddPatientDialog: () => void;
  onViewFullCalendar: () => void;
  onViewAllMessages: () => void;
  onViewAllDocuments: () => void;
  onOpenAnalyticsDialog: () => void;
  onOpenHelpDialog: () => void;
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onOpenAddPatientDialog,
  onViewFullCalendar,
  onViewAllMessages,
  onViewAllDocuments,
  onOpenAnalyticsDialog,
  onOpenHelpDialog,
}) => {
  const actions = [
    { name: "Add Patient", icon: <Plus className="h-5 w-5 text-primary" />, handler: onOpenAddPatientDialog },
    { name: "Schedule", icon: <Calendar className="h-5 w-5 text-primary" />, handler: onViewFullCalendar },
    { name: "Message", icon: <MessageSquare className="h-5 w-5 text-primary" />, handler: onViewAllMessages },
    { name: "Reports", icon: <FileText className="h-5 w-5 text-primary" />, handler: onViewAllDocuments },
    { name: "Analytics", icon: <BarChart2 className="h-5 w-5 text-primary" />, handler: onOpenAnalyticsDialog },
    { name: "Help", icon: <HelpCircle className="h-5 w-5 text-primary" />, handler: onOpenHelpDialog },
  ];

  const handleQuickAction = (action: string, handler: () => void) => {
    toast.info(`Opening ${action.toLowerCase()}`, { duration: 3000 });
    handler();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {actions.map(({ name, icon, handler }) => (
        <Card 
          key={name} 
          className="border border-border/30 cursor-pointer transition-all hover:shadow-md hover:border-primary/30 hover:bg-primary/5"
          onClick={() => handleQuickAction(name, handler)}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-24">
            <div className="mb-2">{icon}</div>
            <div className="text-lg font-semibold">{name}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionsGrid;
