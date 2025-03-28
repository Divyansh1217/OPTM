
import React from 'react';
import { Scan, Upload, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const BiomarkerHowItWorks: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-primary" />
          How It Works
        </CardTitle>
        <CardDescription>
          Learn how we process your test results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Upload Your Reports</h4>
              <p className="text-sm text-muted-foreground">
                Upload your lab test results in PDF or image format
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Scan className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">AI Processing</h4>
              <p className="text-sm text-muted-foreground">
                Our AI system scans and extracts key biomarker data from your reports
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Results Added</h4>
              <p className="text-sm text-muted-foreground">
                Extracted data is added to your biomarker profile for easy tracking
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-muted">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Important Note</h4>
                <p className="text-xs text-muted-foreground">
                  While our system is highly accurate, it's always a good idea to verify 
                  the extracted data against your original reports. If you notice any 
                  discrepancies, please contact your healthcare provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiomarkerHowItWorks;
