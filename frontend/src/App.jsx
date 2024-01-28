import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './components/Dashboad/DashboardPage';
import LoginPage from './components/Auth/LoginPage';
import './App.css'; // Tell webpack that Button.js uses these styles

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
