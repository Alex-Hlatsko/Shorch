import React from 'react'
import { useUser } from '../UserContext';
import { Link, Navigate  } from "react-router-dom"


const Scan = () => {
  const { userData } = useUser(); // get data from context
  
  // if no data, redirect to login page
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <div>Scan</div>
    <Link to="/profile">Back</Link>
    </>
  )
}

export default Scan