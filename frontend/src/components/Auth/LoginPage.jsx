import { useState } from "react";
import './LoginPage.css';
import { useNavigate } from 'react-router-dom'
import { login, register, googleLogin } from '../Provider/authService';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [activeForm, setActiveForm] = useState('login'); // 'login' or 'signup'
    const [message, setMessage] = useState("");

    // const { login } = useAuth();
    const navigate = useNavigate();

    // Log in a user using email and password
    function handleGoogleLogin() {
        googleLogin().then(
            (response) => {
                setMessage(response)
                navigate('/dashboard');
            },
            error => {
                window.alert('Wrong email or password')
                setMessage(resMessage);
        });
    }

    function onButtonClick(e){
        // Set initial error values to empty
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setUsernameError("");
    
        // Check if the user has entered all fields correctly
    
        if ("" === username) {
            setUsernameError("please enter a username");
            return;
        }
    
        if ("" === password) {
            setPasswordError("please enter a password");
            return;
        }
    
        if (password.length < 6) {
            setPasswordError("password must be 7 characters or longer");
            return;
        }
    
        // Handle signup or login based on activeForm state
        console.log('choose');
        if (activeForm === 'login') {
            console.log('entering login');

            login(username, password).then(
                (response) => {
                    setMessage(response)
                    navigate('/dashboard');
                },
                error => {
                    window.alert('Wrong email or password')
                    setMessage(message);
            });
            console.log(message);
        } else {
            if ("" === email) {
                setEmailError("please enter your email");
                return;
            }
            console.log('entering register');
            register(email, username, password).then(
                (response) => {
                    setActiveForm('login');
                    setPassword('');
                },
                error => {
                    window.alert('User Already exists')
                    setMessage(response);
            });
            console.log(message);
            
        }
    };

    return (
        <div className="loginBox">
            <div className="titleContainer">
                <div className="headerContainer">
                    <div className="imageWrapper">
                        <img src="/assets/officiallogo.png" width="120px" height="120px" alt="logo" className="circularImage" />
                    </div>
                    <h2 className="login-name">petr discover</h2>
                </div>
                <div className="nav">
                    <div className="links">
                        <h3 className={activeForm === 'login' ? 'login-active' : 'login-inactive'}>
                            <a className="btn" onClick={() => setActiveForm('login')}>LOGIN</a></h3>
                        <h3 className={activeForm === 'signup' ? 'signup-active' : 'signup-inactive'}>
                            <a className="btn" onClick={() => setActiveForm('signup')}>SIGNUP</a></h3>
                    </div>
                </div>           
            </div>
            <br />

            {activeForm === 'login' && (
            <form className="form-login" action="" method="post" name="form">
                <div className="inputContainer">
                    <input
                        id="uname"
                        type="text"
                        name="Username"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{usernameError}</label>
                </div>
            <br />
            <div className="inputContainer">
                <input
                    id="pass"
                    type="password"
                    name="Password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    className="inputButton"
                    type="submit"
                    onClick={onButtonClick}
                    value="connect me"
                />
            </div>
            <p className="orText">⎯  or  ⎯</p>
            <div className="googleContainer">
                <button className="flexContainer" onClick={handleGoogleLogin}>
                        <img src="/assets/googleicon.png" alt="google" className="googleImage" />
                        login with Google
                </button>
            </div>
            </form>
            )}

        {activeForm === 'signup' && (
            <form className="form-signup" action="" method="post" name="form">
                {/* Signup form fields */}
                <div className="inputContainer">
                    <input
                        id="email"
                        type="text"
                        name="Email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        id="username"
                        type="text"
                        name="Username"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{usernameError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        id="password"
                        type="password"
                        name="Password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        className="inputButton"
                        type="submit"
                        onClick={onButtonClick}
                        value="register me"
                    />
                </div>
            </form>
        )}      
        </div>
    );
};
export default LoginPage;
