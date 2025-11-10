// src/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';
import { describe, it, expect } from 'vitest'; // Явно импортируем, чтобы избежать путаницы

describe('useCounter', () => {
  
  // Тест 1: Проверяем инициализацию
  it('должен инициализироваться с начальным значением', () => {
    // 1. Инициализируем хук со значением 5
    const { result } = renderHook(() => useCounter(5));
    
    // 2. Проверяем, что текущее значение (result.current.count) равно 5
    expect(result.current.count).toBe(5);
  });
  
  // Тест 2: Проверяем функцию увеличения
  it('должен увеличивать счетчик при вызове increment', () => {
    const { result } = renderHook(() => useCounter(0));
    
    // act() необходим для имитации действия, которое меняет состояние
    act(() => {
      result.current.increment(); // Вызываем функцию увеличения
    });
    
    // Проверяем, что счетчик стал равен 1
    expect(result.current.count).toBe(1);
  });
  
  // Тест 3: Проверяем функцию уменьшения
  it('должен уменьшать счетчик при вызове decrement', () => {
    const { result } = renderHook(() => useCounter(10));
    
    // Вызываем функцию уменьшения
    act(() => {
      result.current.decrement(); 
    });
    
    // Проверяем, что счетчик стал равен 9
    expect(result.current.count).toBe(9);
  });
});