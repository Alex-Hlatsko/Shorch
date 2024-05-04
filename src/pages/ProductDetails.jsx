import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { updateUserProduct } from '../services/userService';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';

const ProductDetails = () => {
  const location = useLocation();
  const history = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { userData, setUserData } = useUser();

  // Получаем данные из параметров пути
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const desc = searchParams.get('desc');
  const price = searchParams.get('price');

  const handleCancel = () => {
    // Редирект на страницу Scan при нажатии на кнопку Cancel
    history('/scan');
  };

  const handleAddToCart = async () => {
    try {
      if (!userData) return;

      // Добавляем ID товара в базу данных пользователя и контекст
      const updatedProducts = [...userData.products, id];
      await updateUserProduct(userData.email, updatedProducts);
      setUserData({ ...userData, products: updatedProducts });

      // Редирект на страницу Cart после успешного добавления в корзину
      history('/cart');
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <TopBar />
      <Navigation />
      <div className="content">
        <div className="card">
          <div className="card-body">
            <h2>Product Details:</h2>
            <p>ID: {id}</p>
            <p className='card-title'>Title: {title}</p>
            <p>Description: <span className='card-subtitle'>{desc}</span></p>
            <p className='card-text'>Price: ${price}</p>
            <button onClick={handleCancel} className='btn btn-secondary me-4'>Cancel</button>
            <button onClick={handleAddToCart} className='btn btn-success'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
