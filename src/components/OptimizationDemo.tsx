// src/components/OptimizationDemo.tsx
import React, { useState, useMemo, useCallback } from 'react';
import HeavyDisplay from './HeavyDisplay';

export function OptimizationDemo() {
  const [count, setCount] = useState(0); // Обычное состояние (меняется часто)
  const [items, setItems] = useState(['A', 'B', 'C']); // Состояние, которое меняется редко

  // 1. ИСПОЛЬЗУЕМ useMemo (Мемоизация ЗНАЧЕНИЯ)
  // Мы хотим, чтобы это сложное вычисление запускалось ТОЛЬКО, когда меняется 'items'.
  // Оно НЕ должно запускаться при изменении 'count'.
  const expensiveCalculation = useMemo(() => {
    console.log('--- useMemo: Пересчитываю items ---');
    // Имитация сложной фильтрации или сортировки
    return items.join(', ');
  }, [items]); // ⬅️ Зависимость: Пересчитываем только при изменении 'items'

  // 2. ИСПОЛЬЗУЕМ useCallback (Мемоизация ФУНКЦИИ)
  // Мы хотим, чтобы эта функция была "старой" для дочернего компонента, 
  // пока не изменится 'count'.
  const handleAction = useCallback(() => {
    console.log(`--- useCallback: Действие выполнено! Текущий счетчик: ${count} ---`);
    // Логика, которая использует 'count'
  }, [count]); // ⬅️ Зависимость: Создаем новую функцию только при изменении 'count'

  const handleAddItem = () => {
    setItems(prev => [...prev, `D${prev.length - 2}`]);
  };
  
  return (
    <div style={{ padding: '20px', border: '2px solid green' }}>
      <h2>Демонстрация Оптимизации</h2>
      
      {/* 1. Элементы, которые часто вызывают ре-рендер */}
      <button onClick={() => setCount(count + 1)}>
        Кликни (Вызывает ре-рендер): {count}
      </button>
      
      {/* 2. Элементы, которые редко меняют зависимости useMemo */}
      <button onClick={handleAddItem}>
        Добавить Item (Сменит useMemo)
      </button>

      {/* Передаем оба мемоизированных значения/функции */}
      <HeavyDisplay 
        expensiveValue={expensiveCalculation} // useMemo
        onAction={handleAction}             // useCallback
      />
    </div>
  );
}