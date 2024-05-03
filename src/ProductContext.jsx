import React, { createContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const addToList = (item) => {
    setList([...list, item]);
  };

  return (
    <ProductContext.Provider value={{ list, addToList }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;