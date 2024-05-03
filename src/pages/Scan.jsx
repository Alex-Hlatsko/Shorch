import React, { useState } from 'react'
import { useUser } from '../UserContext';
import { Link, Navigate  } from "react-router-dom"
import QrReader from '../components/QrReader';


const Scan = () => {
  const { userData } = useUser(); // get data from context
  
  // if no data, redirect to login page
  if (!userData) {
    return <Navigate to="/login" />;
  }

  const [qrState, setQrState] = useState(true);

  return (
    <>
    <div>
      <div><Link to="/profile" onClick={() => setQrState(false)}>Back</Link></div>
      {qrState && <QrReader />}
    </div>
    </>
  )
}

export default Scan