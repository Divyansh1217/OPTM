
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, ArrowRight, FileText, Smartphone, Calendar, Activity } from 'lucide-react';
import { CardGrid } from '@/components/ui/card-grid';

interface HelpContentProps {
  searchQuery: string;
}

const HelpContent: React.FC<HelpContentProps> = ({ searchQuery }) => {
  const helpGuides = [
    {
      id: 1,
      title: 'Getting Started with the Dashboard',
      description: 'Learn how to navigate and customize your patient dashboard',
      icon: <Activity className="h-8 w-8 text-primary" />,
      category: 'dashboard'
    },
    {
      id: 2,
      title: 'Connecting Health Apps',
      description: 'How to connect and sync data from your fitness and health applications',
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      category: 'integration'
    },
    {
      id: 3,
      title: 'Managing Appointments',
      description: 'Schedule, cancel, and get reminders for your healthcare appointments',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      category: 'appointments'
    },
    {
      id: 4,
      title: 'Understanding Medical Reports',
      description: 'How to view and interpret your medical documents and lab results',
      icon: <FileText className="h-8 w-8 text-primary" />,
      category: 'reports'
    },
  ];
  
  const filteredGuides = searchQuery 
    ? helpGuides.filter(guide => 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpGuides;
    
  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p className="text-muted-foreground mb-6">
          Welcome to our platform! Here are some resources to help you get started:
        </p>
        
        <CardGrid columns={2} gap="md" className="mb-6">
          {filteredGuides.map(guide => (
            <Card key={guide.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                {guide.icon}
                <div>
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardGrid>
        
        <div className="bg-primary/5 rounded-lg p-4 flex items-center gap-4">
          <div className="bg-primary/10 rounded-full p-2">
            <PlayCircle className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Video Tour</h3>
            <p className="text-sm text-muted-foreground">Take a guided tour of all platform features</p>
          </div>
          <Button>Watch Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HelpContent;
