// src/components/LoginForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { describe, it, expect, vi } from 'vitest';

describe('LoginForm', () => {
  it('должен корректно обрабатывать ввод данных и вызывать onSubmit с правильными данными', async () => {
    // 1. ПОДГОТОВКА (Arrange): Создаем mock-функцию для имитации отправки на сервер
    const mockSubmit = vi.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    // 2. ПОИСК И ДЕЙСТВИЕ (Act): Имитируем ввод текста
    const user = userEvent.setup(); // Инициализация имитатора пользователя
    
    // Ищем поле ввода по его Роли ('textbox') и его доступному имени ('Email')
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Пароль/i);
    const submitButton = screen.getByRole('button', { name: /Войти/i });
    
    // Имитируем ввод текста (userEvent.type)
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'securepassword');
    
    // 3. ДЕЙСТВИЕ: Кликаем по кнопке Войти
    await user.click(submitButton);

    // 4. ПРОВЕРКА (Assert): Проверяем, что функция onSubmit была вызвана 1 раз
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    
    // ПРОВЕРКА: Проверяем, что функция onSubmit была вызвана с корректными данными
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'securepassword',
    });
  });
});