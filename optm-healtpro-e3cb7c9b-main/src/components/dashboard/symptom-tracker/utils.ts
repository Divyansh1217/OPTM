
export const getPainLevelColor = (level: number) => {
  if (level <= 3) return 'bg-medical-green text-white';
  if (level <= 6) return 'bg-medical-yellow text-white';
  return 'bg-medical-red text-white';
};
