// src/components/CounterButton.tsx
import React from 'react';
// Импортируем нашу готовую логику (хук)
import { useCounter } from '../hooks/useCounter'; 

export function CounterButton() {
  const { count, increment } = useCounter(0); 

  return (
    // Этот UI вызывает логику
    <button onClick={increment}>
      Счетчик: {count}
    </button>
  );
}