// src/hooks/useFetchData.ts
import { useState, useEffect } from 'react'; // Основы React
import axios from 'axios'; // Библиотека для HTTP-запросов

interface Data {
  id: number;
  title: string;
}
// ☝️ Определение типа данных, которые мы ожидаем получить от сервера.

export const useFetchData = (url: string) => {
// ⬇️ 1. Состояния для хранения данных
  const [data, setData] = useState<Data | null>(null); 
// ⬇️ 2. Состояние для индикатора загрузки (показываем спиннер)
  const [isLoading, setIsLoading] = useState(false); 
// ⬇️ 3. Состояние для сообщения об ошибке
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      // ⬇️ При начале запроса:
      setIsLoading(true); // Включаем индикатор загрузки
      setError(null);     // Сбрасываем старую ошибку
      
      try {
        // ⬇️ Асинхронный запрос к указанному URL
        const response = await axios.get(url); 
        setData(response.data); // Сохраняем полученные данные
      } catch (err) {
        setError('Ошибка при загрузке данных'); // Если что-то пошло не так
      } finally {
        // ⬇️ Этот блок выполняется всегда, независимо от успеха или ошибки
        setIsLoading(false); // Выключаем индикатор загрузки
      }
    };
    fetchData(); // Запускаем функцию при монтировании компонента
    
    // ⬇️ Зависимости: Перезапускаем запрос, если изменится URL
  }, [url]);

  return { data, isLoading, error };
}; // ⬅️ Хук возвращает текущее состояние для использования в UI