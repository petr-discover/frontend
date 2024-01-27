import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
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
                window.alert("Wrong email or password")
            }
        })
    }

    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 7 characters or longer")
            return
        }

        logIn();
    }

    return (
        <div className="loginBox">
            <div className="titleContainer">
                <h3>Log in here</h3>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    id="uname"
                    type="text"
                    name="Email"
                    placeholder="Enter your email here"
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
                    placeholder="Enter your password here"
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
                    type="button"
                    onClick={onButtonClick}
                    value="Log in"
                />
            </div>
            <a href="#">Forget Password<br/></a>
            <div className="text-center">
                <p style={{ color: "#59238F" }}>Sign up</p>
            </div>
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