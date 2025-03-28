
// Export core
export * from './core';
export { human } from './core';

// Export types
export * from './types';

// Export config
export { default as humanConfig } from './config';

// Export angle utilities
export * from './angles';

// Helper functions
export const warmupModel = async () => {
  const { human } = await import('./core');
  await human.load();
  return human;
};

export const resetModel = () => {
  const { human } = require('./core');
  human.reset();
};

export const extractBodyAngles = (result: any) => {
  const { calculateBodyAngles } = require('./angles');
  return calculateBodyAngles(result);
};

export const extractBiomarkers = (result: any, angles: any) => {
  // Placeholder for extracting biomarkers from pose data
  return {
    movementQuality: Math.random() * 100, // Placeholder value
    symmetry: Math.random() * 100,
    range: angles.kneeAngle ? Math.min(180 - angles.kneeAngle, 100) : 0
  };
};
