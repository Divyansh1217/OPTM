
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface MarketingPanelProps {
  userType: 'doctor' | 'patient';
}

const MarketingPanel: React.FC<MarketingPanelProps> = ({ userType }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-8">
      <motion.div
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-md text-white border border-white/20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
          </div>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4">Welcome to OPTM HealPro</motion.h2>
        
        <motion.p variants={itemVariants} className="mb-6 text-white/90 leading-relaxed">
          {userType === 'doctor' 
            ? 'Access your patient records, biomarkers, and treatment plans all in one place.'
            : 'Monitor your health progress, treatment plans, and communicate with your doctor.'}
        </motion.p>
        
        <motion.ul variants={containerVariants} className="space-y-4">
          {userType === 'doctor' ? (
            <>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Advanced patient tracking</span>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Interactive anatomical models</span>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Biomarker analysis and trends</span>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Secure and compliant platform</span>
              </motion.li>
            </>
          ) : (
            <>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Track your health progress</span>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>View your treatment plan</span>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Communication with your doctor</span>
              </motion.li>
              <motion.li variants={listItemVariants} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-blue-300 mr-3 flex-shrink-0" />
                <span>Secure access to medical records</span>
              </motion.li>
            </>
          )}
        </motion.ul>
        
        <motion.div 
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-white/20 text-sm text-white/70"
        >
          <p>Looking for the best healthcare experience?</p>
          <p className="mt-1">OPTM HealPro is trusted by thousands of medical professionals worldwide.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarketingPanel;
