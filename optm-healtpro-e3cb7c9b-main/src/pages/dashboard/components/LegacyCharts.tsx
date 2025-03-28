import React from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
interface LegacyChartsProps {
  handleSaveReport: () => void;
}
const LegacyCharts: React.FC<LegacyChartsProps> = ({
  handleSaveReport
}) => {
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card className="lg:col-span-2 border border-border/30">
        
      </Card>
      
      
    </div>;
};
export default LegacyCharts;