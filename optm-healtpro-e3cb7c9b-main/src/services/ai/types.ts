
export interface ParsedResponse {
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  extractedBiomarkers: {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: string;
  }[];
}
