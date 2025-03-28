
import React from 'react';
import { useReminders } from '@/hooks/useReminders';
import ClinicReminders from '@/components/dashboard/ClinicReminders';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

const RemindersTab: React.FC = () => {
  const { 
    reminders, 
    addReminder, 
    toggleReminder, 
    deleteReminder,
    getOverdueReminders
  } = useReminders();
  
  const overdueReminders = getOverdueReminders();
  
  const handleAddReminder = (reminder: Omit<{ id: string; title: string; dueDate: string; priority: 'low' | 'medium' | 'high'; completed: boolean; }, 'id'>) => {
    try {
      addReminder(reminder);
      toast.success('Reminder added successfully');
    } catch (error) {
      console.error('Failed to add reminder:', error);
      toast.error('Failed to add reminder');
    }
  };
  
  const handleToggleReminder = (id: string) => {
    try {
      toggleReminder(id);
      toast.success('Reminder status updated');
    } catch (error) {
      console.error('Failed to update reminder status:', error);
      toast.error('Failed to update reminder status');
    }
  };
  
  const handleDeleteReminder = (id: string) => {
    try {
      deleteReminder(id);
      toast.success('Reminder deleted successfully');
    } catch (error) {
      console.error('Failed to delete reminder:', error);
      toast.error('Failed to delete reminder');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ClinicReminders 
            reminders={reminders}
            onAddReminder={handleAddReminder}
            onToggleReminder={handleToggleReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Overdue Reminders
                {overdueReminders.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {overdueReminders.length}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Tasks that need your immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overdueReminders.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Calendar className="mx-auto h-8 w-8 opacity-20 mb-2" />
                  <p>No overdue reminders</p>
                  <p className="text-sm">You're up to date!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {overdueReminders.map(reminder => (
                    <div key={reminder.id} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{reminder.title}</h4>
                        <Badge variant="destructive" className="mt-0.5">Overdue</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        Due: {reminder.dueDate}
                      </p>
                      <div className="mt-2 flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleReminder(reminder.id)}
                        >
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Reminders help you stay organized and never miss important tasks
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RemindersTab;
