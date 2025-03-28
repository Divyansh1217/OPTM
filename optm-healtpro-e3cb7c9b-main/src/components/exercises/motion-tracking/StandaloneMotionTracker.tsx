import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { human } from '@/lib/human';

const StandaloneMotionTracker: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [motionCount, setMotionCount] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    const loadModel = async (retry = 3) => {
      try {
        console.log('Loading Human.js model...');
        await human.load();
        setModelLoaded(true);
        toast.success("AI model loaded successfully");
      } catch (err) {
        console.error('Error loading Human.js model:', err);
        if (retry > 0) {
          setTimeout(() => loadModel(retry - 1), 2000);
        } else {
          setError('Failed to load motion detection model after multiple attempts.');
          toast.error('Model load failed. Try refreshing.');
        }
      }
    };
    loadModel();
    return () => requestRef.current && cancelAnimationFrame(requestRef.current);
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStarted(true);
        toast.success("Camera started successfully");
      }
    } catch (err) {
      setError('Failed to access camera');
      toast.error('Camera access denied');
    }
  };

  const detectFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isDetecting || !modelLoaded) return;
    try {
      const result = await human.detect(videoRef.current);
      setMotionCount(result.persons.length);
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        await human.draw.all(canvasRef.current, result);
      }
      requestRef.current = requestAnimationFrame(detectFrame);
    } catch (err) {
      setError('Detection error');
      setIsDetecting(false);
    }
  }, [isDetecting, modelLoaded]);

  const startDetection = () => {
    if (!cameraStarted || !modelLoaded) return;
    setIsDetecting(true);
    requestRef.current = requestAnimationFrame(detectFrame);
    toast.success("Motion tracking started");
  };

  const stopDetection = () => {
    cancelAnimationFrame(requestRef.current);
    setIsDetecting(false);
    setMotionCount(0);
    toast.info("Motion tracking stopped");
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gray-900 w-full h-96 md:h-[500px]">
            {!cameraStarted ? (
              <div className="flex flex-col items-center justify-center h-full text-white">
                <p className="mb-4 text-center max-w-md px-4">Ensure full-body visibility for tracking.</p>
                <Button onClick={startCamera} disabled={!modelLoaded} className="bg-blue-600">Start Camera</Button>
              </div>
            ) : (
              <>
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-contain z-10" playsInline muted/>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20"/>
              </>
            )}
          </div>
          {cameraStarted && (
            <div className="p-4 flex space-x-4 justify-center">
              <Button onClick={startDetection} disabled={isDetecting || !modelLoaded}>Start Tracking</Button>
              <Button onClick={stopDetection} disabled={!isDetecting} variant="outline">Stop Tracking</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Real-Time Motion Data</h3>
        <p className="text-sm">Motions detected per frame: <span className="font-bold">{motionCount}</span></p>
      </div>
    </div>
  );
};

export default StandaloneMotionTracker;
