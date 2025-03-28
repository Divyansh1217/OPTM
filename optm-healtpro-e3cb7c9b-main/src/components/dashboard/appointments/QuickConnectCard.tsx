
import React from 'react';
import { Headset, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuickConnectCardProps {
  unreadMessages?: number;
  onStartChat: () => void;
  onOpenMessages: () => void;
}

const QuickConnectCard: React.FC<QuickConnectCardProps> = ({
  unreadMessages = 0,
  onStartChat,
  onOpenMessages
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Quick Connect</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Headset className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Specialist Support</h3>
              <p className="text-sm text-muted-foreground">Connect with a specialist</p>
            </div>
          </div>
          <Button variant="default" size="sm" onClick={onStartChat}>
            Start Chat
          </Button>
        </div>

        <div className="bg-secondary/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Messages</h3>
              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">Check your messages</p>
                {unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadMessages} new
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onOpenMessages}>
            Open
          </Button>
        </div>

        <div className="mt-4">
          <Button variant="ghost" className="w-full justify-between group" onClick={onOpenMessages}>
            View all communications
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickConnectCard;
