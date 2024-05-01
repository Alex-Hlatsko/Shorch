import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const handleRegister = async () => {
    // Реализуйте логику регистрации пользователя
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
