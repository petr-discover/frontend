import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [activeView, setActiveView] = useState('login');
    const [activeForm, setActiveForm] = useState('login'); // 'login' or 'signup'

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    
    const navigate = useNavigate();

    // Log in a user using email and password
    const logIn = () => {
        fetch("http://localhost:3080/auth", { // TODO: login request
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/dashboard")
            } else {
                window.alert("wrong email or password")
            }
        })
    }

    const signUp = () => {
        fetch("http://localhost:3080/auth", { // TODO: login request
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({firstName, lastName, username, email, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/dashboard")
            } else {
                window.alert("wrong email or password")
            }
        })
    }

    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
        setUsernameError("");
    
        // Check if the user has entered all fields correctly
        if ("" === firstName) {
            setFirstNameError("please enter your first name");
            return;
        }
    
        if ("" === lastName) {
            setLastNameError("please enter your last name");
            return;
        }
    
        if ("" === username) {
            setUsernameError("please enter a username");
            return;
        }
    
        if ("" === email) {
            setEmailError("please enter your email");
            return;
        }
    
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }
    
        if ("" === password) {
            setPasswordError("please enter a password");
            return;
        }
    
        if (password.length < 7) {
            setPasswordError("password must be 7 characters or longer");
            return;
        }
    
        // Handle signup or login based on activeForm state
        if (activeForm === 'signup') {
            signUp();
        } else {
            logIn();
        }
    };

    return (
        <div className="loginBox">
            <div className="titleContainer">
                <div className="headerContainer">
                    <div className="imageWrapper">
                        <img src="/assets/whiteborderlogo.png" alt="logo" className="circularImage" />
                    </div>
                    <h2>petr discover</h2>
                </div>
                <div className="nav">
                    <div className="links">
                        <h3 className={activeForm === 'login' ? 'login-active' : 'login-inactive'}>
                            <a className="btn" onClick={() => setActiveForm('login')}>LOGIN</a></h3>
                        <h3 className={activeForm === 'signup' ? 'signup-active' : 'signup-inactive'}>
                            <a className="btn" onClick={() => setActiveForm('signup')}>SIGNUP</a></h3>
                    </div>
                </div>           
                {/* <h3>LOGIN</h3> */}
            </div>
            <br />

            {activeForm === 'login' && (
            <form className="form-login" action="" method="post" name="form">
                {/* login form fields */}
                <div className="inputContainer">
                <input
                    id="uname"
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
            </form>
        )}

        {activeForm === 'signup' && (
            <form className="form-signup" action="" method="post" name="form">
                {/* Signup form fields */}
                <div className="inputContainer">
                    <input
                        id="firstName"
                        type="text"
                        name="FirstName"
                        placeholder="first name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{firstNameError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        id="lastName"
                        type="text"
                        name="LastName"
                        placeholder="last name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{lastNameError}</label>
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


//     return (
//         <div className="loginBox">
//              <h3>Log in here</h3>
//             <form onSubmit={onButtonClick}>
//                 <div className="inputBox">
//                     <input id="uname" type="text" name="Email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//                     <input id="pass" type="password" name="Password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//                 </div>
//                 <input type="submit" name="" value="Login" />
//             </form>
//             <a href="#">Forget Password<br/></a>
//             <div className="text-center">
//                 <p style={{ color: "#59238F" }}>Sign up</p>
//             </div>
//         </div>
//     );
// };


//     return (
//         <div className={"mainContainer"}>
//             <div className={"titleContainer"}>
//                 <div>Login</div>
//             </div>
//             <br />
//             <div className={"inputContainer"}>
//                 <input
//                     value={email}
//                     placeholder="Enter your email here"
//                     onChange={ev => setEmail(ev.target.value)}
//                     className={"inputBox"} />
//                 <label className="errorLabel">{emailError}</label>
//             </div>
//             <br />
//             <div className={"inputContainer"}>
//                 <input
//                     value={password}
//                     placeholder="Enter your password here"
//                     onChange={ev => setPassword(ev.target.value)}
//                     className={"inputBox"} />
//                 <label className="errorLabel">{passwordError}</label>
//             </div>
//             <br />
//             <div className={"inputContainer"}>
//                 <input
//                     className={"inputButton"}
//                     type="button"
//                     onClick={onButtonClick}
//                     value={"Log in"} />
//             </div>
//         </div>
//     );
// }

// export default LoginPage;