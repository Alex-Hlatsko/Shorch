import React from 'react';
import { useNavigate } from 'react-router-dom';
import {QrReader} from 'react-qr-reader';

const Scan = () => {
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      // Парсим JSON из полученных данных
      const productData = JSON.parse(data);

      // Формируем путь с параметрами для редиректа
      const path = `/product-details?id=${productData.fields.id.stringValue}&title=${productData.fields.title.stringValue}&desc=${productData.fields.desc.stringValue}&price=${productData.fields.price.integerValue}`;

      // Редирект на страницу ProductDetails с параметрами пути
      navigate(path);
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
        onScan={handleScan}
        facingMode="environment" // Используем заднюю камеру
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Scan;
