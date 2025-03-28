
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentationTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
        <CardDescription>Comprehensive guides and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start h-auto py-4 px-5">
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold">User Guide</span>
              <span className="text-sm text-muted-foreground">Complete platform guide</span>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4 px-5">
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold">API Documentation</span>
              <span className="text-sm text-muted-foreground">For developers</span>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4 px-5">
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold">Health Integration Guide</span>
              <span className="text-sm text-muted-foreground">Connect fitness apps</span>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4 px-5">
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold">Exercise Guides</span>
              <span className="text-sm text-muted-foreground">Video tutorials</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationTab;
