import React, { useState } from 'react'
import { NavLink, Navigate  } from "react-router-dom"
import { useUser } from '../UserContext';

const ProductAdd = ({pr}) => {
    const {userData, setUserData} = useUser();
    const [state, setState] = useState(0);
    console.log(pr)

    function addProduct() {
        if (userData.products.includes(pr.id)) {
            setState(2);
        } else {
            const addedProducts = [...userData.products, pr.id];
            setUserData({ ...userData, products: addedProducts });
            console.log(userData);
        }
    }

    return (
        
        <div>
            <h2>{pr?.title}</h2>
            <p>Desc: {pr?.desc}</p>
            <p>Price: {pr?.price}</p>
            <div>
                <button onClick={addProduct}>Add</button>
                <button onClick={() => setState(1)}>Cancel</button>
                {state===1 && <Navigate to="/scan" />}
                {state===2 && (<div><p>Product already in cart!</p><NavLink to='/cart'>Cart</NavLink></div>)}
            </div>
        </div>
    )
}

export default ProductAdd;