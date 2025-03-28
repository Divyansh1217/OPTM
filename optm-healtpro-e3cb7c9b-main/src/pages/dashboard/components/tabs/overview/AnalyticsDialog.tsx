
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface AnalyticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AnalyticsDialog: React.FC<AnalyticsDialogProps> = ({ open, onOpenChange }) => {
  const handleViewFullAnalytics = () => {
    toast.info("Redirecting to full analytics dashboard");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Clinic Analytics</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold mt-1">243</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Appointments</p>
                  <p className="text-2xl font-bold mt-1">38</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold mt-1">$5,230</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium mb-3">Monthly Patient Visits</h3>
              <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </div>
            
            <Button 
              onClick={handleViewFullAnalytics}
              className="w-full"
            >
              View Full Analytics Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsDialog;
