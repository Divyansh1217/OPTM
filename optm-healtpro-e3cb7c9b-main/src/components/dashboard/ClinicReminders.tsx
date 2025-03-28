
import React, { useState } from 'react';
import { Bell, Plus, Check, Star, X, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface ClinicRemindersProps {
  reminders: Reminder[];
  className?: string;
  onAddReminder?: (reminder: Omit<Reminder, 'id'>) => void;
  onToggleReminder?: (id: string) => void;
  onDeleteReminder?: (id: string) => void;
}

const ClinicReminders: React.FC<ClinicRemindersProps> = ({
  reminders,
  className,
  onAddReminder,
  onToggleReminder,
  onDeleteReminder,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    dueDate: new Date().toISOString().slice(0, 10),
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const getPriorityColor = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset form
    setNewReminder({
      title: '',
      dueDate: new Date().toISOString().slice(0, 10),
      priority: 'medium',
    });
  };

  const handleSubmit = () => {
    if (!newReminder.title.trim()) {
      toast.error("Please enter a reminder title");
      return;
    }

    if (onAddReminder) {
      onAddReminder({
        title: newReminder.title,
        dueDate: newReminder.dueDate,
        priority: newReminder.priority,
        completed: false,
      });
      
      toast.success("Reminder added successfully");
      handleCloseDialog();
    }
  };

  const handleDeleteReminder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteReminder) {
      onDeleteReminder(id);
      toast.success("Reminder deleted");
    }
  };

  return (
    <>
      <Card className={cn("h-full", className)}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Reminders</CardTitle>
              <CardDescription>
                Tasks and clinic reminders
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleOpenDialog}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {reminders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="mx-auto h-10 w-10 mb-2 opacity-20" />
                <p>No reminders</p>
                <p className="text-sm">Add a reminder to stay organized</p>
              </div>
            ) : (
              reminders.map((reminder) => (
                <div 
                  key={reminder.id} 
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800 group",
                    reminder.completed && "bg-gray-50 dark:bg-gray-800/50 opacity-70"
                  )}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full flex-shrink-0"
                    onClick={() => onToggleReminder && onToggleReminder(reminder.id)}
                  >
                    {reminder.completed ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className={cn(
                        "w-4 h-4 border-2 rounded-full",
                        getPriorityColor(reminder.priority)
                      )} />
                    )}
                  </Button>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium text-sm",
                      reminder.completed && "line-through text-muted-foreground"
                    )}>
                      {reminder.title}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3 inline" />
                      Due: {reminder.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className={cn(
                      "h-4 w-4 mr-2",
                      getPriorityColor(reminder.priority),
                      "opacity-" + (reminder.priority === 'high' ? '100' : 
                                  reminder.priority === 'medium' ? '75' : '50')
                    )} />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDeleteReminder(reminder.id, e)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 gap-1.5" 
            onClick={handleOpenDialog}
          >
            <Plus className="h-4 w-4" />
            Add Reminder
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
            <DialogDescription>
              Create a new reminder or task for your clinic
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter reminder title"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newReminder.dueDate}
                onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newReminder.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setNewReminder({ ...newReminder, priority: value })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClinicReminders;
