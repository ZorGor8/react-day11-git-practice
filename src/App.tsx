import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// ----------------------------------------------------
// 1. Объявление ленивого компонента
// Код UsersPage будет загружен асинхронно
const UsersPageLazy = lazy(() => import('./pages/UsersPage'));
// ----------------------------------------------------

// Вспомогательный компонент для Главной страницы
function HomePage() {
  return <h2>Главная Страница</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Ссылки для перехода */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Главная (загружена сразу)</Link>
        <Link to="/users">Пользователи (ленивая загрузка)</Link>
      </nav>

      {/* ---------------------------------------------------- */}
      {/* 2. Обертка Suspense для управления ожиданием */}
      <Suspense fallback={<h1>⏳ Загрузка кода...</h1>}>
        <Routes>
          {/* Маршрут, который загружается сразу */}
          <Route path="/" element={<HomePage />} />
          
          {/* Маршрут, использующий ленивый компонент */}
          <Route path="/users" element={<UsersPageLazy />} />
        </Routes>
      </Suspense>
      {/* ---------------------------------------------------- */}
    </BrowserRouter>
  );
}