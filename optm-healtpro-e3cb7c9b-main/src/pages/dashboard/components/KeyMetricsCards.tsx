
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Bell, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CardGrid } from '@/components/ui/card-grid';

const KeyMetricsCards: React.FC = () => {
  // Animation configuration
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const metrics = [
    {
      icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
      value: "75",
      label: "Total Appointments",
      trend: "↑ 17% increase",
      trendColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />,
      value: "357",
      label: "Patients Treated",
      trend: "↑ 22% increase",
      trendColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />,
      value: "65",
      label: "Cancelled Sessions",
      trend: "↑ 5% increase",
      trendColor: "text-red-600",
      bgColor: "bg-amber-100"
    },
    {
      icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
      value: "$128K",
      label: "Total Revenue",
      trend: "↑ 12% increase",
      trendColor: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <CardGrid columns={4} gap="md" className="mb-6">
      {metrics.map((metric, index) => (
        <motion.div 
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="border border-border/30 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 flex items-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${metric.bgColor} flex items-center justify-center mr-3 sm:mr-4 shrink-0`}>
                {metric.icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{metric.value}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{metric.label}</p>
                <p className={`text-xs ${metric.trendColor} flex items-center`}>
                  <span className="mr-1">{metric.trend.split(' ')[0]}</span> {metric.trend.split(' ').slice(1).join(' ')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </CardGrid>
  );
};

export default KeyMetricsCards;
