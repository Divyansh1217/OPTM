
import * as Human from '@vladmandic/human';

// Create a complete config
export const humanConfig: Partial<Human.Config> = {
  // Backend settings
  backend: 'webgl',
  
  // Model paths
  modelBasePath: '/',
  
  // Required properties
  wasmPath: '/',
  async: true,  // Use 'async' instead of 'asynch'
  cacheModels: true,
  
  // Optimizations
  warmup: 'none',
  
  // Media settings
  filter: { enabled: false },
  
  // Detection settings
  face: { enabled: false },
  hand: { enabled: false },
  body: {
    enabled: true,
    modelPath: 'blazepose-lite.json',
    minConfidence: 0.3,
    maxDetected: 1
  },
  
  // Advanced settings
  segmentation: { enabled: false },
  gesture: { enabled: false },
  
  // Debugging settings
  debug: false
};

// Default human export with configuration
export default humanConfig;
