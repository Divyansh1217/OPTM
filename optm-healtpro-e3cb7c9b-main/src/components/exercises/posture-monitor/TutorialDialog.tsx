
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TutorialDialog: React.FC<TutorialDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>How to Use the AI Squat Analyzer</DialogTitle>
          <DialogDescription>
            Follow these steps for an effective workout session
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Step 1: Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Position your device so your full body is visible in the camera frame. 
              Wear form-fitting clothing to help the AI detect your body accurately.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Step 2: Start the Camera</h3>
            <p className="text-sm text-muted-foreground">
              Click the "Start Camera" button and allow camera permissions when prompted. 
              Make sure you can see yourself in the video display.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Step 3: Perform the Exercise</h3>
            <p className="text-sm text-muted-foreground">
              Stand with feet shoulder-width apart. For proper squat form:
            </p>
            <ul className="text-sm list-disc pl-5 text-muted-foreground">
              <li>Keep your back straight</li>
              <li>Lower your body by bending your knees</li>
              <li>Keep your knees aligned with your toes</li>
              <li>Go as low as comfortable, ideally until thighs are parallel to the floor</li>
              <li>Push through your heels to return to standing position</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Step 4: Follow AI Feedback</h3>
            <p className="text-sm text-muted-foreground">
              The AI will analyze your form in real-time and provide feedback. 
              Pay attention to the instructions to improve your technique.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Step 5: Track Your Progress</h3>
            <p className="text-sm text-muted-foreground">
              Your reps and form accuracy are tracked automatically. 
              Aim to improve your form score with each session.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
