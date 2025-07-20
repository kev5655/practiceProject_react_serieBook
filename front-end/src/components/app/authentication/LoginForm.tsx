import React, {useRef} from 'react'

// @ts-ignore
import classes from "./LoggingForm.module.css"
import classError from "../../styles/Error.module.css";
import Btn from "../../ui/form/Btn";
import {useDispatch, useSelector} from "react-redux";
import {login, LoginData} from "../../../store/auth/auth-actions.ts";
import {useNavigate} from "react-router-dom";
import Input, { InputRef } from "../../ui/form/Input.tsx";
import {IsNotEmpty} from "../../../utils/Validation.ts";
import { AppDispatch } from '../../../store/store.ts';


const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loginError = useSelector((state: any) => state.auth.loginError);
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    const navigate = useNavigate();
    const usernameRef = useRef<InputRef>({} as InputRef);
    const passwordRef = useRef<InputRef>({} as InputRef);

    if (isAuth) {
        navigate('/series')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!usernameRef.current.validateInput()) return;
        if (!passwordRef.current.validateInput()) return;


        const loginData: LoginData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        dispatch(login(loginData));
        usernameRef.current.resetInput();
        passwordRef.current.resetInput()
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <Input
                    type='text'
                    name='Username'
                    placeholder='Username'
                    validators={[new IsNotEmpty("Username is Empty")]}
                    ref={usernameRef}/>
            </div>
            <div className={classes.form_password}>
                <Input
                    type='password'
                    name='LoginPassword'
                    isPassword={true}
                    placeholder='Password'
                    validators={[new IsNotEmpty("Password is Empty")]}
                    ref={passwordRef}
                />
            </div>
            {
                loginError.isFailed &&
                <p className={`${classes.form_errorMsg} ${classError.error_message}`}>{loginError.errorText}</p>
            }
            <div className={classes.defaultsLogin}>
                <p>Default Username: test</p>
                <p>Default Password: 123abc</p>
            </div>
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
    );
}

export default LoginForm;