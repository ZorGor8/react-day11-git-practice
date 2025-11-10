// src/components/CounterButton.test.tsx
// Импортируем инструменты: render (для показа UI), screen (для поиска элементов)
import { render, screen } from '@testing-library/react'; 
// Импортируем userEvent (для имитации кликов)
import userEvent from '@testing-library/user-event'; 
import { CounterButton } from './CounterButton';
import { describe, it, expect } from 'vitest';

describe('CounterButton', () => {
  it('должен увеличивать счетчик при клике', async () => {
    
    // 1. ПОКАЗАТЬ UI: Рендерим компонент
    render(<CounterButton />);
    
    // 2. НАЙТИ ЭЛЕМЕНТ (СЧЁТЧИК: 0): Найти кнопку по тексту, который видит пользователь
    const button = screen.getByRole('button', { name: /Счетчик: 0/i });
    
    // 3. ДЕЙСТВИЕ: Имитируем клик пользователя
    await userEvent.click(button); 
    
    // 4. ПРОВЕРКА: Проверяем, что текст изменился (СЧЁТЧИК: 1)
    expect(screen.getByRole('button', { name: /Счетчик: 1/i })).toBeInTheDocument();
  });
});