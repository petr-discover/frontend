import React, {useState, useEffect } from "react"
import Graph from "../Graph/Graph";
import NavBar from './NavBar'

const Dashboard = () => {


    return (
        <>
            <NavBar />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Graph />
            </div>
        </>
    );
};

export default Dashboard;
