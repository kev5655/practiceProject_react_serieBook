import React, {useState} from 'react'
import Card from "../../ui/Card";

import classes from "./AuthenticationPanel.module.css";
import LoggingForm from "./LoggingForm";

import {setJwtToken, setRefreshToken} from '../../utils/jwt';
import {convertJsonTo_x_www_form_urlencoded, fetchData} from '../../utils/api';
import SingUpFrom from "./SingUpFrom";
import Btn from "../../ui/form/Btn";


const AuthenticationPanel = (props) => {

    const [hasAccount, setHasAccount] = useState(true);
    const [isLoggingFailed, setLoggingFailed] = useState(false);

    const loggingHandler = async (logging) => {
        const body = convertJsonTo_x_www_form_urlencoded(logging)

        let response = await fetchData('/api/login', 'Post', body, 'application/x-www-form-urlencoded;charset=UTF-8');

        if(response === 401){
            setLoggingFailed(true);
        } else {
            setJwtToken(response.access_token)
            setRefreshToken(response.refresh_token)
            props.onLogging()
        }
    }

    const singUpHandler = async (singUp) => {
        let body = JSON.stringify(singUp);
        let response = await fetchData('/api/user/save', 'Post', body);

        console.log("SingUp Response ", response);
        const loggingValue = {
            username: singUp.username,
            password: singUp.password
        }
        await loggingHandler(loggingValue);
    }

    const switchToSingUpClickHandler = () => {
        setHasAccount(false);
        setLoggingFailed(false);
    }

    const switchToLoggingClickHandler = () => {
        setHasAccount(true);
    }

    //ToDo Refactoring Btn
    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>Logging</h1> {/* Global Styling in App.css */}
                { hasAccount && <Btn label="Registration"
                                     className={{
                                         height: '50%',
                                         width: '8rem'
                                     }}
                                     onClick={switchToSingUpClickHandler}/>}
                { !hasAccount && <Btn label="Logging"
                                      className={{
                                          height: '50%',
                                          width: '8rem'
                                      }}
                                      onClick={switchToLoggingClickHandler}/>}
            </header>
            { hasAccount && <LoggingForm
                onLogging={loggingHandler}
                loggingFailed={isLoggingFailed}
            />}
            { !hasAccount && <SingUpFrom onSingUp={singUpHandler}/>
            }
        </Card>
    );
}

export default AuthenticationPanel;