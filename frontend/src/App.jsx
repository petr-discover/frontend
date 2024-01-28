import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './components/Dashboad/DashboardPage';
import LoginPage from './components/Auth/LoginPage';
import ProfilePage from './components/Profile/ProfilePage'


function App() {
  return (
      <Router>
       <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
         {<Route path="/profile" element={<ProfilePage />} />}
       </Routes>
      </Router>
  );
 }

export default App;
