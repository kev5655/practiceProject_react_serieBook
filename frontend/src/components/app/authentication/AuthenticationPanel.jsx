import React, {useState} from 'react'
import Card from "../../ui/Card";

import classes from "./AuthenticationPanel.module.css";
import LoggingForm from "./LoggingForm";

import SingUpFrom from "./SingUpFrom";
import Btn from "../../ui/form/Btn";
import {useDispatch} from "react-redux";
import {authActions} from "../../../store/authenticate-slice";

// ToDo update setLoginFailed
const AuthenticationPanel = () => {
    const dispatch = useDispatch();
    const [hasAccount, setHasAccount] = useState(true);

    const switchLoginSingUpClickHandler = () => {
        setHasAccount(!hasAccount);
        dispatch(authActions.resetLoginFailed())
        dispatch(authActions.resetSingUpFailed())
    }


    //ToDo Refactoring Btn style
    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                {
                    hasAccount ? <h1>Login</h1> : <h1>Register</h1>
                }
                <Btn label={ hasAccount
                        ? "Registration"
                        : "Login" }
                     className={{
                         height: '50%',
                         width: '8rem'
                     }}
                     onClick={switchLoginSingUpClickHandler}/>
            </header>
            {hasAccount && <LoggingForm/>}
            {!hasAccount && <SingUpFrom/>
            }
        </Card>
    );
}

export default AuthenticationPanel;