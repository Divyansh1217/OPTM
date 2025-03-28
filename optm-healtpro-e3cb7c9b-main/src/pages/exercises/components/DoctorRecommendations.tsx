
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from 'lucide-react';

// Mock recommendations - in a real app, this would come from a backend
const recommendations = [
  { 
    id: 1, 
    text: "Focus on strengthening your core to support your lower back",
    doctor: "Dr. Sarah Johnson"
  },
  { 
    id: 2, 
    text: "Gradually increase squat depth as your knee mobility improves",
    doctor: "Dr. Michael Chen"
  }
];

const DoctorRecommendations: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span>Doctor Recommendations</span>
        </CardTitle>
        <CardDescription>
          Personalized advice from your care team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="pb-3 border-b border-border/50 last:border-0 last:pb-0">
              <p className="text-sm mb-1">{rec.text}</p>
              <p className="text-xs text-muted-foreground">— {rec.doctor}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorRecommendations;
