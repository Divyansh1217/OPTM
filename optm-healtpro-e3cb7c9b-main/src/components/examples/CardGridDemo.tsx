
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CardGrid } from '@/components/ui/card-grid';
import { Button } from '@/components/ui/button';

const CardGridDemo: React.FC = () => {
  // Sample data for demo cards
  const items = [
    { id: 1, title: 'Basic Card', content: 'Simple card with minimal content' },
    { id: 2, title: 'Card with Footer', content: 'This card includes a footer with actions' },
    { id: 3, title: 'Detailed Card', content: 'A more complex card with multiple sections' },
    { id: 4, title: 'Action Card', content: 'This card has interactive elements' }
  ];

  return (
    <div className="space-y-12 p-6">
      {/* Basic responsive grid (1 column on mobile, 2 on tablet, 3 on desktop) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Responsive Card Grid</h2>
        <CardGrid columns="responsive" gap="md">
          {items.map(item => (
            <Card key={item.id} className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </CardGrid>
      </section>

      {/* 2-column grid with small gap */}
      <section>
        <h2 className="text-xl font-semibold mb-4">2-Column Card Grid (Small Gap)</h2>
        <CardGrid columns={2} gap="sm">
          {items.slice(0, 2).map(item => (
            <Card key={item.id} className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter>
                <Button>Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </CardGrid>
      </section>

      {/* 4-column grid with large gap and variable height cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">4-Column Card Grid (Variable Height)</h2>
        <CardGrid columns={4} gap="lg" equalHeight={false}>
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{item.content}</p>
                {item.id % 2 === 0 && (
                  <p className="mt-2 text-xs">Additional content to create variable height</p>
                )}
              </CardContent>
            </Card>
          ))}
        </CardGrid>
      </section>
    </div>
  );
};

export default CardGridDemo;
