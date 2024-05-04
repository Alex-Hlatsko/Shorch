import React from 'react';
import { useUser } from '../UserContext';
import { Link, Navigate, useLocation } from 'react-router-dom';
import ProductAdd from '../components/ProductAdd';


const ProductInfo = () => {
  const location = useLocation();
  const { userData } = useUser(); // Получение данных пользователя из контекста
  
  // Если данных пользователя нет, перенаправляем на страницу входа
  if (!userData) {
    return <Navigate to="/login" />;
  }
  
  const pr = location.state;

  return (
    <ProductAdd pr={pr} />
  )

}
export default ProductInfo