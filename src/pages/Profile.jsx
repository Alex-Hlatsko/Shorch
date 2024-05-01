import React from 'react'
import { NavLink, Navigate  } from "react-router-dom"
import { useUser } from '../UserContext';

const Profile = () => {
    const { userData } = useUser(); // get data from context
    // if no data, redirect to login page
    if (!userData) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <div>Home</div>
            <NavLink to="/scan">Scan</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            {/* show users data */}
            {userData && (
                <div>
                    <h2>User:</h2>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Product: {userData.products.join(", ")}</p>
                </div>
            )}
        </>
    )
}

export default Profile
