
import React from 'react';
import { Badge } from '@/components/ui/badge';

const TreatmentRecommendations: React.FC = () => {
  const recommendations = [
    {
      category: 'Exercise Protocol',
      items: [
        {
          text: 'Implement progressive knee mobility protocol with focus on controlled ROM exercises',
          priority: 'high'
        },
        {
          text: 'Add core stabilization and pelvic alignment exercises to treatment plan',
          priority: 'medium'
        },
        {
          text: 'Progress to moderate resistance training with attention to proper biomechanics',
          priority: 'high'
        }
      ]
    },
    {
      category: 'Medication & Lifestyle',
      items: [
        {
          text: 'Consider anti-inflammatory protocol based on elevated inflammatory markers',
          priority: 'high'
        },
        {
          text: 'Recommend anti-inflammatory diet modifications and stress reduction techniques',
          priority: 'medium'
        }
      ]
    },
    {
      category: 'Follow-up',
      items: [
        {
          text: 'Schedule follow-up assessment in 2 weeks to evaluate response to updated protocol',
          priority: 'high'
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {recommendations.map((category, index) => (
        <div key={index} className="mb-4">
          <h4 className="font-medium mb-2">{category.category}</h4>
          <p className="text-xs text-muted-foreground mb-2">Based on patient's progress and current status</p>
          
          <ul className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2 bg-muted/50 p-2 rounded-md">
                <span className="text-sm mr-2">{itemIndex + 1}.</span>
                <div className="flex-1">
                  <p className="text-sm">{item.text}</p>
                </div>
                <Badge 
                  variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}
                  className="text-xs whitespace-nowrap"
                >
                  {item.priority === 'high' ? 'High Priority' : 
                   item.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TreatmentRecommendations;
