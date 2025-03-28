
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Phone, Mail } from 'lucide-react';

interface PatientProfileProps {
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
  email: string;
  image?: string;
  className?: string;
}

const PatientProfile: React.FC<PatientProfileProps> = ({
  name,
  age,
  gender,
  address,
  phone,
  email,
  image,
  className,
}) => {
  return (
    <motion.div
      className={cn("glass-morphism rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-semibold text-primary">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-medical-green flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">
            {age} years • {gender}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{address}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{phone}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{email}</span>
        </div>
      </div>
      
      <div className="mt-6 flex gap-2">
        <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/90">
          Contact
        </button>
        <button className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary/90">
          View History
        </button>
      </div>
    </motion.div>
  );
};

export default PatientProfile;
