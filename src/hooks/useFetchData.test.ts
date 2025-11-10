// src/hooks/useFetchData.test.ts
import { renderHook, waitFor } from '@testing-library/react'; // Инструменты RTL
import { useFetchData } from './useFetchData';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

// ⬇️ 1. МОКИРОВАНИЕ СЕТЕВОГО ЗАПРОСА
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => 
      Promise.resolve({ // Имитируем, что сервер вернул успешный промис
        data: { id: 1, title: 'Mocked Data Title' }, // Это наш ФИКЦИВНЫЙ ответ
      })
    ),
  },
}));
// ☝️ Мы заменяем реальный axios.get на нашу функцию vi.fn(), которая 
// СРАЗУ возвращает подготовленные данные. Реальный запрос не уходит в интернет!

describe('useFetchData', () => {
  it('должен загружать данные и обрабатывать состояние загрузки', async () => {
    
    // ⬇️ 2. ПОДГОТОВКА: Запускаем хук в тестовой оболочке
    const { result } = renderHook(() => useFetchData('/api/data'));

    // ⬇️ 3. ПРОВЕРКА ЗАГРУЗКИ (Синхронная)
    // Сразу после запуска useEffect,isLoading должен быть true
    expect(result.current.isLoading).toBe(true); 
    
    // ⬇️ 4. ОЖИДАНИЕ (Асинхронная проверка)
    // waitFor заставляет тест ждать, пока запрос (наш мок) не "завершится"
    await waitFor(() => { 
      expect(result.current.isLoading).toBe(false); // Проверяем, что загрузка выключилась
    });

    // ⬇️ 5. ПРОВЕРКА ДАННЫХ
    // Проверяем, что полученные данные ТОЧНО совпадают с нашим фиктивным ответом
    expect(result.current.data).toEqual({ 
      id: 1, 
      title: 'Mocked Data Title' 
    });
    
    // ⬇️ 6. ПРОВЕРКА ВЫЗОВА
    // Это важно: мы проверяем, что наш хук ВООБЩЕ пытался вызвать axios с правильным URL
    expect(vi.mocked(axios).get).toHaveBeenCalledWith('/api/data'); 
  });
});