import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from './components/Dashboad/DashboardPage';
import LoginPage from './components/Auth/LoginPage';


function App() {
  return (
      <Router>
       <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
         {/* <Route path="/" component={HomePage} /> */}
       </Routes>
      </Router>
  );
 }

export default App;
