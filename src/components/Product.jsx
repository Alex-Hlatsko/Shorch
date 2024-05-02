import React from 'react';

const Product = ({ title, desc, price }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>Description: {desc}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Product;
