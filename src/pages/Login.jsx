import React, { useState } from "react";
import { loginUser } from '../services/userService';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(email, password);
    if (typeof response === "object") {
      setUserData(response);
      setMessage("");
    } else {
      setMessage(response);
      setUserData(null);
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
      {userData && (
        <div>
          <h2>Данные пользователя:</h2>
          <p>Имя: {userData.name}</p>
          <p>Почта: {userData.email}</p>
          <p>Продукты: {userData.products.join(", ")}</p>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default Login;
