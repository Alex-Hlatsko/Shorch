import React from 'react';
import { useUser } from '../UserContext';
import { removeProduct } from '../services/userService'; // Импортируем функцию удаления товара

const Product = ({ id, title, desc, price }) => {
  const { userData, setUserData } = useUser(); // Получаем userData и setUserData из контекста

  const handleRemoveProduct = async (productId) => {
    try {
      // Проверяем наличие пользователя в контексте
      if (!userData) return;

      // Удаляем товар из списка продуктов пользователя
      const updatedProducts = userData.products.filter((productId) => productId !== id);

      // Обновляем данные пользователя в контексте
      setUserData({ ...userData, products: updatedProducts });

      // Вызываем функцию удаления товара из базы данных
      await removeProduct(userData.email, productId);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>Description: {desc}</p>
      <p>Price: ${price}</p>
      {/* Кнопка удаления товара */}
      <button onClick={() => handleRemoveProduct(id)}>Remove</button>
    </div>
  );
};

export default Product;
