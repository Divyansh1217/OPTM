
import { useState, useEffect, RefObject } from 'react';

interface CanvasSizeState {
  width: number;
  height: number;
}

export const useCanvasSize = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [canvasSize, setCanvasSize] = useState<CanvasSizeState>({ 
    width: 640, 
    height: 480 
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Get the computed style to account for any CSS that affects the canvas size
      const computedStyle = window.getComputedStyle(canvas);
      const displayWidth = parseInt(computedStyle.width, 10);
      const displayHeight = parseInt(computedStyle.height, 10);

      // Check if the canvas is not the right size
      const needsResize = 
        canvas.width !== displayWidth || 
        canvas.height !== displayHeight;

      if (needsResize) {
        // Set the canvas size to match its parent
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        setCanvasSize({ width: displayWidth, height: displayHeight });
      }
    };

    // Initial update
    updateCanvasSize();

    // Add resize event listener
    window.addEventListener('resize', updateCanvasSize);

    // Create a ResizeObserver to watch for parent element size changes
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateCanvasSize);
      if (canvasRef.current.parentElement) {
        resizeObserver.observe(canvasRef.current.parentElement);
      }

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        resizeObserver.disconnect();
      };
    }

    // Fallback cleanup if ResizeObserver is not available
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [canvasRef]);

  return { canvasSize };
};
