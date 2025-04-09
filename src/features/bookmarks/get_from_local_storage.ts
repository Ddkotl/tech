export const getFromLocalStorage = (key: string): string[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};
