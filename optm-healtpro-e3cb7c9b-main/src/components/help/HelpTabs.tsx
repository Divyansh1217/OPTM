
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, MessageCircle, FileText, Mail } from 'lucide-react';
import GetStartedTab from './GetStartedTab';
import FaqTab from './FaqTab';
import DocumentationTab from './DocumentationTab';
import ContactSupportTab from './ContactSupportTab';

interface HelpTabsProps {
  defaultTab?: string;
}

const HelpTabs: React.FC<HelpTabsProps> = ({ defaultTab = "getStarted" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-6 w-full justify-start overflow-x-auto">
        <TabsTrigger value="getStarted" className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          Get Started
        </TabsTrigger>
        <TabsTrigger value="faq" className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          FAQs
        </TabsTrigger>
        <TabsTrigger value="documentation" className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          Documentation
        </TabsTrigger>
        <TabsTrigger value="support" className="flex items-center gap-1">
          <Mail className="h-4 w-4" />
          Contact Support
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="getStarted">
        <GetStartedTab />
      </TabsContent>
      
      <TabsContent value="faq">
        <FaqTab />
      </TabsContent>
      
      <TabsContent value="documentation">
        <DocumentationTab />
      </TabsContent>
      
      <TabsContent value="support">
        <ContactSupportTab />
      </TabsContent>
    </Tabs>
  );
};

export default HelpTabs;
