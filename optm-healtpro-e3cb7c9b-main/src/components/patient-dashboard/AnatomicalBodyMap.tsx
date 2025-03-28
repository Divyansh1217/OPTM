
import React, { memo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HotspotMarker } from './anatomical-map';
import useAnatomicalMap from './anatomical-map/hooks/useAnatomicalMap';

// Optimize with memo to prevent unnecessary re-renders
const AnatomicalBodyMap: React.FC = memo(() => {
  const { 
    zoom, 
    isLoaded,
    selectedIssue, 
    healthIssues, 
    muscleFlexionData,
    handleZoomIn, 
    handleZoomOut, 
    handleIssueClick 
  } = useAnatomicalMap();
  
  // Add a reset zoom function
  const handleResetZoom = () => {
    // The reset value should match the initial zoom value in useAnatomicalMap
    window.location.reload();
  };
  
  // Add animation when component mounts
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card className={`h-full overflow-hidden transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <CardHeader className="pb-3 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Anatomical View</CardTitle>
        <div className="flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleZoomOut}
            aria-label="Zoom out"
            disabled={zoom <= 0.7}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleResetZoom}
            aria-label="Reset view"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleZoomIn}
            aria-label="Zoom in"
            disabled={zoom >= 1.5}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 px-4 overflow-hidden">
        <div className="anatomy-position-container relative">
          <div 
            className="anatomy-map-wrapper mx-auto overflow-hidden rounded-lg"
            style={{ 
              transform: `scale(${zoom})`,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img 
              src="/lovable-uploads/cc5c1cf4-bddf-4fc8-bc1a-6a1387ebbdf8.png" 
              alt="Human muscular anatomy" 
              className="anatomy-map-image max-h-[450px] w-auto object-contain"
            />
            
            {isLoaded && healthIssues.map((issue) => (
              <HotspotMarker 
                key={issue.id}
                issue={issue}
                isSelected={selectedIssue?.id === issue.id}
                onClick={handleIssueClick}
              />
            ))}
          </div>
        </div>
        
        {/* Muscle group status indicators with improved visual design */}
        {muscleFlexionData && muscleFlexionData.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {muscleFlexionData.map((item) => (
              <div key={item.muscle} className="flex flex-col bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md border border-gray-100 dark:border-gray-700 min-w-[120px]">
                <div className="text-xs font-medium mb-1">{item.muscle}</div>
                <div className="flex items-center gap-1.5">
                  <div 
                    className={`h-1.5 w-20 rounded-full ${
                      item.status === 'healthy' ? 'bg-green-500' : 
                      item.status === 'weak' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                  ></div>
                  <span 
                    className={`text-xs ${
                      item.status === 'healthy' ? 'text-green-600' : 
                      item.status === 'weak' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}
                  >
                    {item.status === 'healthy' ? 'Healthy' : 
                     item.status === 'weak' ? 'Weak' : 
                     'Overworked'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Selected issue details with improved styling */}
        {selectedIssue && (
          <div className="mt-4 p-4 bg-muted/80 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-base">{selectedIssue.name}</h3>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                selectedIssue.severity === 'high' ? 'bg-red-100 text-red-800' : 
                selectedIssue.severity === 'medium' ? 'bg-orange-100 text-orange-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {selectedIssue.severity === 'high' ? 'Severe' : 
                selectedIssue.severity === 'medium' ? 'Moderate' : 'Mild'}
              </span>
            </div>
            
            {selectedIssue.muscleGroup && (
              <div className="text-xs text-muted-foreground mt-2 font-medium">
                Muscle Group: {selectedIssue.muscleGroup}
              </div>
            )}
            
            <p className="text-sm text-muted-foreground mt-2">{selectedIssue.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {selectedIssue.symptoms && (
                <div className="mt-1">
                  <span className="text-xs font-medium uppercase text-muted-foreground">Common Symptoms:</span>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    {selectedIssue.symptoms.map((symptom, i) => (
                      <li key={i} className="text-xs">{symptom}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedIssue.recommendedActions && (
                <div className="mt-1">
                  <span className="text-xs font-medium uppercase text-muted-foreground">Recommended Actions:</span>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    {selectedIssue.recommendedActions.map((action, i) => (
                      <li key={i} className="text-xs">{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

AnatomicalBodyMap.displayName = 'AnatomicalBodyMap';

export default AnatomicalBodyMap;
