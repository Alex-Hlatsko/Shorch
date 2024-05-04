import React, { useState } from "react";
import { loginUser } from '../services/userService';
import { useUser } from '../UserContext';
import { Link, Navigate } from "react-router-dom"

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
    <div className="container">
      {redirect && <Navigate to="/profile" />}
      <div className="form_section">
        <form onSubmit={handleLogin}>
        <h1 className="text-center">Login</h1>
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
          <button type="submit" className="btn btn-primary">Login</button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>


      </div>
    </div>

  );
}

export default Login;
