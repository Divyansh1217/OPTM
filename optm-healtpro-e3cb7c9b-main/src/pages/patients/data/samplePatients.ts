
import { Patient } from '../types';

export const samplePatients: Patient[] = [
  {
    id: 1,
    name: "Jane Smith",
    age: 42,
    gender: "Female",
    address: "456 Elm St, City, State, 12345",
    phone: "(123) 456-7890",
    email: "jane.smith@example.com",
    condition: "Rheumatoid Arthritis",
    icdCode: "M06.9",
    lastVisit: "2023-06-10",
    nextVisit: "2023-08-15",
    biomarkers: [
      {
        id: "bio1",
        name: "C-Reactive Protein (CRP)",
        value: 5.5,
        unit: "mg/L",
        normalRange: "0.0 - 8.0",
        status: "normal",
        timestamp: "2023-06-10",
        percentage: 85,
        trend: "stable",
        description: "C-reactive protein is a protein made by the liver. CRP levels in the blood increase when there is a condition causing inflammation somewhere in the body."
      },
      {
        id: "bio2",
        name: "Interleukin-6 (IL-6)",
        value: 12.8,
        unit: "pg/mL",
        normalRange: "0.0 - 7.0",
        status: "elevated",
        timestamp: "2023-06-10",
        percentage: 60,
        trend: "stable",
        description: "Interleukin-6 is an interleukin that acts as both a pro-inflammatory cytokine and an anti-inflammatory myokine."
      },
      {
        id: "bio3",
        name: "Tumor Necrosis Factor (TNF-α)",
        value: 22.3,
        unit: "pg/mL",
        normalRange: "0.0 - 15.0",
        status: "elevated",
        timestamp: "2023-06-10",
        percentage: 60,
        trend: "stable",
        description: "Tumor necrosis factor is a cell signaling protein involved in systemic inflammation."
      },
      {
        id: "bio4",
        name: "Erythrocyte Sedimentation Rate (ESR)",
        value: 28,
        unit: "mm/hr",
        normalRange: "0 - 22",
        status: "elevated",
        timestamp: "2023-06-09",
        percentage: 60,
        trend: "stable",
        description: "ESR is the rate at which red blood cells sediment in a period of one hour. It is a common hematology test that is a non-specific measure of inflammation."
      },
      {
        id: "bio5",
        name: "White Blood Cell Count (WBC)",
        value: 8.5,
        unit: "K/μL",
        normalRange: "4.5 - 11.0",
        status: "normal",
        timestamp: "2023-06-09",
        percentage: 85,
        trend: "stable",
        description: "A white blood cell count measures the number of white blood cells in your body. White blood cells help fight infections."
      },
      {
        id: "bio6",
        name: "Hemoglobin A1c (HbA1c)",
        value: 5.7,
        unit: "%",
        normalRange: "4.0 - 5.6",
        status: "elevated",
        timestamp: "2023-06-08",
        percentage: 60,
        trend: "stable",
        description: "Hemoglobin A1c is a form of hemoglobin that is bound to glucose. The higher the HbA1c, the higher the risk of developing diabetes complications."
      }
    ]
  },
  {
    id: 2,
    name: "John Doe",
    age: 35,
    gender: "Male",
    address: "123 Main St, City, State, 12345",
    phone: "(987) 654-3210",
    email: "john.doe@example.com",
    condition: "Osteoarthritis",
    icdCode: "M19.90",
    lastVisit: "2023-05-22",
    nextVisit: "2023-07-22",
    biomarkers: [
      {
        id: "bio7",
        name: "C-Reactive Protein (CRP)",
        value: 3.2,
        unit: "mg/L",
        normalRange: "0.0 - 8.0",
        status: "normal",
        timestamp: "2023-05-22",
        percentage: 85,
        trend: "stable",
        description: "C-reactive protein is a protein made by the liver. CRP levels in the blood increase when there is a condition causing inflammation somewhere in the body."
      },
      {
        id: "bio8",
        name: "White Blood Cell Count (WBC)",
        value: 7.8,
        unit: "K/μL",
        normalRange: "4.5 - 11.0",
        status: "normal",
        timestamp: "2023-05-22",
        percentage: 85,
        trend: "stable",
        description: "A white blood cell count measures the number of white blood cells in your body. White blood cells help fight infections."
      }
    ]
  },
  {
    id: 3,
    name: "Emily Johnson",
    age: 28,
    gender: "Female",
    address: "789 Oak St, City, State, 12345",
    phone: "(555) 123-4567",
    email: "emily.johnson@example.com",
    condition: "Fibromyalgia",
    icdCode: "M79.7",
    lastVisit: "2023-06-05",
    nextVisit: "2023-07-05",
    biomarkers: [
      {
        id: "bio9",
        name: "Sedimentation Rate (ESR)",
        value: 25,
        unit: "mm/hr",
        normalRange: "0 - 22",
        status: "elevated",
        timestamp: "2023-06-05",
        percentage: 60,
        trend: "up",
        description: "ESR is the rate at which red blood cells sediment in a period of one hour. It is a common hematology test that is a non-specific measure of inflammation."
      }
    ]
  }
];
