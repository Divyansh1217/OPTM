import React from 'react';
import { BodySystem } from './types';
import SystemSelector from './SystemSelector';
interface HeaderProps {
  systems: BodySystem[];
  activeSystem: string;
  onSystemChange: (value: string) => void;
  isEditMode?: boolean;
}
const Header: React.FC<HeaderProps> = ({
  systems,
  activeSystem,
  onSystemChange,
  isEditMode = false
}) => {
  return <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div className="flex-1">
        <h3 className="text-lg font-medium flex items-center px-0 text-center">
          Anatomical View
          {isEditMode && <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
              Edit Mode
            </span>}
        </h3>
        
      </div>
      
      <SystemSelector systems={systems} activeSystem={activeSystem} onSystemChange={onSystemChange} />
    </div>;
};
export default Header;