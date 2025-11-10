// src/hooks/useCounter.ts
import { useState, useCallback } from 'react';

// Это наш Custom Hook, который мы хотим проверить
export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);
  
  // Функция для увеличения
  const increment = useCallback(() => setCount(prev => prev + 1), []);
  
  // Функция для уменьшения
  const decrement = useCallback(() => setCount(prev => prev - 1), []);

  return { count, increment, decrement };
};