import React, { useState } from "react";
import { loginUser } from '../services/userService';
import { useUser } from '../UserContext';
import { Link, Navigate  } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useUser();
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(email, password, setUserData);
    if (response) {
      setMessage(response);
    } else {
      setMessage("");
      setRedirect(true);
    }
  };

  return (
    <div>
      {redirect && <Navigate  to="/profile" />}
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
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
     
      {userData && (
        <div>
          <h2>User data:</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Products: {userData.products.join(", ")}</p>
        </div>
      )}
      <Link to="/register">Registration</Link>
      <Link to="/">Back</Link>
    </div>

  );
}

export default Login;
