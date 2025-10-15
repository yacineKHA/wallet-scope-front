// Fonction pour obtenir les initiales
export const getInitials = (name?: string | null): string => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};
