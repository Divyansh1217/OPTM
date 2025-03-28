
// Helper function to normalize status values to allowed types
export const normalizeStatus = (status: string): "normal" | "elevated" | "low" | "critical" => {
  status = status.toLowerCase();
  
  if (status === "normal" || status === "within range" || status === "optimal") {
    return "normal";
  } else if (status === "elevated" || status === "high" || status === "increased" || status === "above range") {
    return "elevated";
  } else if (status === "low" || status === "decreased" || status === "below range") {
    return "low";
  } else if (status === "critical" || status === "very high" || status === "very low" || status === "dangerous") {
    return "critical";
  }
  
  // Default to normal if unrecognized
  return "normal";
};
