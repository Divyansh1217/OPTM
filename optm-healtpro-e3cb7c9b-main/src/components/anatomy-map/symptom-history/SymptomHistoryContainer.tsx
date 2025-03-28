import React, { useState } from 'react';
import { BodyRegion, PainSymptom } from '../types';
import SymptomHistoryTable from './SymptomHistoryTable';
import SymptomDialog from '../SymptomDialog';
import SymptomDetailsDialog from '../SymptomDetailsDialog';

interface SymptomHistoryContainerProps {
  symptoms: PainSymptom[];
  bodyRegions: BodyRegion[];
  regions?: BodyRegion[];
  onEditSymptom?: (symptom: PainSymptom) => void;
  onUpdateSymptom: (symptom: PainSymptom) => void;
  onDeleteSymptom: (symptomId: string) => void;
  onToggleActive: (symptomId: string, isActive: boolean) => void;
  loading: boolean;
}

const SymptomHistoryContainer: React.FC<SymptomHistoryContainerProps> = ({
  symptoms,
  bodyRegions,
  regions,
  onEditSymptom,
  onUpdateSymptom,
  onDeleteSymptom,
  onToggleActive,
  loading
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<PainSymptom | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
  
  const handleEditClick = (symptom: PainSymptom) => {
    const region = bodyRegions.find(r => r.id === symptom.bodyRegionId) || null;
    setSelectedSymptom(symptom);
    setSelectedRegion(region);
    
    if (onEditSymptom) {
      // If external handler is provided, use it
      onEditSymptom(symptom);
    } else {
      // Otherwise open the edit dialog
      setEditDialogOpen(true);
    }
  };
  
  const handleViewDetails = (symptom: PainSymptom) => {
    const region = bodyRegions.find(r => r.id === symptom.bodyRegionId) || null;
    setSelectedSymptom(symptom);
    setSelectedRegion(region);
    setDetailsDialogOpen(true);
  };

  // Dummy function for passing to SymptomDialog when in edit mode
  const handleDummyAdd = (symptom: PainSymptom) => {
    // This function is not used in edit mode, but is required by the interface
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold">Symptom History</h2>
      
      <SymptomHistoryTable 
        symptoms={symptoms}
        bodyRegions={bodyRegions}
        onToggleActive={onToggleActive}
        loading={loading}
        onViewDetails={handleViewDetails}
        onEditClick={handleEditClick}
        onDeleteSymptom={onDeleteSymptom}
      />
      
      {/* Edit Dialog */}
      {editDialogOpen && selectedSymptom && selectedRegion && (
        <SymptomDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          selectedRegion={selectedRegion}
          existingSymptom={selectedSymptom}
          isEditMode={true}
          onAddSymptom={handleDummyAdd}
          onUpdateSymptom={onUpdateSymptom}
          onDeleteSymptom={onDeleteSymptom}
          bodyRegions={bodyRegions}
          existingSymptoms={symptoms.filter(s => s.bodyRegionId === selectedRegion.id)}
          loading={loading}
        />
      )}
      
      {/* Details Dialog */}
      {detailsDialogOpen && selectedSymptom && selectedRegion && (
        <SymptomDetailsDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          symptom={selectedSymptom}
          region={selectedRegion}
        />
      )}
    </div>
  );
};

export default SymptomHistoryContainer;
