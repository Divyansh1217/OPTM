
/**
 * Utility functions for appointment colors
 */

// Color mapping for appointment types
const appointmentColorMap: Record<string, string> = {
  'New Appointment': '#4285F4', // Blue
  'Check Up': '#0F9D58', // Green
  'Follow-up': '#DB4437', // Red
  'Physical Therapy': '#F4B400', // Yellow
  'Consultation': '#4285F4', // Blue
  'Treatment': '#0F9D58', // Green
  'Initial Consultation': '#AB47BC', // Purple
  'Review': '#F57C00', // Orange
  'Surgery': '#D81B60', // Pink
  'Telehealth': '#039BE5', // Light blue
  'Emergency': '#D50000', // Bright red
  'Vaccination': '#33B679', // Teal
};

// Default color for appointment types not in the map
const DEFAULT_COLOR = '#4285F4'; // Blue

/**
 * Get color for an appointment type
 */
export const getAppointmentColor = (appointmentType: string): string => {
  return appointmentColorMap[appointmentType] || DEFAULT_COLOR;
};

/**
 * Get all available appointment colors
 */
export const getAllAppointmentColors = (): Record<string, string> => {
  return { ...appointmentColorMap };
};

/**
 * Get all appointment types with their colors
 */
export const getAppointmentTypesWithColors = (): Array<{ type: string; color: string }> => {
  return Object.entries(appointmentColorMap).map(([type, color]) => ({
    type,
    color
  }));
};
