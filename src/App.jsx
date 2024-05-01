import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Scan from './pages/Scan';
import Cart from './pages/Cart';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
