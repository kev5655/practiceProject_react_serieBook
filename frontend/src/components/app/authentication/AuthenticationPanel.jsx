import React, {useState} from 'react'
import Card from "../../ui/Card";

import classes from "./AuthenticationPanel.module.css";
import LoggingForm from "./LoggingForm";

import SingUpFrom from "./SingUpFrom";
import Btn from "../../ui/form/Btn";

// ToDo update setLoginFailed
const AuthenticationPanel = () => {

    const [hasAccount, setHasAccount] = useState(true);

    const switchLoginSingupClickHandler = () => {
        setHasAccount(!hasAccount);
        //setLoggingFailed(false);
    }


    //ToDo Refactoring Btn style
    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>Logging</h1> {/* Global Styling in App.css */}
                <Btn label={ !hasAccount
                        ? "Registration"
                        : "Logging" }
                     className={{
                         height: '50%',
                         width: '8rem'
                     }}
                     onClick={switchLoginSingupClickHandler}/>
            </header>
            {hasAccount && <LoggingForm/>}
            {!hasAccount && <SingUpFrom/>
            }
        </Card>
    );
}

export default AuthenticationPanel;