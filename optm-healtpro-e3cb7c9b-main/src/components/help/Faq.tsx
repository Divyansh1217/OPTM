
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';

interface FaqProps {
  searchQuery: string;
}

const Faq: React.FC<FaqProps> = ({ searchQuery }) => {
  const [feedback, setFeedback] = useState('');
  
  const faqItems = [
    {
      question: 'How do I connect my fitness tracker?',
      answer: 'You can connect your fitness tracker by going to the Health Apps section in the sidebar. From there, select your device manufacturer and follow the on-screen instructions to authorize the connection.'
    },
    {
      question: 'Can I see my previous medical reports?',
      answer: 'Yes, all your medical reports are available in the My Reports section accessible from the sidebar. You can filter by date, type, or doctor to find specific reports.'
    },
    {
      question: 'How do I schedule a new appointment?',
      answer: 'To schedule a new appointment, navigate to the Appointments page from the sidebar, then click on the "Schedule Appointment" button. Select your preferred date, time, and doctor from the available options.'
    },
    {
      question: 'How are my health metrics calculated?',
      answer: 'Health metrics are calculated based on data from your connected health devices, manual entries, and medical test results. The system uses standard medical algorithms to interpret this data and present insights on your dashboard.'
    },
    {
      question: 'Is my medical data secure?',
      answer: 'Yes, we take data security seriously. All medical data is encrypted both in transit and at rest. We comply with HIPAA regulations and implement industry-standard security measures to protect your information.'
    },
    {
      question: 'How do I contact my doctor directly?',
      answer: 'You can message your doctor directly through the Message Your Doctor widget on your dashboard or by using the messaging feature in the Appointments section. Your doctor will typically respond within 24-48 business hours.'
    }
  ];
  
  const filteredFaqItems = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;
  
  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {filteredFaqItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No FAQs match your search criteria.</p>
          </div>
        )}
        
        <div className="mt-8 border-t pt-6">
          <h3 className="font-medium mb-2">Didn't find what you were looking for?</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <Input 
              placeholder="Ask a question..." 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="flex-1"
            />
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" />
              Submit Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
