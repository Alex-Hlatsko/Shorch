import React from 'react'
import { NavLink } from "react-router-dom"
import { useUser } from '../UserContext'; // Импортируем хук useUser

const Home = () => {
  const { userData } = useUser(); // Получаем данные пользователя из контекста

  return (
    <>
        <div>Home</div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        {/* Вывод данных пользователя из контекста */}
        {userData && (
          <div>
            <h2>Данные пользователя:</h2>
            <p>Имя: {userData.name}</p>
            <p>Почта: {userData.email}</p>
            <p>Продукты: {userData.products.join(", ")}</p>
          </div>
        )}
    </>
  )
}

export default Home
