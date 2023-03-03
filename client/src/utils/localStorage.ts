export const setItem = (key: string, value: any) =>
  localStorage.setItem(key, value);

export const getItem = (key: string) => localStorage.getItem(key);

export const removeItem = (key: string) => localStorage.removeItem(key);
