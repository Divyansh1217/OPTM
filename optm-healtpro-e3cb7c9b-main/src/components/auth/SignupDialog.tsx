
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SignupDialogProps {
  showSignupDialog: boolean;
  setShowSignupDialog: (show: boolean) => void;
  signupData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleSignupInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  userType: 'doctor' | 'patient';
}

const SignupDialog: React.FC<SignupDialogProps> = ({
  showSignupDialog,
  setShowSignupDialog,
  signupData,
  handleSignupInputChange,
  handleSignup,
  isSubmitting,
  userType
}) => {
  return (
    <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>
            Sign up as a {userType === 'doctor' ? 'Doctor' : 'Patient'} to access OPTM HealPro
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSignup} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              name="name"
              value={signupData.name}
              onChange={handleSignupInputChange}
              placeholder={userType === 'doctor' ? "Dr. John Doe" : "Alex Johnson"}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleSignupInputChange}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              value={signupData.password}
              onChange={handleSignupInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <Input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              value={signupData.confirmPassword}
              onChange={handleSignupInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          <DialogFooter className="sm:justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSignupDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
