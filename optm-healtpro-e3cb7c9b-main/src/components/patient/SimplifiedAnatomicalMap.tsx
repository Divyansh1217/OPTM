import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AnatomicalView from '@/components/patient/AnatomicalView';
import { Hotspot } from '@/components/patient/anatomical-view/types';
interface SimplifiedAnatomicalMapProps {
  patientId: number;
  onRegionSelect?: (region: string) => void;
}
const SimplifiedAnatomicalMap: React.FC<SimplifiedAnatomicalMapProps> = ({
  patientId,
  onRegionSelect
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);

  // Handle region selection and propagate to parent if needed
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    if (onRegionSelect) {
      onRegionSelect(region);
    }
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Anatomical Map</h3>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 h-[600px] md:h-[400px]">
        <div className="flex-1">
          <AnatomicalView selectedRegion={selectedRegion} onSelectRegion={handleRegionSelect} patientId={patientId} />
        </div>
        
        <div className="flex-1 mt-4 md:mt-0">
          {selectedRegion ? <div className="h-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-2">{selectedRegion}</h3>
              <p className="text-muted-foreground mb-4">Selected anatomical region</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Common Issues</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Inflammation</li>
                    <li>Stiffness</li>
                    <li>Pain on movement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Stretching exercises</li>
                    <li>Cold compress</li>
                    <li>Posture management</li>
                  </ul>
                </div>
              </div>
            </div> : <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-muted-foreground">Select a region on the anatomical map</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default SimplifiedAnatomicalMap;