export const saveToLocalStorage = (bookmarks: string[], key: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(bookmarks));
  }
};
