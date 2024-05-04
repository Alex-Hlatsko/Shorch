import React from 'react'
import { useUser } from '../UserContext';

const TopBar = () => {
    const { userData } = useUser(); // get data from context
    return (
        <div className='topbar'>
            <p>Client: <span>{userData.name}</span></p>
        </div>
    )
}

export default TopBar