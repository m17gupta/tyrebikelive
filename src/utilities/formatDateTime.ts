
export const formatDateTime = (timestamp: string) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};
