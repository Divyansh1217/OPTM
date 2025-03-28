
import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MessageYourDoctorProps {
  className?: string;
}

const MessageYourDoctor: React.FC<MessageYourDoctorProps> = ({ className }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message before sending.", {
        duration: 4000
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending message with a slight delay
    setTimeout(() => {
      toast.success("Your message has been sent to your doctor.", {
        duration: 3000
      });
      
      // Clear the message input after sending
      setMessage('');
      setIsSending(false);
    }, 800);
  };

  return (
    <div className={`glass-morphism rounded-2xl p-4 md:p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Message Your Doctor
        </h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View History
        </Button>
      </div>
      <div className="space-y-3">
        <textarea 
          className="w-full p-3 h-24 rounded-lg border resize-none bg-white/80 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary" 
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSending}
          aria-label="Message to your doctor"
        ></textarea>
        <Button 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSendMessage}
          disabled={isSending}
          aria-busy={isSending}
        >
          {isSending ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageYourDoctor;
