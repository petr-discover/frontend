import React, { useState, useEffect } from 'react';
import { logout, getUser } from '../Provider/authService';
import { useNavigate } from 'react-router-dom';
import Graph from '../Graph/Graph';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleLogout = () =>{
        logout();
        navigate('/');
    }
    const handleGetUser = () =>{
        getUser();
    }

    return (
        <>
            <div>
                <h2>Welcome, {currentUser.username}</h2>
                <input
                        className="inputButton"
                        type="button"
                        onClick={handleLogout}
                        value="Logout"
                />
                <input
                        type="button"
                        onClick={handleGetUser}
                        value="getuser"
                />
            </div>
            <Graph />
        </>
    );
};

export default Dashboard;
