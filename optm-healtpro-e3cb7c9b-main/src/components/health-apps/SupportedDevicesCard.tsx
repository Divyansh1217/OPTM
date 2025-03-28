
import React from 'react';
import { Button } from '@/components/ui/button';

const SupportedDevicesCard: React.FC = () => {
  return (
    <div className="glass-morphism rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Supported Devices</h3>
      <p className="text-sm text-muted-foreground mb-4">
        We support a wide range of fitness trackers and health monitoring devices.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 border rounded-lg bg-card">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-medium">Apple</span>
          </div>
          <p className="text-xs">Apple Watch</p>
        </div>
        <div className="text-center p-3 border rounded-lg bg-card">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-medium">Fitbit</span>
          </div>
          <p className="text-xs">Fitbit Devices</p>
        </div>
        <div className="text-center p-3 border rounded-lg bg-card">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-medium">G</span>
          </div>
          <p className="text-xs">Google Wear OS</p>
        </div>
        <div className="text-center p-3 border rounded-lg bg-card">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-medium">S</span>
          </div>
          <p className="text-xs">Samsung Devices</p>
        </div>
      </div>
      <Button className="w-full mt-4" variant="outline" size="sm">
        View All Supported Devices
      </Button>
    </div>
  );
};

export default SupportedDevicesCard;
