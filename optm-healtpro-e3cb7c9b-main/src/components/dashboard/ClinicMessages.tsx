
import React from 'react';
import { Mail, MessageSquare, User, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface ClinicMessagesProps {
  messages: Message[];
  className?: string;
  onViewAll?: () => void;
}

const ClinicMessages: React.FC<ClinicMessagesProps> = ({
  messages,
  className,
  onViewAll,
}) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Messages</CardTitle>
            <CardDescription>
              Recent messages from patients and staff
            </CardDescription>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mail className="h-4 w-4" />
            </Button>
            {messages.filter(m => !m.isRead).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {messages.filter(m => !m.isRead).length}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No messages</p>
          ) : (
            messages.slice(0, 4).map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                  !message.isRead && "bg-blue-50 dark:bg-blue-900/10"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className={cn("font-medium text-sm", !message.isRead && "font-semibold")}>{message.sender}</p>
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{message.content}</p>
                </div>
                {!message.isRead && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-sm gap-1" 
          onClick={onViewAll}
        >
          View All Messages
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClinicMessages;
