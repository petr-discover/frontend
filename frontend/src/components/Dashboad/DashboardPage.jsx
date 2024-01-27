import React from "react"
import { useNavigate } from "react-router-dom";

const DashboardPage = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        props.setLoggedIn(false);
        navigate("/");
    }


    return <div className="mainContainer">
    <div className={"titleContainer"}>
        <div>Welcome!</div>
    </div>
    <div>
        This is the home page.
    </div>
    <div className={"buttonContainer"}>
        <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Logout"} />
        {(loggedIn ? <div>
            Your email address is {email}
        </div> : <div/>)}
    </div>


</div>

}

export default DashboardPage;