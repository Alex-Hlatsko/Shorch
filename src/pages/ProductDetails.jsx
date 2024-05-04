import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { updateUserProduct } from '../services/userService'; // Импортируем функцию добавления продукта пользователю

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
      <h2>Product Details</h2>
      <p>ID: {id}</p>
      <p>Title: {title}</p>
      <p>Description: {desc}</p>
      <p>Price: ${price}</p>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
