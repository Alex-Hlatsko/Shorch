import React, { useState } from "react";
import { loginUser } from '../services/userService';
import { useUser } from '../UserContext';
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useUser(); // Получаем userData и setUserData из контекста
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(email, password, setUserData); // Передаем setUserData как аргумент
    if (response) {
      setMessage(response); // Устанавливаем сообщение об ошибке
    } else {
      setMessage(""); // Очищаем сообщение об ошибке
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
      <p>{message}</p>
      {/* Вывод данных пользователя из контекста */}
      {userData && (
        <div>
          <h2>Данные пользователя:</h2>
          <p>Имя: {userData.name}</p>
          <p>Почта: {userData.email}</p>
          <p>Продукты: {userData.products.join(", ")}</p>
        </div>
      )}
      <Link to="/">Back</Link>
    </div>

  );
}

export default Login;
