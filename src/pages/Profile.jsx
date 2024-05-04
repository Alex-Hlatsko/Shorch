import React from 'react'
import { Navigate } from "react-router-dom"
import { useUser } from '../UserContext';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';

const Profile = () => {
    const { userData } = useUser(); // get data from context
    // if no data, redirect to login page
    if (!userData) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <TopBar />
            <Navigation />
            <div className="content">
                {/* <NavLink to="/product-details?id=5555&title=Title5&desc=desc5&price=300">ooooo</NavLink> */}
                {/* show users data */}
                {userData && (
                    <div>
                        <h2>Profile:</h2>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Products: {userData.products.length}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
