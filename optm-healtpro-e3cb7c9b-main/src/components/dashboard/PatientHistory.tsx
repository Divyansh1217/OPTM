
import React, { useState } from 'react';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import MedicalRecordsTabs from '@/components/patient/MedicalRecordsTabs';
import DeleteConfirmDialog from './patient-history/DeleteConfirmDialog';
import AddRecordDialog from './patient-history/AddRecordDialog';
import HeaderActions from './patient-history/HeaderActions';
import MainContent from './patient-history/MainContent';
import { PatientHistoryProps, RecordFormData } from './patient-history/types';
import { storeInLocalStorage, storeFileInLocalStorage } from '@/services/storage/localStorageService';

const PatientHistory: React.FC<PatientHistoryProps> = ({ patient, onClose, onUpdate }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [recordType, setRecordType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [recordForm, setRecordForm] = useState<RecordFormData>({
    name: '',
    date: '',
    type: '',
    notes: '',
    file: null
  });

  const handleAddRecord = (type: string) => {
    setRecordType(type);
    setShowAddRecordDialog(true);
    // Reset the form when opening 
    setRecordForm({
      name: '',
      date: new Date().toISOString().split('T')[0], // Set today's date as default
      type: '',
      notes: '',
      file: null
    });
  };

  const handleRecordSubmit = async () => {
    try {
      // Generate unique IDs for the record
      const recordId = uuidv4();
      let fileId = null;
      
      // If there's a file, upload it first
      if (recordForm.file) {
        fileId = uuidv4();
        await storeFileInLocalStorage('patient_records', fileId, recordForm.file);
      }
      
      // Create record object
      const newRecord = {
        id: recordId,
        patientId: patient.id,
        name: recordForm.name,
        date: recordForm.date,
        type: recordType,
        recordType: recordForm.type || recordType,
        notes: recordForm.notes,
        fileId: fileId,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      // Store the record
      storeInLocalStorage('patient_records', newRecord);
      
      // Show success message
      toast.success("Record Added", {
        description: `${recordForm.name} has been added to the patient's records.`,
        duration: 3000
      });
      
      // Close dialog and reset form
      setShowAddRecordDialog(false);
      setRecordForm({
        name: '',
        date: '',
        type: '',
        notes: '',
        file: null
      });
      
      // Update patient to reflect changes
      if (onUpdate && typeof onUpdate === 'function') {
        // In a real app, we would fetch the updated patient data
        // For now, we'll just close the dialog
        onUpdate({
          ...patient,
          lastUpdated: new Date().toISOString()
        });
      }
      
    } catch (error) {
      console.error("Error adding record:", error);
      toast.error("Failed to add record", {
        description: "There was a problem saving this record. Please try again.",
        duration: 3000
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRecordForm({
        ...recordForm,
        file: e.target.files[0]
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecordForm({
      ...recordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setRecordForm({
      ...recordForm,
      type: value
    });
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    toast.success("Region Selected", {
      description: `You selected the ${region} region.`,
      duration: 3000
    });
  };

  const handleAssignTests = () => {
    toast.success("Tests Assigned", {
      description: "Lab tests have been assigned to this patient.",
      duration: 3000
    });
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    toast.success("Record Deleted", {
      description: "The patient record has been permanently deleted.",
      duration: 3000
    });
    onClose();
  };

  return (
    <div className="space-y-6">
      <HeaderActions 
        onClose={onClose} 
        onDelete={() => setShowDeleteConfirm(true)} 
      />

      <MainContent 
        patient={patient}
        selectedRegion={selectedRegion}
        onSelectRegion={handleRegionSelect}
        onAssignTests={handleAssignTests}
      />

      {/* Medical Records Tabs Section */}
      <div className="mt-6">
        <MedicalRecordsTabs 
          patientId={patient.id}
          onAddRecord={handleAddRecord}
        />
      </div>

      <DeleteConfirmDialog 
        open={showDeleteConfirm} 
        onOpenChange={setShowDeleteConfirm}
        onDelete={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <AddRecordDialog 
        open={showAddRecordDialog}
        onOpenChange={setShowAddRecordDialog}
        recordType={recordType}
        recordForm={recordForm}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleRecordSubmit}
      />
    </div>
  );
};

export default PatientHistory;
