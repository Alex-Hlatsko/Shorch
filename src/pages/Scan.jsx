import React from 'react';
import { useUser } from '../UserContext';
import { Link, Navigate } from 'react-router-dom';

const Scan = () => {
  const { userData } = useUser(); // Получение данных пользователя из контекста
  
  // Если данных пользователя нет, перенаправляем на страницу входа
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrReader />
      <Link to="/profile">Back</Link>
    </div>
  );
};

export default Scan;
