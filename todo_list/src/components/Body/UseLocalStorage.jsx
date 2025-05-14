import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    // On mount, read from localStorage (or fall back to initialValue)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null
        ? JSON.parse(item)
        : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // Whenever storedValue changes, write it back
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}


export default useLocalStorage;