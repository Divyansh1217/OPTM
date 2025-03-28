
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';

interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

// This hook manages reminder state and operations
export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load reminders from localStorage on initial mount
  useEffect(() => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userId = user.id;
      const savedReminders = localStorage.getItem(`reminders-${userId}`);
      
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
      toast.error('Failed to load reminders');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    if (!user || reminders.length === 0) return;
    
    try {
      const userId = user.id;
      localStorage.setItem(`reminders-${userId}`, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  }, [reminders, user]);

  // Add a new reminder
  const addReminder = useCallback((reminderData: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: `reminder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    };
    
    setReminders(prev => [...prev, newReminder]);
    return newReminder;
  }, []);

  // Toggle reminder completion status
  const toggleReminder = useCallback((id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed } 
          : reminder
      )
    );
  }, []);

  // Delete a reminder
  const deleteReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  }, []);

  // Get upcoming (non-completed) reminders
  const getUpcomingReminders = useCallback(() => {
    return reminders
      .filter(r => !r.completed)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [reminders]);

  // Get overdue reminders
  const getOverdueReminders = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return reminders
      .filter(r => !r.completed && new Date(r.dueDate) < today)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [reminders]);

  return {
    reminders,
    isLoading,
    addReminder,
    toggleReminder,
    deleteReminder,
    getUpcomingReminders,
    getOverdueReminders
  };
}
