import React, { useContext } from 'react'
import { useUser } from '../UserContext';
import { Link, Navigate } from "react-router-dom"
import ProductContext from '../ProductContext';
import ProductComponent from '../components/ProductCompontent'

const Cart = () => {
  const { userData } = useUser(); // get data from context
  const {list} = useContext(ProductContext);
  // if no data, redirect to login page
  if (!userData) {
    return <Navigate to="/login" />;
  }
  

  return (
    <>
    {list && 
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}><ProductComponent pr={item}/></li>
        ))}
      </ul>  
    </div>
      }
    <Link to="/profile">Back</Link>
    </>
  )
}

export default Cart