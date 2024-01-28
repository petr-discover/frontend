import React, {useState} from "react";
import "./ProfilePage.css"
import { useNavigate } from "react-router-dom";



const ProfilePage = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const [hobbies, setHobbies] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [file, setFile] = useState();

    function settingFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    const addHobby = () => {
        setHobbies([...hobbies, ""]);
    }

    const removeHobby = (index) => {
        hobbies.splice(index, 1);
        setHobbies([...hobbies]);
    }

    const addSchedule = () => {
        setSchedule([...schedule, ""])
    }

    const removeSchedule = (index) => {
        schedule.splice(index, 1);
        setSchedule([...schedule]);
    }

    const navigate = useNavigate();
    navigate('/profile');

    const onButtonClick = () => {
        setFirstNameError("");
        setLastNameError("");
        setUsernameError("");
        setEmailError("");


        if ("" == firstName) {
            setFirstNameError("Please enter your first name.");
            return;
        }

        if ("" == lastName) {
            setLastNameError("Please enter your last name.");
            return;
        }

        if ("" == username) {
            setUsernameError("Please enter a username.");
            return;
        }

        if ("" == email) {
            setEmailError("Please enter your email.");
            return;
        }

        if (email != /^[^\s@]+@[^\s@]+\.[^\s@]+$/) {
            setEmailError("Please enter a valid email.");
            return;
        }
        window.alert("Profile Updated");

        updateProfile();
    };

    const updateProfile = () => { //double check api endpoint
        fetch("http://35.197.110.208:8080/api/v1/auth/login", {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({firstName, lastName, username, email, github, linkedin, hobbies, schedule})
        })
        .then(r => r.json())
        .then(r => {
            if ("success" === r.message) {
                {console.log(r.message)}
                window.alert("Profile Updated.")
            }
            else {
                {console.log(r.message)}
            }
        })
        .catch(error => {
            console.error("Error updating profile: ", error);
        });
    };


    function changeHobby(hobby, index) {
        var hobbiesNew = hobbies;
        hobbiesNew[index] = hobby;
        setHobbies(hobbiesNew);
    }
   

    return (
        <div className="profile-page">
            <h1>Update Profile</h1>
        <div className="avatarAndForm">    
                <form className="form-login" action="" method="put" name="form">
                    {/* profile form fields */}
                    
                    {/*First Name Input*/}
                    <div className="name">
                        <div className="inputContainer" id="first">
                            <input
                                id="first"
                                type="text"
                                name="First Name"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                className="inputBox"
                            />
                            <label className="errorLabel">{firstNameError}</label>
                        </div>
                    
                        
                    {/*Last Name Input*/}
                        <div className="inputContainer" id="last">
                        <input
                            id="last"
                            type="text"
                            name="Last Name"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="inputBox"
                        />
                        <label className="errorLabel">{lastNameError}</label>
                    </div>
                </div>
                

                    {/*Username Input*/}
                    <div className="inputContainer">
                    <input
                        id="uname"
                        type="text"
                        name="Username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{usernameError}</label>
                </div>

                {/*Email Input*/}
                <div className="inputContainer">
                    <input
                        id="email"
                        type="text"
                        name="Email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
            
                {/*Github Input*/}
                <div className="inputContainer">
                    <input
                        id="git"
                        type="text"
                        name="Github"
                        placeholder="Github"
                        value={github}
                        onChange={e => setGithub(e.target.value)}
                        className="inputBox"
                    /> 
                    {/*no error message bec git is optional */}
                </div>
                
                {/*Linkedin Input*/}
                <div className="inputContainer">
                    <input
                        id="linkedin"
                        type="text"
                        name="Linkedin"
                        placeholder="Linkedin"
                        value={linkedin}
                        onChange={e => setLinkedin(e.target.value)}
                        className="inputBox"
                    /> 
                    {/*no error message bec linkedin is optional */}
                </div>
                
                {/*Hobbies Input*/}
                <div className="inputContainer">
                    <input
                        id="hobbies"
                        type="text"
                        name="Hobbies"
                        placeholder="Hobbies"
                        value={hobbies}
                        onChange={e => setHobbies(e.target.value)}
                        className="inputBox"
                    /> 
                    {/*no error message bec hobbies is optional */}
                </div>

                {/*Schedule Input*/}
                <div className="inputContainer">
                    <input
                        id="schedule"
                        type="text"
                        name="Schedule"
                        placeholder="Schedule"
                        value={schedule}
                        onChange={e => setSchedule(e.target.value)}
                        className="inputBox"
                    /> 
                    {/*no error message bec linkedin is optional */}
                </div>
                
                
                {/*Update Profile Submit Button*/}
                <div className="inputContainer" id="submit">
                        <input
                            className="inputButton"
                            type="submit"
                            onClick={onButtonClick}
                            value="Update Profile"
                        />                
                </div>
                
            </form>
            
            <div className="imageContainer">
                    <input type="file" id="fileInput" onChange={settingFile}/>
                    <img src={file}/>
            </div>
        </div>    
        
    </div>
    );
};

export default ProfilePage;