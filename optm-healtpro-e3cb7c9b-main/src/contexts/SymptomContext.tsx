
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SymptomEntry {
  id: string;
  date: Date;
  symptomName: string;
  painLevel: number;
  location: string;
  notes: string;
}

interface SymptomContextType {
  symptoms: SymptomEntry[];
  addSymptom: (symptom: SymptomEntry) => void;
  updateSymptom: (id: string, updatedSymptom: SymptomEntry) => void;
  deleteSymptom: (id: string) => void;
}

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export const useSymptoms = (): SymptomContextType => {
  const context = useContext(SymptomContext);
  if (!context) {
    throw new Error('useSymptoms must be used within a SymptomProvider');
  }
  return context;
};

interface SymptomProviderProps {
  children: ReactNode;
}

export const SymptomProvider: React.FC<SymptomProviderProps> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);

  const addSymptom = (symptom: SymptomEntry) => {
    setSymptoms(prev => [...prev, symptom]);
  };

  const updateSymptom = (id: string, updatedSymptom: SymptomEntry) => {
    setSymptoms(prev => prev.map(symptom => 
      symptom.id === id ? updatedSymptom : symptom
    ));
  };

  const deleteSymptom = (id: string) => {
    setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
  };

  return (
    <SymptomContext.Provider value={{ symptoms, addSymptom, updateSymptom, deleteSymptom }}>
      {children}
    </SymptomContext.Provider>
  );
};
