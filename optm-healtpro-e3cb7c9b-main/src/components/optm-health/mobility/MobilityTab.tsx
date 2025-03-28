
import React from 'react';
import { Separator } from '@/components/ui/separator';
import MobilityMeasurementField from './MobilityMeasurementField';
import { MobilityMeasurements } from '@/types/optm-health';

interface MobilityTabProps {
  mobilityMeasurements: MobilityMeasurements;
  onMobilityChange: (measurement: keyof MobilityMeasurements, field: string, value: any) => void;
  previousMobilityMeasurements?: MobilityMeasurements; // Added previous measurements
  errors?: string[]; // Added errors prop
}

const MobilityTab: React.FC<MobilityTabProps> = ({
  mobilityMeasurements,
  onMobilityChange,
  previousMobilityMeasurements,
  errors = [] // Default to empty array
}) => {
  return (
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-4">Knee Measurements</h3>
        
        <MobilityMeasurementField
          label="Knee Flexion"
          measurement="kneeFlexion"
          value={mobilityMeasurements?.kneeFlexion}
          previousValue={previousMobilityMeasurements?.kneeFlexion}
          normalRange="135-150°"
          onChange={onMobilityChange}
          hasSide
          isIncreaseImprovement={true}
        />
        
        <MobilityMeasurementField
          label="Knee Extension"
          measurement="kneeExtension"
          value={mobilityMeasurements?.kneeExtension}
          previousValue={previousMobilityMeasurements?.kneeExtension}
          normalRange="0° (neutral)"
          onChange={onMobilityChange}
          hasSide
          isIncreaseImprovement={false}
        />
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Pelvic Measurements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <MobilityMeasurementField
              label="Pelvic Tilt Angle"
              measurement="pelvicTilt"
              value={mobilityMeasurements?.pelvicTilt}
              previousValue={previousMobilityMeasurements?.pelvicTilt}
              normalRange="4-7°"
              onChange={onMobilityChange}
              isIncreaseImprovement={false}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Additional Measurements</h3>
        
        <MobilityMeasurementField
          label="Cervical Rotation"
          measurement="cervicalRotation"
          value={mobilityMeasurements?.cervicalRotation}
          previousValue={previousMobilityMeasurements?.cervicalRotation}
          normalRange="70-90°"
          onChange={onMobilityChange}
          hasDirection
          isIncreaseImprovement={true}
        />
        
        <MobilityMeasurementField
          label="Shoulder Flexion"
          measurement="shoulderFlexion"
          value={mobilityMeasurements?.shoulderFlexion}
          previousValue={previousMobilityMeasurements?.shoulderFlexion}
          normalRange="150-180°"
          onChange={onMobilityChange}
          hasSide
          isIncreaseImprovement={true}
        />
      </div>
    </div>
  );
};

export default MobilityTab;
