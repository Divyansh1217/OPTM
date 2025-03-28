
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlusCircle, MessageCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupportTickets: React.FC = () => {
  const { toast } = useToast();
  const [activeTickets, setActiveTickets] = useState([
    { id: 'T-1023', subject: 'Issue with syncing my fitness data', status: 'Open', lastUpdate: '2 days ago' },
    { id: 'T-1019', subject: 'Cannot schedule appointment for next month', status: 'In Progress', lastUpdate: '5 hours ago' }
  ]);
  
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    description: ''
  });
  
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new ticket to active tickets
    const ticket = {
      id: `T-${1000 + Math.floor(Math.random() * 999)}`,
      subject: newTicket.subject,
      status: 'Open',
      lastUpdate: 'Just now'
    };
    
    setActiveTickets([ticket, ...activeTickets]);
    
    // Reset form
    setNewTicket({
      subject: '',
      category: '',
      description: ''
    });
    
    setShowNewTicketForm(false);
    
    // Show success toast
    toast({
      title: "Support Ticket Created",
      description: "We'll respond to your inquiry as soon as possible.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Support Tickets</h2>
          <Button onClick={() => setShowNewTicketForm(true)} disabled={showNewTicketForm}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>
        
        {showNewTicketForm ? (
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-4">Create New Support Ticket</h3>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Briefly describe your issue"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newTicket.category} 
                  onValueChange={(value) => setNewTicket({...newTicket, category: value})}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="technical">Technical Problems</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="data">Health Data</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please provide details about your issue"
                  rows={5}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewTicketForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Ticket</Button>
              </div>
            </form>
          </div>
        ) : null}
        
        <div className="space-y-4">
          <h3 className="font-medium">Your Active Tickets</h3>
          
          {activeTickets.length > 0 ? (
            <div className="space-y-3">
              {activeTickets.map(ticket => (
                <div key={ticket.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">{ticket.id}</span>
                      <h4 className="font-medium">{ticket.subject}</h4>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last updated: {ticket.lastUpdate}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'Open' 
                        ? 'bg-blue-100 text-blue-800' 
                        : ticket.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">You don't have any active support tickets.</p>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-2 py-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm">Average response time: <strong>4 hours</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
