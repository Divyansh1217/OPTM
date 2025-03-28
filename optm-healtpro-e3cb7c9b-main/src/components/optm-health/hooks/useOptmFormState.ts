
import { useState } from 'react';
import { 
  OptmPatientData,
  MusculoskeletalBiomarkers,
  MobilityMeasurements,
  ImagingData
} from '@/types/optm-health';

export const useOptmFormState = (initialData?: Partial<OptmPatientData>) => {
  const [activeTab, setActiveTab] = useState<string>('patient-info');
  
  const [patientData, setPatientData] = useState<Partial<OptmPatientData>>({
    patientId: initialData?.patientId || '',
    name: initialData?.name || '',
    age: initialData?.age || undefined,
    gender: initialData?.gender || undefined,
    treatmentStage: initialData?.treatmentStage || undefined,
    biomarkers: initialData?.biomarkers || {},
    anatomicalMeasurements: initialData?.anatomicalMeasurements || {},
    mobilityMeasurements: initialData?.mobilityMeasurements || {},
    imaging: initialData?.imaging || [],
    lastUpdated: initialData?.lastUpdated || new Date().toISOString()
  });
  
  // Patient Info changes
  const handlePatientInfoChange = (field: string, value: any) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Biomarker changes
  const handleBiomarkerChange = (marker: keyof MusculoskeletalBiomarkers, value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    
    setPatientData(prev => {
      // Use empty object as fallback
      const biomarkers = prev.biomarkers || {};
      
      return {
        ...prev,
        biomarkers: {
          ...biomarkers,
          [marker]: numValue
        }
      };
    });
  };
  
  // Anatomical measurement changes
  const handleAnatomicalCtmChange = (value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    
    setPatientData(prev => {
      // Use empty object as fallback
      const anatomicalMeasurements = prev.anatomicalMeasurements || {};
      
      return {
        ...prev,
        anatomicalMeasurements: {
          ...anatomicalMeasurements,
          ctm: numValue
        }
      };
    });
  };
  
  const handleCircumferenceChange = (type: 'ccm' | 'cap' | 'cbp', index: number, field: string, value: any) => {
    setPatientData(prev => {
      const measurements = [...(prev.anatomicalMeasurements?.[type] || [])];
      
      if (!measurements[index]) {
        measurements[index] = {} as any;
      }
      
      if (field === 'value' && typeof value === 'string') {
        measurements[index][field] = value === '' ? 0 : parseFloat(value);
      } else {
        measurements[index][field] = value;
      }
      
      return {
        ...prev,
        anatomicalMeasurements: {
          ...prev.anatomicalMeasurements,
          [type]: measurements
        }
      };
    });
  };
  
  const addCircumferenceMeasurement = (type: 'ccm' | 'cap' | 'cbp') => {
    setPatientData(prev => {
      const newMeasurement = {
        value: 0,
        unit: 'cm' as const,
        location: '',
        ...(type !== 'ccm' ? { side: 'right' as const } : {})
      };
      
      return {
        ...prev,
        anatomicalMeasurements: {
          ...prev.anatomicalMeasurements,
          [type]: [...(prev.anatomicalMeasurements?.[type] || []), newMeasurement]
        }
      };
    });
  };
  
  const removeCircumferenceMeasurement = (type: 'ccm' | 'cap' | 'cbp', index: number) => {
    setPatientData(prev => {
      const measurements = [...(prev.anatomicalMeasurements?.[type] || [])];
      measurements.splice(index, 1);
      
      return {
        ...prev,
        anatomicalMeasurements: {
          ...prev.anatomicalMeasurements,
          [type]: measurements
        }
      };
    });
  };
  
  // Mobility measurement changes
  const handleMobilityChange = (
    measurement: keyof MobilityMeasurements, 
    field: string, 
    value: any
  ) => {
    setPatientData(prev => {
      const prevMeasurements = prev.mobilityMeasurements || {};
      const currentMeasurement = prevMeasurements[measurement] || {};
      
      let newValue = value;
      if (field === 'value' && typeof value === 'string') {
        newValue = value === '' ? 0 : parseFloat(value);
      }
      
      return {
        ...prev,
        mobilityMeasurements: {
          ...prevMeasurements,
          [measurement]: {
            ...currentMeasurement,
            [field]: newValue
          }
        }
      };
    });
  };
  
  // Imaging changes
  const addImage = () => {
    const newImage: ImagingData = {
      id: `img-${Date.now()}`,
      type: 'x-ray',
      bodyPart: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      stage: 'pre-treatment',
      notes: ''
    };
    
    setPatientData(prev => ({
      ...prev,
      imaging: [...(prev.imaging || []), newImage]
    }));
  };
  
  const removeImage = (id: string) => {
    setPatientData(prev => ({
      ...prev,
      imaging: (prev.imaging || []).filter(img => img.id !== id)
    }));
  };
  
  const updateImage = (id: string, field: keyof ImagingData, value: any) => {
    setPatientData(prev => ({
      ...prev,
      imaging: (prev.imaging || []).map(img => 
        img.id === id ? { ...img, [field]: value } : img
      )
    }));
  };
  
  // Validation logic for each tab
  const validateTabData = (tab: string): string[] => {
    const errors: string[] = [];
    
    switch (tab) {
      case 'patient-info':
        if (!patientData.patientId) errors.push('Patient ID is required');
        if (!patientData.name) errors.push('Patient name is required');
        if (!patientData.age) errors.push('Patient age is required');
        if (!patientData.gender) errors.push('Patient gender is required');
        if (!patientData.treatmentStage) errors.push('Treatment stage is required');
        break;
        
      case 'biomarkers':
        // Optional validation for biomarkers
        if (patientData.biomarkers) {
          Object.entries(patientData.biomarkers).forEach(([key, value]) => {
            if (value !== undefined && typeof value !== 'number') {
              errors.push(`Invalid value for biomarker: ${key}`);
            }
          });
        }
        break;
        
      case 'anatomical':
        // Validate CTM if provided
        if (patientData.anatomicalMeasurements?.ctm !== undefined && 
            typeof patientData.anatomicalMeasurements.ctm !== 'number') {
          errors.push('CTM must be a valid number');
        }
        
        // Validate circumference measurements
        ['ccm', 'cap', 'cbp'].forEach(type => {
          const measurements = patientData.anatomicalMeasurements?.[type as 'ccm' | 'cap' | 'cbp'] || [];
          measurements.forEach((m, index) => {
            if (!m.location) errors.push(`Location is required for ${type.toUpperCase()} measurement #${index + 1}`);
            if (typeof m.value !== 'number') errors.push(`Value must be a number for ${type.toUpperCase()} measurement #${index + 1}`);
          });
        });
        break;
        
      case 'mobility':
        // Validate mobility measurements if provided
        Object.entries(patientData.mobilityMeasurements || {}).forEach(([key, measurement]) => {
          if (measurement && typeof measurement.value !== 'number') {
            errors.push(`Value must be a number for ${key}`);
          }
        });
        break;
        
      case 'imaging':
        // Validate imaging data if provided
        (patientData.imaging || []).forEach((img, index) => {
          if (!img.bodyPart) errors.push(`Body part is required for image #${index + 1}`);
          if (!img.type) errors.push(`Type is required for image #${index + 1}`);
          if (!img.stage) errors.push(`Stage is required for image #${index + 1}`);
        });
        break;
    }
    
    return errors;
  };
  
  const prepareDataForSubmission = (): OptmPatientData => {
    return {
      ...patientData,
      lastUpdated: new Date().toISOString()
    } as OptmPatientData;
  };
  
  return {
    activeTab,
    setActiveTab,
    patientData,
    handlePatientInfoChange,
    handleBiomarkerChange,
    handleAnatomicalCtmChange,
    handleCircumferenceChange,
    addCircumferenceMeasurement,
    removeCircumferenceMeasurement,
    handleMobilityChange,
    addImage,
    removeImage,
    updateImage,
    prepareDataForSubmission,
    validateTabData
  };
};
