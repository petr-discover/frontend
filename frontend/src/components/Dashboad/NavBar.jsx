import React from 'react';
import './NavBar.css';
import { logout } from '../Provider/authService';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        logout();
        navigate('/');
    }
    return (
        <nav class="navbar">
            <div class="navbar-content">
                <div class="navbar-brand">
                    <img src="/assets/officiallogo2.png" width="60" height="60" alt=""/>
                    <h2 className="navbar-name">petr discover</h2>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-item-home">home</div>
                    <div class="navbar-item-profile">profile</div>
                    <div onClick={handleLogout} class="navbar-item-logout">logout</div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
