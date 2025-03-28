
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare,
  Search,
  Send
} from 'lucide-react';
import { Doctor } from '@/hooks/patient-dashboard/useDoctors';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface SecureMessagingProps {
  doctors: Doctor[];
}

const SecureMessaging: React.FC<SecureMessagingProps> = ({ doctors }) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedDoctor) return;
    
    // In a real app, this would send a message to the doctor
    toast.success('Message sent!', {
      description: `Your message has been sent to Dr. ${selectedDoctor.name}.`
    });
    
    // Clear the message text
    setMessageText('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Secure Messaging
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedDoctor ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage 
                    src={selectedDoctor.avatarUrl} 
                    alt={selectedDoctor.name} 
                  />
                  <AvatarFallback>
                    {getInitials(selectedDoctor.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedDoctor.name}</h4>
                  <p className="text-xs text-muted-foreground">{selectedDoctor.specialty}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedDoctorId(null)}
              >
                Change
              </Button>
            </div>
            
            <div className="h-48 border rounded-md bg-muted/30 p-2 overflow-y-auto mb-2">
              <div className="text-center text-muted-foreground p-6">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No previous messages</p>
                <p className="text-xs mt-1">Start a conversation below</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="resize-none"
              />
              <Button 
                variant="default" 
                size="icon"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctor by name or specialty..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <Button
                    key={doctor.id}
                    variant="ghost"
                    className="w-full justify-start h-auto py-2"
                    onClick={() => handleDoctorSelect(doctor.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={doctor.avatarUrl} 
                          alt={doctor.name} 
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(doctor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-medium text-sm">{doctor.name}</p>
                        <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No doctors found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecureMessaging;
