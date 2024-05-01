import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userService';
import { useUser } from '../UserContext'; // Импортируем хук useUser

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUserData } = useUser(); // Получаем функцию setUserData из контекста

  const handleRegister = async (e) => {
    e.preventDefault();

    // Проверка, что пароли совпадают
    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    // Регистрация пользователя с передачей setUserData в createUser
    const response = await createUser(name, email, password, setUserData);
    if (response === "success") {
      setMessage("Регистрация успешна");
    } else {
      setMessage(response);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
