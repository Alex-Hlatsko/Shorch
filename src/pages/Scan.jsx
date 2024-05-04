import React from 'react';
import { useState } from 'react';
import { useUser } from '../UserContext';
import { Link, Navigate } from 'react-router-dom';
import QrReader from '../components/QrReader'


const Scan = () => {
  const { userData } = useUser(); // Получение данных пользователя из контекста
  const [qrState, setQrState] = useState(true);

  
  // Если данных пользователя нет, перенаправляем на страницу входа
  if (!userData) {
    return <Navigate to="/login" />;
  }

  

  return (
    <>
    <div>
      <div><Link to="/profile" onClick={() => setQrState(false)}>Back</Link></div>
      {qrState && <QrReader />}
    </div>
    </>
  );
};

export default Scan;
