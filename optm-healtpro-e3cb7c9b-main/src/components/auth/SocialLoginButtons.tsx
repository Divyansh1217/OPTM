
import React from 'react';
import { GoogleLoginButton } from './social';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

interface SocialLoginButtonsProps {
  onGoogleLogin: () => Promise<void>;
  isSubmitting: boolean;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
  isSubmitting
}) => {
  return (
    <motion.div 
      className="flex flex-col gap-3 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="p-0.5 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-lg mb-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <GoogleLoginButton 
          onLogin={onGoogleLogin}
          disabled={isSubmitting}
        />
      </motion.div>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialLoginButtons;
