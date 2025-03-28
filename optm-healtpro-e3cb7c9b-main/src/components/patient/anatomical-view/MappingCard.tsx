
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { AnatomicalMapping, Biomarker } from '@/types/medicalData';

interface MappingCardProps {
  mapping: AnatomicalMapping;
  biomarkers: Biomarker[];
}

const MappingCard: React.FC<MappingCardProps> = ({ mapping, biomarkers }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base capitalize">{mapping.bodyPart}</CardTitle>
            <CardDescription>
              {mapping.affectedBiomarkers.length} related biomarker{mapping.affectedBiomarkers.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
          <div className={`
            p-1 rounded-full 
            ${mapping.severity >= 8 ? 'bg-red-100 text-red-600' : 
              mapping.severity >= 5 ? 'bg-amber-100 text-amber-600' : 
              'bg-yellow-100 text-yellow-600'}
          `}>
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Severity:</span> {mapping.severity}/10
          </div>
          
          <div className="text-sm">
            <span className="font-medium">Related biomarkers:</span>
            <ul className="mt-1 space-y-1 pl-4 text-xs">
              {biomarkers.map(biomarker => (
                <li key={biomarker.id}>
                  {biomarker.name}: <span className={`${
                    biomarker.latestValue.status === 'normal' ? 'text-green-600' :
                    biomarker.latestValue.status === 'critical' ? 'text-red-600' :
                    'text-amber-600'
                  }`}>
                    {biomarker.latestValue.value} {biomarker.latestValue.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {mapping.notes && (
            <div className="text-xs text-muted-foreground mt-2 border-t pt-2">
              {mapping.notes}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MappingCard;
