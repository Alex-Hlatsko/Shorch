import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createUser } from '../services/userService';
import { useUser } from '../UserContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUserData } = useUser();
  const [redirect, setRedirect] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();

    // check passwords
    if (password !== confirmPassword) {
      setMessage("Password mismatch");
      return;
    }

    // Registering a user by passing setUserData to createUser
    const response = await createUser(name, email, password, setUserData);
    if (response === "success") {
      setMessage("Registration successful");
      setRedirect(true); // Set the value to true for the redirect
    } else {
      setMessage(response);
    }
  };

  return (
    <div className='container'>
      {redirect && <Navigate to="/profile" />} {/* Redirect if redirect === true */}
      <div className="form_section">
        <form onSubmit={handleRegister}>
          <h1 className='text-center'>Registration</h1>
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
          <button type="submit" className='btn btn-primary'>Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
