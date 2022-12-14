import React, {useState} from 'react'
import Card from "../../ui/Card";

import classes from "./AuthenticationPanel.module.css";
import LoggingForm from "./LoggingForm";

import SingUpFrom from "./SingUpFrom";
import Btn from "../../ui/form/Btn";
import {useDispatch, useSelector} from "react-redux";
import {authRequest} from "../../../store/authenticate-action";
import {useNavigate} from "react-router-dom";


const AuthenticationPanel = (props) => {
    const dispatch = useDispatch();
    const isLoginFailed = useSelector((state) => state.auth.loginFailed)
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const [hasAccount, setHasAccount] = useState(true);

    if(isAuth){
        navigate('/series')
    }
    const loggingHandler = async (logging) => {
        dispatch(authRequest(logging))
    }

    const singUpHandler = async (singUp) => {
        // let body = JSON.stringify(singUp);
        // let response = await fetchData('/api/user/save', 'Post', body);
        //
        // console.log("SingUp Response ", response);
        // const loggingValue = {
        //     username: singUp.username,
        //     password: singUp.password
        // }
        // await loggingHandler(loggingValue);
    }

    const switchToSingUpClickHandler = () => {
        setHasAccount(false);
        //setLoggingFailed(false);
    }

    const switchToLoggingClickHandler = () => {
        setHasAccount(true);
    }

    //ToDo Refactoring Btn
    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>Logging</h1> {/* Global Styling in App.css */}
                {hasAccount && <Btn label="Registration"
                                    className={{
                                        height: '50%',
                                        width: '8rem'
                                    }}
                                    onClick={switchToSingUpClickHandler}/>}
                {!hasAccount && <Btn label="Logging"
                                     className={{
                                         height: '50%',
                                         width: '8rem'
                                     }}
                                     onClick={switchToLoggingClickHandler}/>}
            </header>
            {hasAccount && <> <LoggingForm
                onLogging={loggingHandler}
                loggingFailed={isLoginFailed}
            />
                <div className={classes.defaultsLogin}>
                    <p>Default Username: test</p>
                    <p>Default Password: 1234</p>
                </div>
            </>}
            {!hasAccount && <SingUpFrom onSingUp={singUpHandler}/>
            }
        </Card>
    );
}

export default AuthenticationPanel;