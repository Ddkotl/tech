export const getFromLocalStorage = (key: string): string[] => {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
