import React, {useRef, useState} from 'react'
import InputText from "../../ui/form/InputText";
import InputPassword from "../../ui/form/InputPassword";

import classes from "./LoggingForm.module.css"
import Btn from "../../ui/form/Btn";
import {useDispatch, useSelector} from "react-redux";
import {authRequest} from "../../../store/authenticate-action";
import {useNavigate} from "react-router-dom";
import Input from "../../ui/form/Input";

const isNotEmpty = (value) => value.trim() !== '';

// ToDo Validate User input by empty values
// Evtl. use use-input hook
const LoggingForm = () => {
    const dispatch = useDispatch();
    const isLoginFailed = useSelector((state) => state.auth.loginFailed);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    // const [enteredUsername, setEnteredUsername] = useState();
    const [enteredPassword, setEnteredPassword] = useState();

    if (isAuth) {
        navigate('/series')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!usernameRef.current.isValid) return;
        if(!passwordRef.current.isValid) return;

        dispatch(authRequest({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }))
        usernameRef.current.reset();
        passwordRef.current.reset()
    }


    return (
        <>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.form_username}>
                    <Input
                        type='text'
                        name='Username'
                        placeholder='Username'
                        validateFn={isNotEmpty}
                        ref={usernameRef}/>
                </div>
                <div className={classes.form_password}>
                    <InputPassword
                        name='LoginPassword'
                        placeholder='Password'
                        validateFn={isNotEmpty}
                        ref={passwordRef}
                    />
                </div>
                {
                    isLoginFailed && <p className={classes.form_errorMsg}>Logging Failed, Try again</p>
                }
                <div className={classes.form_button}>
                    <Btn
                        label="Logging"
                        submitValue='submit'
                        className={{
                            width: '50%',
                        }}
                    />
                </div>
            </form>
            <div className={classes.defaultsLogin}>
                <p>Default Username: test</p>
                <p>Default Password: 1234</p>
            </div>
        </>
    );
}

export default LoggingForm;