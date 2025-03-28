
import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface ForgotPasswordFormProps {
  forgotEmail: string;
  setForgotEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onBackToLogin: () => void;
  isSubmitting: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  forgotEmail,
  setForgotEmail,
  onSubmit,
  onBackToLogin,
  isSubmitting
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
      <p className="text-muted-foreground text-center mb-6">Enter your email to receive a password reset link</p>
      
      <motion.form 
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="mb-6 space-y-2">
          <Label htmlFor="forgotEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <Input
              id="forgotEmail"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="pl-10 h-11 rounded-lg transition-all border-gray-300 dark:border-gray-600 focus:border-primary/70 focus:ring focus:ring-primary/20"
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-2.5 h-11 font-medium flex items-center justify-center gap-2"
            onClick={onBackToLogin}
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 py-2.5 h-11 font-medium transition-all hover:shadow-md active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ForgotPasswordForm;
