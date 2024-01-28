import React, { useState, useEffect } from 'react';
import { logout } from '../Provider/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
 const [currentUser, setCurrentUser] = useState([]);
 const [isLoading, setIsLoading] = useState(true);


const handleLogout = () =>{
    logout();
    navigate('/');
}

 return (
    <div>
      <h2>Welcome, {currentUser.username}</h2>
      <input
            className="inputButton"
            type="button"
            onClick={handleLogout}
            value="Logout"
        />
    </div>
 );
};

export default Dashboard;
