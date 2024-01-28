import React, {useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Graph from "../Graph/Graph";
import NavBar from './NavBar'

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogout = () =>{
        logout();
        navigate('/');
    }

    return (
        <>
            <div>

                <NavBar />
                <h2>Welcome, {currentUser.username}</h2>
                <input
                        className="inputButton"
                        type="button"
                        onClick={handleLogout}
                        value="Logout"
                />
                <input
                        type="button"
                        // onClick={handleGetUser}
                        value="getuser"
                />
            </div>
            <Graph />
        </>
    );
};

export default Dashboard;
