// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Импортируем 'test' для настройки Vitest
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // Включаем глобальные API (describe, it, expect)
    globals: true, 
    // Устанавливаем окружение для имитации браузера
    environment: 'jsdom', 
    // Указываем файл настройки RTL
    setupFiles: ['./src/setupTests.ts'], 
    // Исключаем файлы build
    exclude: [...configDefaults.exclude, '**/build/**'],
  },
});