
import React from 'react';
import { Html } from '@react-three/drei';
import { HotspotProps } from './types';
import { AnatomicalMapping, Biomarker } from '@/types/medicalData';

interface HotspotComponentProps extends HotspotProps {
  isEditMode?: boolean;
}

// We now handle both the 3D model hotspots and the 2D anatomical map hotspots
// through interface overloading
const Hotspot = (props: HotspotComponentProps | { mapping: AnatomicalMapping; biomarkers: Biomarker[] }) => {
  // If it's a 3D hotspot from the anatomical view
  if ('position' in props && 'color' in props) {
    const { position, color, size, label, onClick, isEditMode = false } = props;
    return (
      <mesh
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={isEditMode ? '#FFB800' : color} />
        <Html
          distanceFactor={10}
          position={[0, size + 0.1, 0]}
          style={{
            pointerEvents: 'none',
            // Ensure content is centered on the hotspot
            transform: 'translate(-50%, -100%)',
            // Setting a minimum width prevents super-narrow labels
            minWidth: '50px'
          }}
          // Ensures the label stays visible even when close to edges
          occlude={false}
          zIndexRange={[100, 0]}
        >
          <div
            className={`px-2 py-1 rounded text-xs text-center whitespace-nowrap ${
              isEditMode ? 'bg-amber-100/90 text-amber-800' : 'bg-white/80'
            }`}
          >
            {label}
            {isEditMode && <span className="ml-1">✏️</span>}
          </div>
        </Html>
      </mesh>
    );
  } 
  // If it's a 2D hotspot from the anatomical map
  else if ('mapping' in props) {
    const { mapping, biomarkers } = props;
    const severity = mapping.severity;
    const severityColor = 
      severity >= 8 ? 'bg-red-500' : 
      severity >= 5 ? 'bg-orange-500' : 
      'bg-yellow-500';

    return (
      <div 
        className={`absolute w-5 h-5 rounded-full ${severityColor} flex items-center justify-center cursor-pointer z-10`}
        style={{ 
          left: `${mapping.coordinates.x}%`, 
          top: `${mapping.coordinates.y}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)'
        }}
        title={mapping.bodyPart}
      >
        <span className="text-white text-xs font-bold">
          {mapping.affectedBiomarkers.length}
        </span>
      </div>
    );
  }
  
  // Default return in case neither condition is met
  return null;
};

export default Hotspot;
