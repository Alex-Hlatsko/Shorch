import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { Link, Navigate } from "react-router-dom";
import { getProductsByIds } from '../services/userService';
import Product from '../components/Product'; // Импортируем компонент Product

const Cart = () => {
  const { userData } = useUser();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) return;
      setLoading(true);

      try {
        const products = await getProductsByIds(userData.products);
        setProductData(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  if (!userData) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <div>Cart</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {productData.length > 0 ? (
            <ul>
              {productData.map((product, index) => (
                <li key={index}>
                  {/* Передаем айдишник продукта в компонент Product */}
                  <Product
                    id={product.id}
                    title={product.title}
                    desc={product.desc}
                    price={product.price}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
      <Link to="/profile">Back</Link>
    </>
  );
};

export default Cart;
