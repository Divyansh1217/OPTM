
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help Center</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Learn the basics of using the dashboard and managing your clinic.</p>
              <Button variant="link" className="px-0 text-primary">View Guide</Button>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Patient Management</h3>
              <p className="text-sm text-muted-foreground">Learn how to add, edit, and manage patient records.</p>
              <Button variant="link" className="px-0 text-primary">View Guide</Button>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Need more help? Our support team is available 24/7.</p>
              <Button variant="link" className="px-0 text-primary">Contact Support</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
