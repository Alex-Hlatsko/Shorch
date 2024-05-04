import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {QrReader} from 'react-qr-reader';

const Scan = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      try {
        // Выполняем GET-запрос к URL продукта
        const response = await axios.get(data);
        console.log('Product data:', response.data);
        const { fields } = response.data;
        
        // Создаем строку параметров запроса на основе данных из fields
        const queryParams = Object.entries(fields)
          .map(([key, value]) => `${key}=${encodeURIComponent(value.stringValue || value.integerValue)}`)
          .join('&');
        
        // Редирект на страницу ProductDetails с параметрами запроса
        navigate(`/product-details?${queryParams}`);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

 

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleScan}
        constraints={{ facingMode: 'environment' }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Scan;
