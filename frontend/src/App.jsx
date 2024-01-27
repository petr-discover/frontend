import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/Auth/LoginPage'
import DashboardPage from './components/Dashboad/DashboardPage'

function App() {

const [loggedIn, setLoggedIn] = useState(false);
const [email, setEmail] = useState("")


  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} />
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          <Route path="/dashboard" 
            element={<DashboardPage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} 
          />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
