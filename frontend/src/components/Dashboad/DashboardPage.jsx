import React from "react"
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar.jsx';

const DashboardPage = ({ loggedIn, email }) => {
    // const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        props.setLoggedIn(false);
        navigate("/");
    }


    return <div className="mainContainer">
    <NavBar></NavBar>

</div>

} 

export default DashboardPage;